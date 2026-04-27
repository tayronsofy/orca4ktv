import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPost } from '@/lib/posts'
import BlogPostContent from '@/page-components/BlogPost'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  const imageUrl = post.imageUrl ? `https://orca4ktv.com${post.imageUrl}` : 'https://orca4ktv.com/og-default.jpg'
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.seoKeywords,
    alternates: { canonical: `https://orca4ktv.com/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: `https://orca4ktv.com/blog/${post.slug}`,
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

  const url = `https://orca4ktv.com/blog/${post.slug}`
  const imageUrl = post.imageUrl ? `https://orca4ktv.com${post.imageUrl}` : 'https://orca4ktv.com/og-default.jpg'
  const datePublished = new Date(post.date).toISOString()

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://orca4ktv.com/' },
          { name: 'Blog', url: 'https://orca4ktv.com/blog' },
          { name: post.title, url },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.excerpt,
            image: [imageUrl],
            datePublished,
            dateModified: datePublished,
            author: {
              '@type': 'Organization',
              name: post.author || 'Orca 4K TV Editorial Team',
              url: 'https://orca4ktv.com/about',
            },
            publisher: {
              '@id': 'https://orca4ktv.com/#organization',
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': url,
            },
            articleSection: post.category,
            keywords: post.seoKeywords,
            inLanguage: 'en',
            isAccessibleForFree: true,
          }),
        }}
      />
      <BlogPostContent post={post} />
    </>
  )
}
