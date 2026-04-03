import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getPosts, createPost } from '@/lib/posts'
import type { BlogPost } from '@/lib/posts'

function isAuthenticated(token: string | undefined): boolean {
  return !!token && !!process.env.ADMIN_SECRET && token === process.env.ADMIN_SECRET
}

export async function GET() {
  const posts = getPosts()
  return NextResponse.json(posts)
}

export async function POST(request: Request) {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  if (!isAuthenticated(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const post: BlogPost = await request.json()

  // Validate required fields
  if (!post.slug || !post.title || !post.content) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Check slug uniqueness
  const existing = getPosts().find((p) => p.slug === post.slug)
  if (existing) {
    return NextResponse.json({ error: 'Slug already exists' }, { status: 409 })
  }

  createPost(post)
  return NextResponse.json({ success: true, slug: post.slug }, { status: 201 })
}
