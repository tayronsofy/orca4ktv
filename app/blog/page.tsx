import type { Metadata } from 'next'
import BlogPage from '@/page-components/BlogPage'
import { getPublishedPosts } from '@/lib/posts'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'IPTV Blog 2026 — Streaming Guides, Firestick Tutorials & Reviews | ORCA 4K TV',
  description: 'In-depth IPTV guides, 4K streaming tutorials, Firestick + Smart TV setup walkthroughs, and reviews. Maintained by the ORCA 4K TV Editorial Team. Updated weekly with the latest IPTV subscription tips.',
  keywords: 'iptv blog, streaming guides, firestick tutorials, iptv tips, premium streaming 2026, IPTV subscription, IPTV streaming service, 4K streaming, HDR streaming, smart EPG guide, multi-device compatibility, IPTV with VPN, buffer-free streaming, premium IPTV channels',
  alternates: { canonical: 'https://orca4ktv.com/blog' },
  openGraph: {
    title: 'IPTV Blog 2026 — Streaming Guides, Firestick Tutorials & Reviews',
    description: 'Expert IPTV guides, 4K streaming tutorials, and Firestick / Smart TV walkthroughs from the ORCA 4K TV Editorial Team.',
    url: 'https://orca4ktv.com/blog',
    images: [{ url: 'https://orca4ktv.com/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IPTV Blog 2026 — Streaming Guides & Tutorials',
    description: 'Expert IPTV streaming guides and tutorials from the ORCA 4K TV Editorial Team.',
  },
}

export default function BlogListPage() {
  const posts = getPublishedPosts()
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://orca4ktv.com/' },
          { name: 'Blog', url: 'https://orca4ktv.com/blog' },
        ]}
      />
      <BlogPage posts={posts} />
    </>
  )
}
