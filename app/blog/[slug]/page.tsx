import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPost, getPublishedPosts } from '@/lib/posts'
import BlogPostContent from '@/page-components/BlogPost'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: `${post.title} - SMART 4K Blog`,
    description: post.excerpt,
    keywords: post.seoKeywords,
    alternates: { canonical: `https://smart4k.io/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://smart4k.io/blog/${post.slug}`,
      images: [{ url: `https://smart4k.io${post.imageUrl}`, width: 1200, height: 630 }],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post || post.status === 'draft') notFound()
  return <BlogPostContent post={post} />
}
