import { NextResponse } from 'next/server'
import { isAdminToken } from '@/lib/admin/auth'
import { cookies } from 'next/headers'
import { getPosts, createPost } from '@/lib/posts'
import type { BlogPost } from '@/lib/posts'

async function isAuthed(): Promise<boolean> {
  const cookieStore = await cookies()
  return isAdminToken(cookieStore.get('admin_token')?.value)
}

/** Admin-only list feed (includes drafts) — used by the admin blog list. */
export async function GET() {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }
  const posts = await getPosts()
  return NextResponse.json(posts)
}

export async function POST(request: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const post: BlogPost = await request.json()

  if (!post.slug || !post.title || !post.content) {
    return NextResponse.json({ error: 'missing_fields' }, { status: 400 })
  }

  try {
    await createPost(post)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    if (message.includes('duplicate') || message.includes('unique')) {
      return NextResponse.json({ error: 'slug_exists' }, { status: 409 })
    }
    return NextResponse.json({ error: 'insert_failed', detail: message }, { status: 500 })
  }
  return NextResponse.json({ success: true, slug: post.slug }, { status: 201 })
}
