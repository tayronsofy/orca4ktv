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
    "image": [`https://orca4ktv.com${post.imageUrl}`],
    "datePublished": new Date(post.date).toISOString(),
    "dateModified": new Date(post.date).toISOString(),
    "author": [{
      "@type": "Person",
      "name": post.author,
      "jobTitle": post.authorRole
    }]
  }

  return (
    <div className="min-h-screen bg-[#00050d] pt-[120px] pb-24 px-6 md:px-12 lg:px-24">
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

        <div className="relative w-full h-96 rounded-3xl overflow-hidden shadow-2xl mb-12 border border-white/5 bg-[#001a36]">
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#00050d] to-transparent"></div>
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
            <div dangerouslySetInnerHTML={{ __html: post.content.replace(/<h1(\s[^>]*)?>/gi, '<h2$1>').replace(/<\/h1>/gi, '</h2>') }} />
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSlug]}
              components={{
                // Demote any in-body H1 to H2 — the page already has one H1 (post title)
                h1: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
              }}
            >
              {post.content}
            </ReactMarkdown>
          )}
        </div>

        {/* Social Share */}
        {(() => {
          const url = `https://orca4ktv.com/blog/${post.slug}`
          const text = encodeURIComponent(post.title)
          const encodedUrl = encodeURIComponent(url)
          return (
            <div className="mt-12 border-t border-white/10 pt-10">
              <p className="mb-4 text-xs font-black uppercase tracking-widest text-gray-500">Share this article</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1877f2]/10 border border-[#1877f2]/30 px-5 py-2.5 text-sm font-bold text-[#1877f2] transition-colors hover:bg-[#1877f2]/20"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  Facebook
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${text}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-black/40 border border-white/20 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  X
                </a>
                <a
                  href={`https://reddit.com/submit?url=${encodedUrl}&title=${text}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#ff4500]/10 border border-[#ff4500]/30 px-5 py-2.5 text-sm font-bold text-[#ff4500] transition-colors hover:bg-[#ff4500]/20"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>
                  Reddit
                </a>
                <a
                  href={`https://wa.me/?text=${text}%20${encodedUrl}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#25d366]/10 border border-[#25d366]/30 px-5 py-2.5 text-sm font-bold text-[#25d366] transition-colors hover:bg-[#25d366]/20"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
              </div>
            </div>
          )
        })()}

        {/* World Cup 2026 CTA */}
        <div className="mt-16 rounded-2xl border border-white/10 bg-[#000a1c] p-8 md:p-10">
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-black uppercase tracking-widest text-green-400">
              ⚽ World Cup 2026 Offer
            </span>
          </div>
          <h3 className="mb-3 text-2xl font-black text-white md:text-3xl">
            Orca 4K TV is the most stable IPTV – watch every match without buffering
          </h3>
          <p className="mb-4 text-gray-400 font-semibold">
            3M +1 FREE &bull; 6M +2 FREE &bull; 12M +3 FREE
          </p>
          <div className="mb-6 flex items-center gap-2">
            <span className="text-yellow-400 text-lg">★★★★★</span>
            <span className="text-gray-400 text-sm font-semibold">rated <span className="text-white font-bold">4.8</span> on Trustpilot</span>
          </div>
          <a
            href="/#pricing"
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
