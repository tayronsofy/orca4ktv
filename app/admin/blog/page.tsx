import { getPosts } from '@/lib/posts'
import BlogListClient from './BlogListClient'

export const dynamic = 'force-dynamic'

export default async function AdminBlogPage() {
  const posts = await getPosts()
  return <BlogListClient posts={posts} />
}
