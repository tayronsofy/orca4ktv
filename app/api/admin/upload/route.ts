import { NextResponse } from 'next/server'
import { isAdminToken } from '@/lib/admin/auth'
import { cookies } from 'next/headers'
import { createAdminClient } from '@/lib/supabase/admin'

const BUCKET = 'blog-images'

export async function POST(request: Request) {
  const cookieStore = await cookies()
  if (!isAdminToken(cookieStore.get('admin_token')?.value)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get('file') as File | null
  if (!file) {
    return NextResponse.json({ error: 'missing_fields', detail: 'No file provided' }, { status: 400 })
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: 'bad_request', detail: 'Invalid file type. Use JPG, PNG, WEBP, or GIF.' }, { status: 400 })
  }

  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: 'bad_request', detail: 'File too large. Max 10MB.' }, { status: 400 })
  }

  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const baseName = file.name
    .replace(/\.[^/.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60)
  const fileName = `${baseName}-${Date.now()}.${ext}`

  const buffer = Buffer.from(await file.arrayBuffer())

  // Supabase Storage (public bucket) — survives deploys, unlike public/ writes
  const supabase = createAdminClient()
  const { error } = await supabase.storage.from(BUCKET).upload(fileName, buffer, {
    contentType: file.type,
    cacheControl: '31536000',
    upsert: false,
  })
  if (error) {
    return NextResponse.json({ error: 'insert_failed', detail: error.message }, { status: 500 })
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName)
  return NextResponse.json({ url: data.publicUrl })
}
