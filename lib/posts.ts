import fs from 'fs'
import path from 'path'

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  contentFormat: 'markdown' | 'html'
  date: string
  readTime: string
  author: string
  authorRole: string
  imageUrl: string
  category: string
  seoKeywords: string
  status: 'published' | 'draft'
  summary?: string
  faqs?: { q: string; a: string }[]
  dateModified?: string
  imageAlt?: string
}

const POSTS_FILE = path.join(process.cwd(), 'data', 'posts.json')

export function getPosts(): BlogPost[] {
  try {
    const data = fs.readFileSync(POSTS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

export function getPublishedPosts(): BlogPost[] {
  return getPosts().filter((p) => p.status === 'published')
}

export function getPost(slug: string): BlogPost | undefined {
  return getPosts().find((p) => p.slug === slug)
}

export function savePosts(posts: BlogPost[]): void {
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2))
}

export function createPost(post: BlogPost): void {
  const posts = getPosts()
  posts.unshift(post)
  savePosts(posts)
}

export function updatePost(slug: string, updates: Partial<BlogPost>): BlogPost | null {
  const posts = getPosts()
  const idx = posts.findIndex((p) => p.slug === slug)
  if (idx === -1) return null
  posts[idx] = { ...posts[idx], ...updates }
  savePosts(posts)
  return posts[idx]
}

export function deletePost(slug: string): boolean {
  const posts = getPosts()
  const filtered = posts.filter((p) => p.slug !== slug)
  if (filtered.length === posts.length) return false
  savePosts(filtered)
  return true
}
