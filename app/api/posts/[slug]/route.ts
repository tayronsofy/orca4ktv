import { NextResponse } from 'next/server'
import { isAdminToken } from '@/lib/admin/auth'
import { cookies } from 'next/headers'
import { getPost, updatePost, deletePost } from '@/lib/posts'

interface Params {
  params: Promise<{ slug: string }>
}

async function isAuthed(): Promise<boolean> {
  const cookieStore = await cookies()
  return isAdminToken(cookieStore.get('admin_token')?.value)
}

export async function GET(_request: Request, { params }: Params) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return NextResponse.json({ error: 'not_found' }, { status: 404 })
  return NextResponse.json(post)
}

export async function PUT(request: Request, { params }: Params) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const { slug } = await params
  const updates = await request.json()
  try {
    const updated = await updatePost(slug, updates)
    if (!updated) return NextResponse.json({ error: 'not_found' }, { status: 404 })
    return NextResponse.json({ success: true, post: updated })
  } catch (err) {
    return NextResponse.json(
      { error: 'update_failed', detail: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    )
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const { slug } = await params
  try {
    const deleted = await deletePost(slug)
    if (!deleted) return NextResponse.json({ error: 'not_found' }, { status: 404 })
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json(
      { error: 'delete_failed', detail: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    )
  }
}
