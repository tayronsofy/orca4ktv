// Imagen 4 image generation via the Gemini API endpoint.
// Uses raw fetch since @google/genai doesn't yet expose Imagen.
// Free tier limit: 10 requests/minute. We serialize calls + retry on 429.

import { promises as fs } from 'fs';
import path from 'path';
import pLimit from 'p-limit';

function getApiKey(): string {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error('GEMINI_API_KEY missing. Set it in .env.local.');
  return key;
}

const IMAGEN_MODEL =
  process.env.IMAGEN_MODEL || 'imagen-4.0-generate-001';

// Serialize image API calls. Free tier = 10/min, so we sleep between requests too.
const imageLimit = pLimit(1);
const MIN_GAP_MS = 6500; // ~9.2/min, safely under the 10/min limit
let lastCallAt = 0;

const sleep = (ms: number) => new Promise<void>((res) => setTimeout(res, ms));

let imagesGenerated = 0;
let imagesFailed = 0;

interface GenerateImageOpts {
  prompt: string;
  aspectRatio?: '1:1' | '4:3' | '3:4' | '16:9' | '9:16';
  outputPath: string; // absolute path where the image should be written
}

/** Parse "Please retry in Xs." from a 429 error body to honor server backoff. */
function parseRetryAfter(errBody: string): number {
  const match = errBody.match(/retry in ([\d.]+)s/i);
  if (match) {
    return Math.ceil(parseFloat(match[1]) * 1000) + 1000;
  }
  return 30_000; // default 30s if no hint
}

async function callImagenOnce(prompt: string, aspectRatio: string): Promise<string> {
  // Throttle: ensure at least MIN_GAP_MS between requests
  const elapsed = Date.now() - lastCallAt;
  if (elapsed < MIN_GAP_MS) {
    await sleep(MIN_GAP_MS - elapsed);
  }
  lastCallAt = Date.now();

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${IMAGEN_MODEL}:predict?key=${getApiKey()}`;
  const body = {
    instances: [{ prompt }],
    parameters: {
      sampleCount: 1,
      aspectRatio,
      personGeneration: 'allow_all',
      safetyFilterLevel: 'block_only_high',
    },
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errBody = await res.text();
    const err: any = new Error(`Imagen ${res.status}: ${errBody.slice(0, 400)}`);
    err.status = res.status;
    err.body = errBody;
    throw err;
  }

  const json: any = await res.json();
  const base64 = json?.predictions?.[0]?.bytesBase64Encoded;
  if (!base64) {
    throw new Error(
      `Imagen response missing image data. Body: ${JSON.stringify(json).slice(0, 400)}`
    );
  }
  return base64;
}

/** Generate an image with Imagen and save it to outputPath. Retries up to 4× on 429. */
export async function generateImage(opts: GenerateImageOpts): Promise<void> {
  const { prompt, aspectRatio = '16:9', outputPath } = opts;
  const maxAttempts = 4;

  await imageLimit(async () => {
    let lastErr: any = null;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const base64 = await callImagenOnce(prompt, aspectRatio);
        await fs.mkdir(path.dirname(outputPath), { recursive: true });
        await fs.writeFile(outputPath, Buffer.from(base64, 'base64'));
        imagesGenerated++;
        return;
      } catch (e: any) {
        lastErr = e;
        if (e.status === 429 && attempt < maxAttempts) {
          const wait = parseRetryAfter(e.body || '');
          console.log(`    ⟳ 429 — backing off ${(wait / 1000).toFixed(1)}s (attempt ${attempt}/${maxAttempts})`);
          await sleep(wait);
          continue;
        }
        if (e.status >= 500 && e.status < 600 && attempt < maxAttempts) {
          // transient server error — backoff and retry
          await sleep(2000 * attempt);
          continue;
        }
        // Non-retryable
        break;
      }
    }
    imagesFailed++;
    throw lastErr;
  });
}

export function getImageUsageReport() {
  return {
    imagesGenerated,
    imagesFailed,
    // Imagen 4 via Gemini API: ~$0.04/image
    estimatedCostUSD: imagesGenerated * 0.04,
  };
}

export function resetImageUsage() {
  imagesGenerated = 0;
  imagesFailed = 0;
}
