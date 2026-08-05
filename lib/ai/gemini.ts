import 'server-only'
import { GoogleGenAI } from '@google/genai'

/**
 * Server-only Gemini structured-output wrapper for the admin AI features.
 * All calls go through admin-gated route handlers — the key never reaches
 * the client.
 */

export type AiErrorCode = 'missing_api_key' | 'rate_limited' | 'ai_request_failed' | 'ai_bad_response'

export class AiError extends Error {
  code: AiErrorCode
  status: number
  constructor(code: AiErrorCode, message: string) {
    super(message)
    this.code = code
    this.status = code === 'missing_api_key' ? 501 : code === 'rate_limited' ? 429 : 502
  }
}

let _client: GoogleGenAI | null = null
function getClient(): GoogleGenAI {
  if (_client) return _client
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) throw new AiError('missing_api_key', 'GEMINI_API_KEY is not set')
  _client = new GoogleGenAI({ apiKey })
  return _client
}

const TEXT_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-pro'
const IMAGE_MODEL = process.env.GEMINI_IMAGE_MODEL || 'imagen-4.0-generate-001'

/** Brand fact sheet included in every prompt so output never invents facts. */
export const BRAND_FACTS = `
Brand facts (use these, never invent numbers):
- Service: ORCA 4K TV, a premium 4K IPTV streaming subscription (orca4ktv.com)
- 22,000+ live channels, 100,000+ movies & series on demand
- 4K HDR with HDR10+ and Dolby Vision on supported feeds
- Anti Freeze CDN for buffer-free playback; AES-256 encrypted; VPN allowed
- Works on Firestick, Apple TV, Android TV, Samsung Tizen, LG webOS, MAG, iOS, Android
- Up to 4 simultaneous connections; instant activation in under 5 minutes
- Plans from $7.92/month (12-month plan); free trial at https://orca4ktv.com/trial
- 24/7 support with average first reply under 5 minutes
`.trim()

/**
 * One structured-output call: forces application/json + responseSchema,
 * scans response parts for the one that parses (thinking models can emit
 * multiple parts), maps provider errors to typed codes.
 */
export async function generateStructured<T>(opts: {
  prompt: string
  schema: Record<string, unknown>
  timeoutMs?: number
  temperature?: number
}): Promise<T> {
  const client = getClient()
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), opts.timeoutMs ?? 60_000)

  let response
  try {
    response = await client.models.generateContent({
      model: TEXT_MODEL,
      contents: opts.prompt,
      config: {
        temperature: opts.temperature ?? 0.7,
        responseMimeType: 'application/json',
        responseSchema: opts.schema,
        abortSignal: controller.signal,
      },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    if (/429|rate|quota|RESOURCE_EXHAUSTED/i.test(message)) {
      throw new AiError('rate_limited', message)
    }
    throw new AiError('ai_request_failed', message)
  } finally {
    clearTimeout(timer)
  }

  // Collect every text part; return the first one that parses as JSON.
  const candidates: string[] = []
  const parts = response.candidates?.[0]?.content?.parts ?? []
  for (const part of parts) {
    if (typeof (part as { text?: string }).text === 'string') {
      candidates.push((part as { text: string }).text)
    }
  }
  if (response.text) candidates.push(response.text)

  for (const raw of candidates) {
    const cleaned = raw.trim().replace(/^```(?:json)?\n?/i, '').replace(/\n?```$/, '')
    try {
      return JSON.parse(cleaned) as T
    } catch {
      continue
    }
  }
  throw new AiError('ai_bad_response', 'No parseable JSON in the model response')
}

/** Generate one image (returns raw bytes). Used for blog header images. */
export async function generateImage(opts: {
  prompt: string
  aspectRatio?: string
  timeoutMs?: number
}): Promise<Buffer> {
  const client = getClient()
  try {
    const response = await client.models.generateImages({
      model: IMAGE_MODEL,
      prompt: opts.prompt,
      config: {
        numberOfImages: 1,
        aspectRatio: opts.aspectRatio ?? '16:9',
      },
    })
    const image = response.generatedImages?.[0]?.image
    const b64 = (image as { imageBytes?: string } | undefined)?.imageBytes
    if (!b64) throw new Error('No image bytes in response')
    return Buffer.from(b64, 'base64')
  } catch (err) {
    if (err instanceof AiError) throw err
    const message = err instanceof Error ? err.message : String(err)
    if (/429|rate|quota|RESOURCE_EXHAUSTED/i.test(message)) {
      throw new AiError('rate_limited', message)
    }
    throw new AiError('ai_request_failed', message)
  }
}

/** Strip AI-tell punctuation the prompt bans, as a belt-and-braces pass. */
export function stripAiTells(text: string): string {
  return text
    .replace(/—/g, ', ') // em dash
    .replace(/–/g, '-') // en dash
    .replace(/ ,/g, ',')
    .replace(/,{2,}/g, ',')
}
