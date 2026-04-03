import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getPost, updatePost, deletePost } from '@/lib/posts'

function isAuthenticated(token: string | undefined): boolean {
  return !!token && !!process.env.ADMIN_SECRET && token === process.env.ADMIN_SECRET
}

interface Params {
  params: Promise<{ slug: string }>
}

export async function GET(_request: Request, { params }: Params) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(post)
}

export async function PUT(request: Request, { params }: Params) {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  if (!isAuthenticated(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { slug } = await params
  const updates = await request.json()
  const updated = updatePost(slug, updates)
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ success: true, post: updated })
}

export async function DELETE(_request: Request, { params }: Params) {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  if (!isAuthenticated(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { slug } = await params
  const deleted = deletePost(slug)
  if (!deleted) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ success: true })
}
