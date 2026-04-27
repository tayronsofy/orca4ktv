// gpt-image-1 image generation via OpenAI Images API.
// Used as an alternate provider for image specs that opt-in via `provider: 'openai'`.

import { promises as fs } from 'fs';
import path from 'path';

function getApiKey(): string {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error('OPENAI_API_KEY missing. Set it in .env.local.');
  return key;
}

const MODEL = process.env.OPENAI_IMAGE_MODEL || 'gpt-image-1';
const QUALITY = (process.env.OPENAI_IMAGE_QUALITY ?? 'medium') as 'low' | 'medium' | 'high' | 'auto';

let imagesGenerated = 0;
let imagesFailed = 0;

interface OpenAIImageOpts {
  prompt: string;
  aspectRatio?: '1:1' | '4:3' | '3:4' | '16:9' | '9:16';
  outputPath: string;
}

// Map our aspect ratios to gpt-image-1 supported sizes
function aspectToSize(ratio: string): string {
  switch (ratio) {
    case '16:9':
    case '4:3':
      return '1536x1024'; // landscape
    case '9:16':
    case '3:4':
      return '1024x1536'; // portrait
    case '1:1':
    default:
      return '1024x1024';
  }
}

export async function generateImageOpenAI(opts: OpenAIImageOpts): Promise<void> {
  const { prompt, aspectRatio = '16:9', outputPath } = opts;
  const size = aspectToSize(aspectRatio);

  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      prompt,
      size,
      quality: QUALITY,
      n: 1,
      output_format: 'png',
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    imagesFailed++;
    throw new Error(`OpenAI gpt-image-1 ${res.status}: ${errBody.slice(0, 500)}`);
  }

  const json: any = await res.json();
  const base64 = json?.data?.[0]?.b64_json;
  if (!base64) {
    imagesFailed++;
    throw new Error(
      `OpenAI gpt-image-1 response missing image data. Body: ${JSON.stringify(json).slice(0, 400)}`
    );
  }

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, Buffer.from(base64, 'base64'));
  imagesGenerated++;
}

export function getOpenAIImageUsageReport() {
  // Pricing (Jan 2026): gpt-image-1 medium quality
  // 1024x1024 ≈ $0.042, 1536x1024 ≈ $0.063, 1024x1536 ≈ $0.063
  // We assume landscape (most common in this project) ≈ $0.063 average
  const perImage =
    QUALITY === 'low' ? 0.017 :
    QUALITY === 'high' ? 0.25 :
    /* medium / auto */ 0.063;
  return {
    imagesGenerated,
    imagesFailed,
    estimatedCostUSD: imagesGenerated * perImage,
  };
}

export function resetOpenAIImageUsage() {
  imagesGenerated = 0;
  imagesFailed = 0;
}
