// Gemini text generation client wrapper.
// Uses @google/genai with GEMINI_API_KEY from .env.local.

import { GoogleGenAI } from '@google/genai';
import { buildTextPrompt } from './prompts.js';

let _client: GoogleGenAI | null = null;
function getClient(): GoogleGenAI {
  if (_client) return _client;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      'GEMINI_API_KEY missing. Set it in .env.local before running regen scripts.'
    );
  }
  _client = new GoogleGenAI({ apiKey });
  return _client;
}

const TEXT_MODEL = process.env.GEMINI_TEXT_MODEL || 'gemini-2.5-pro';

export interface RewriteOptions {
  keywords?: string[];
  extraContext?: string;
  temperature?: number;
}

let inputTokensTotal = 0;
let outputTokensTotal = 0;

/** Rewrite a single piece of text via Gemini. Returns the rewritten string only. */
export async function rewrite(input: string, opts: RewriteOptions = {}): Promise<string> {
  const prompt = buildTextPrompt(input, opts.keywords, opts.extraContext);

  const response = await getClient().models.generateContent({
    model: TEXT_MODEL,
    contents: prompt,
    config: {
      temperature: opts.temperature ?? 0.8,
    },
  });

  const text = response.text?.trim() ?? '';
  if (!text) throw new Error('Empty response from Gemini');

  // Strip any accidentally wrapped code fences
  const cleaned = text
    .replace(/^```[a-z]*\n?/i, '')
    .replace(/\n?```$/, '')
    .trim();

  // Track usage if available
  const usage = (response as any).usageMetadata;
  if (usage) {
    inputTokensTotal += usage.promptTokenCount ?? 0;
    outputTokensTotal += usage.candidatesTokenCount ?? 0;
  }

  return cleaned;
}

export function getUsageReport() {
  return {
    inputTokens: inputTokensTotal,
    outputTokens: outputTokensTotal,
    // Gemini 2.5 Pro pricing: $1.25/M input, $5/M output (as of Jan 2026)
    estimatedCostUSD:
      (inputTokensTotal / 1_000_000) * 1.25 +
      (outputTokensTotal / 1_000_000) * 5,
  };
}

export function resetUsage() {
  inputTokensTotal = 0;
  outputTokensTotal = 0;
}
