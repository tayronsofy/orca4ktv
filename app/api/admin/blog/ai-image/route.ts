import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'
import { requireAdmin } from '@/lib/admin/auth'
import { generateImage, AiError } from '@/lib/ai/gemini'
import { buildImagePrompt } from '@/lib/ai/blog-prompts'
import { createAdminClient } from '@/lib/supabase/admin'
import { updatePost } from '@/lib/posts'

export const maxDuration = 180

const BUCKET = 'blog-images'

export async function POST(request: NextRequest) {
  const denied = requireAdmin(request)
  if (denied) return denied

  const body = await request.json()
  const title = String(body?.title || '').trim()
  const slug = String(body?.slug || '').trim()

  if (!title || !slug) {
    return NextResponse.json({ error: 'bad_request', detail: 'title and slug are required' }, { status: 400 })
  }

  try {
    const raw = await generateImage({ prompt: buildImagePrompt(title), aspectRatio: '16:9', timeoutMs: 120_000 })

    // Compress: 1600px-wide JPEG q75
    const jpeg = await sharp(raw).resize({ width: 1600, withoutEnlargement: true }).jpeg({ quality: 75 }).toBuffer()

    const supabase = createAdminClient()
    const path = `posts/${slug}.jpg`
    const { error } = await supabase.storage.from(BUCKET).upload(path, jpeg, {
      contentType: 'image/jpeg',
      cacheControl: '31536000',
      upsert: true,
    })
    if (error) {
      return NextResponse.json({ error: 'insert_failed', detail: error.message }, { status: 500 })
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)

    // Attach to the draft (best-effort)
    await updatePost(slug, { imageUrl: data.publicUrl, imageAlt: title }).catch(() => null)

    return NextResponse.json({ success: true, url: data.publicUrl })
  } catch (err) {
    if (err instanceof AiError) {
      return NextResponse.json({ error: err.code, detail: err.message }, { status: err.status })
    }
    return NextResponse.json(
      { error: 'ai_request_failed', detail: err instanceof Error ? err.message : String(err) },
      { status: 502 }
    )
  }
}
