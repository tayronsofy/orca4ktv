'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import type { BlogPost as BlogPostType } from '@/lib/posts'
import { ChevronLeft } from 'lucide-react'

interface Heading {
  id: string
  text: string
  level: number
}

const extractHeadings = (markdown: string): Heading[] => {
  const headings: Heading[] = []
  const lines = markdown.split('\n')
  lines.forEach((line) => {
    const match = line.match(/^(#{2,3})\s+(.*)$/)
    if (match) {
      const level = match[1].length
      let text = match[2].trim()
      text = text.replace(/[*_~`]/g, '')
      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-')
      headings.push({ id, text, level })
    }
  })
  return headings
}

interface BlogPostProps {
  post: BlogPostType
}

const BlogPostContent: React.FC<BlogPostProps> = ({ post }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [post.slug])

  // Initialize FAQ toggles (data-faq-toggle blocks inserted from editor)
  useEffect(() => {
    const toggles = document.querySelectorAll('[data-faq-toggle]')
    const handlers: Array<{ el: Element; fn: EventListener }> = []
    toggles.forEach((toggle) => {
      const fn = () => {
        const body = toggle.nextElementSibling as HTMLElement | null
        const icon = toggle.querySelector('[data-faq-icon]') as HTMLElement | null
        if (body) {
          const isOpen = body.style.display === 'block'
          body.style.display = isOpen ? 'none' : 'block'
          if (icon) icon.textContent = isOpen ? '+' : '−'
        }
      }
      toggle.addEventListener('click', fn)
      handlers.push({ el: toggle, fn })
    })
    return () => { handlers.forEach(({ el, fn }) => el.removeEventListener('click', fn)) }
  }, [post.slug])

  const toc = post.contentFormat === 'html' ? [] : extractHeadings(post.content)

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": [`https://smart4k.io${post.imageUrl}`],
    "datePublished": new Date(post.date).toISOString(),
    "dateModified": new Date(post.date).toISOString(),
    "author": [{
      "@type": "Person",
      "name": post.author,
      "jobTitle": post.authorRole
    }]
  }

  return (
    <div className="min-h-screen bg-[#020204] pt-[120px] pb-24 px-6 md:px-12 lg:px-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="max-w-4xl mx-auto animate-fade-in text-white/90">
        <div className="mb-8">
          <Link href="/blog" className="inline-flex items-center text-red-500 hover:text-white transition-colors uppercase font-black text-xs tracking-widest bg-red-500/10 px-4 py-2 rounded-full border border-red-500/20">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Blog
          </Link>
        </div>

        <div className="relative w-full h-96 rounded-3xl overflow-hidden shadow-2xl mb-12 border border-white/5 bg-[#1a1d20]">
          {post.imageUrl && (
            <Image
              src={post.imageUrl}
              alt={`${post.title} - ${post.seoKeywords.split(',')[0]}`}
              title={post.excerpt}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020204] to-transparent"></div>
          <div className="absolute bottom-6 left-8 flex items-center gap-4">
            <div className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              {post.category}
            </div>
            <div className="text-gray-300 text-sm font-bold flex items-center gap-2">
              <span>{post.date}</span>
              <span className="opacity-50">•</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight drop-shadow-xl text-white">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 mb-16 pb-8 border-b border-white/10">
          <div className="w-12 h-12 rounded-full bg-red-600/20 text-red-500 flex items-center justify-center font-black text-xl border border-red-500/20">
            {post.author.charAt(0)}
          </div>
          <div>
            <div className="text-white font-bold text-lg">{post.author}</div>
            <div className="text-red-400 font-semibold text-sm">{post.authorRole}</div>
          </div>
        </div>

        {toc.length > 0 && (
          <div className="bg-black/50 border border-white/10 p-6 md:p-8 rounded-3xl mb-16 shadow-2xl backdrop-blur-md">
            <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-600/20 text-red-500 flex items-center justify-center text-sm border border-red-500/30">
                📋
              </div>
              Table of Contents
            </h3>
            <ul className="space-y-4">
              {toc.map((heading, idx) => (
                <li key={idx} className={`${heading.level === 3 ? 'ml-8 text-sm opacity-80' : 'font-bold'}`}>
                  <a href={`#${heading.id}`} className="text-gray-300 hover:text-red-500 transition-colors flex items-center gap-3 group">
                    {heading.level === 2 && (
                      <span className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity text-xs relative -left-2 group-hover:left-0">▶</span>
                    )}
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="prose prose-invert prose-lg md:prose-xl max-w-none prose-headings:font-black prose-headings:text-white prose-a:text-red-500 prose-blockquote:border-red-500 prose-blockquote:bg-red-500/5 prose-blockquote:not-italic prose-blockquote:py-2">
          {post.contentFormat === 'html' ? (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
              {post.content}
            </ReactMarkdown>
          )}
        </div>

        {/* World Cup 2026 CTA */}
        <div className="mt-16 rounded-2xl border border-white/10 bg-[#0d1117] p-8 md:p-10">
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-black uppercase tracking-widest text-green-400">
              ⚽ World Cup 2026 Offer
            </span>
          </div>
          <h3 className="mb-3 text-2xl font-black text-white md:text-3xl">
            Smart 4K is the most stable IPTV – watch every match without buffering
          </h3>
          <p className="mb-4 text-gray-400 font-semibold">
            3M +1 FREE &bull; 6M +2 FREE &bull; 12M +3 FREE
          </p>
          <div className="mb-6 flex items-center gap-2">
            <span className="text-yellow-400 text-lg">★★★★★</span>
            <span className="text-gray-400 text-sm font-semibold">rated <span className="text-white font-bold">4.8</span> on Trustpilot</span>
          </div>
          <a
            href="/pricing"
            className="inline-block rounded-xl bg-green-500 px-8 py-3.5 text-sm font-black uppercase tracking-widest text-white transition-colors hover:bg-green-400"
          >
            Claim World Cup Deal →
          </a>
          <p className="mt-4 text-xs text-gray-600">
            Offer valid for new subscribers and single-device plans only.
          </p>
        </div>
      </div>

      <style>{`
        .prose h1 { font-size: 2.5rem; margin-bottom: 2rem; margin-top: 3rem; line-height: 1.2; background: linear-gradient(to right, #ef4444, #ffffff); -webkit-background-clip: text; color: transparent; }
        .prose h2 { font-size: 2rem; margin-top: 3rem; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem; }
        .prose h3 { font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem; }
        .prose p { line-height: 1.8; margin-bottom: 0; color: #d1d5db; padding-bottom: 1.5rem; }
        .prose p + p { border-top: 1px solid transparent; background-image: linear-gradient(to right, transparent, rgba(239,68,68,0.25) 20%, rgba(239,68,68,0.25) 80%, transparent); background-size: 100% 1px; background-repeat: no-repeat; background-position: top; padding-top: 1.5rem; }
        .prose ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.5rem; }
        .prose li { margin-bottom: 0.5rem; color: #d1d5db; }
        .prose strong { color: white; font-weight: 800; }
      `}</style>
    </div>
  )
}

export default BlogPostContent
