import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPost } from '@/lib/posts'
import BlogPostContent from '@/page-components/BlogPost'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  const imageUrl = post.imageUrl ? `https://smart4k.io${post.imageUrl}` : 'https://smart4k.io/og-default.jpg'
  return {
    title: `${post.title} - Smart4K`,
    description: post.excerpt,
    keywords: post.seoKeywords,
    alternates: { canonical: `https://smart4k.io/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: `https://smart4k.io/blog/${post.slug}`,
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author],
      images: [{ url: imageUrl, width: 1408, height: 768, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post || post.status === 'draft') notFound()
  return <BlogPostContent post={post} />
}
