import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPost, getPublishedPosts } from '@/lib/posts'
import BlogPostContent from '@/page-components/BlogPost'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

export const dynamic = 'force-dynamic'

// Tutorial-style posts get HowTo schema
const HOWTO_SLUGS = new Set([
  'setup-iptv-amazon-firestick-4k-max',
  'ultimate-iptv-firestick-setup-guide-2026',
  'install-iptv-smarters-pro-samsung-lg-smart-tv',
  'cast-iptv-ios-android-smart-tv',
  'how-to-install-iptv-smarters-on-apple-tv',
  'how-to-install-iptv-smarters-pro-samsung-tv',
])

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
  const dateModified = post.dateModified
    ? new Date(post.dateModified).toISOString()
    : datePublished

  // Pick 3 related posts (same category, excluding self), fall back to most recent
  const allPublished = getPublishedPosts().filter((p) => p.slug !== post.slug)
  const sameCategory = allPublished.filter((p) => p.category === post.category)
  const relatedPosts = (sameCategory.length >= 3 ? sameCategory : [...sameCategory, ...allPublished])
    .filter((p, idx, arr) => arr.findIndex((x) => x.slug === p.slug) === idx)
    .slice(0, 3)

  const articleSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.summary || post.excerpt,
    image: [imageUrl],
    datePublished,
    dateModified,
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
  }

  // Speakable schema - tells AI/voice search which sections to read aloud
  if (post.summary) {
    articleSchema.speakable = {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.tldr-summary', 'h1'],
    }
  }

  // FAQPage schema - eligible for Google's PAA carousel + FAQ rich result
  const faqSchema = post.faqs && post.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  } : null

  // HowTo schema for tutorial-style posts
  const howToSchema = HOWTO_SLUGS.has(post.slug) ? {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: post.title,
    description: post.summary || post.excerpt,
    image: [imageUrl],
    totalTime: 'PT15M',
    estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: '0' },
    step: (post.faqs || []).slice(0, 5).map((faq, idx) => ({
      '@type': 'HowToStep',
      position: idx + 1,
      name: faq.q,
      text: faq.a,
      url: `${url}#step-${idx + 1}`,
    })),
  } : null

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://orca4ktv.com/iptv' },
          { name: 'Blog', url: 'https://orca4ktv.com/blog' },
          { name: post.title, url },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {howToSchema && howToSchema.step.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}
      <BlogPostContent post={post} relatedPosts={relatedPosts} />
    </>
  )
}
