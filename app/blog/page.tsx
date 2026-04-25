import type { Metadata } from 'next'
import BlogPage from '@/page-components/BlogPage'
import { getPublishedPosts } from '@/lib/posts'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Smart 4K Blog – Streaming Guides & IPTV Tips 2026',
  description: 'Learn everything about 4K streaming, Firestick setup guides, watching sports from anywhere, and the ultimate IPTV tutorials. Updated weekly.',
  keywords: 'iptv blog, streaming guides, firestick tutorials, iptv tips, premium streaming 2026',
  alternates: { canonical: 'https://smart4k.io/blog' },
  openGraph: {
    title: 'SMART 4K Blog - Streaming Guides & IPTV Tips 2026',
    description: 'Expert IPTV guides, Firestick tutorials, and streaming tips.',
    url: 'https://smart4k.io/blog',
    images: [{ url: 'https://smart4k.io/og-image.jpg', width: 1200, height: 630 }],
  },
}

export default function BlogListPage() {
  const posts = getPublishedPosts()
  return <BlogPage posts={posts} />
}
