'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import type { BlogPost } from '@/lib/posts'

// Lazy-load the editor (it's heavy and needs the browser)
const RichTextEditor = dynamic(() => import('./RichTextEditor'), { ssr: false, loading: () => (
  <div className="bg-[#0a0a0a] border border-white/10 rounded-xl h-64 flex items-center justify-center text-gray-600">
    Loading editor…
  </div>
)})

interface AdminPostFormProps {
  mode: 'new' | 'edit'
  post?: BlogPost
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

const CATEGORIES = ['Tutorials', 'Guides', 'News', 'Reviews', 'Tips & Tricks', 'Sports', 'Setup']

export default function AdminPostForm({ mode, post }: AdminPostFormProps) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [title, setTitle] = useState(post?.title ?? '')
  const [slug, setSlug] = useState(post?.slug ?? '')
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(mode === 'edit')
  const [content, setContent] = useState(post?.content ?? '')
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? '')
  const [category, setCategory] = useState(post?.category ?? 'Tutorials')
  const [author, setAuthor] = useState(post?.author ?? '')
  const [authorRole, setAuthorRole] = useState(post?.authorRole ?? '')
  const [imageUrl, setImageUrl] = useState(post?.imageUrl ?? '')
  const [seoKeywords, setSeoKeywords] = useState(post?.seoKeywords ?? '')
  const [readTime, setReadTime] = useState(post?.readTime ?? '5 min read')
  const [status, setStatus] = useState<'published' | 'draft'>(post?.status ?? 'draft')
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleImageUpload(file: File) {
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (!res.ok) setError(data.error || 'Upload failed.')
      else setImageUrl(data.url)
    } catch {
      setError('Upload failed. Try again.')
    } finally {
      setUploading(false)
    }
  }

  // Auto-generate slug from title
  useEffect(() => {
    if (!slugManuallyEdited && title) {
      setSlug(slugify(title))
    }
  }, [title, slugManuallyEdited])

  async function handleSave(publishStatus: 'published' | 'draft') {
    if (!title.trim()) { setError('Title is required.'); return }
    if (!slug.trim()) { setError('Slug is required.'); return }
    if (!content || content === '<p></p>') { setError('Content cannot be empty.'); return }

    setSaving(true)
    setError('')

    const payload: Partial<BlogPost> = {
      id: post?.id ?? String(Date.now()),
      slug: slug.trim(),
      title: title.trim(),
      excerpt: excerpt.trim(),
      content,
      contentFormat: 'html',
      date: post?.date ?? formatDate(new Date()),
      readTime: readTime.trim() || '5 min read',
      author: author.trim(),
      authorRole: authorRole.trim(),
      imageUrl: imageUrl.trim(),
      category: category.trim(),
      seoKeywords: seoKeywords.trim(),
      status: publishStatus,
    }

    try {
      const url = mode === 'new' ? '/api/posts' : `/api/posts/${post!.slug}`
      const method = mode === 'new' ? 'POST' : 'PUT'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Save failed.')
      } else {
        router.push('/admin/dashboard')
        router.refresh()
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-white/5 px-6 py-4 flex items-center justify-between sticky top-0 bg-[#0a0a0a] z-10">
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard" className="text-gray-500 hover:text-white transition-colors">← Back</Link>
          <span className="text-gray-600">/</span>
          <span className="text-white font-bold text-sm">{mode === 'new' ? 'New Post' : 'Edit Post'}</span>
        </div>
        <div className="flex items-center gap-3">
          {error && <span className="text-red-400 text-sm font-semibold">{error}</span>}
          <button
            onClick={() => handleSave('draft')}
            disabled={saving}
            className="text-gray-300 hover:text-white text-sm font-bold px-4 py-2 rounded-xl border border-white/10 hover:border-white/20 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save Draft'}
          </button>
          <button
            onClick={() => handleSave('published')}
            disabled={saving}
            className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-sm font-black px-5 py-2 rounded-xl uppercase tracking-wider transition-colors"
          >
            {saving ? 'Publishing…' : 'Publish'}
          </button>
        </div>
      </div>

      {/* Main editor area */}
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        {/* Left: Title + Editor */}
        <div className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title…"
            className="w-full bg-transparent text-white text-3xl md:text-4xl font-black placeholder-gray-700 border-b border-white/10 pb-4 focus:outline-none focus:border-white/30 transition-colors"
          />

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Slug</label>
            <div className="flex items-center gap-2 bg-[#1a1d20] border border-white/10 rounded-xl px-4 py-2">
              <span className="text-gray-600 text-sm">/blog/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => { setSlug(e.target.value); setSlugManuallyEdited(true) }}
                className="flex-1 bg-transparent text-gray-300 text-sm focus:outline-none font-mono"
                placeholder="post-slug"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Content</label>
            <RichTextEditor
              content={content}
              onChange={setContent}
              placeholder="Start writing your article here…"
            />
          </div>
        </div>

        {/* Right: Meta sidebar */}
        <div className="space-y-5">
          {/* Status */}
          <div className="bg-[#1a1d20] rounded-2xl border border-white/5 p-5 space-y-3">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider">Publish Settings</h3>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'published' | 'draft')}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/30"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Read Time</label>
              <input
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="5 min read"
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/30"
              />
            </div>
          </div>

          {/* Category & Featured Image */}
          <div className="bg-[#1a1d20] rounded-2xl border border-white/5 p-5 space-y-3">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider">Category & Image</h3>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/30"
              >
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Featured Image</label>
              {/* Upload drop zone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault()
                  const file = e.dataTransfer.files[0]
                  if (file) handleImageUpload(file)
                }}
                className="w-full border-2 border-dashed border-white/10 hover:border-red-500/50 rounded-xl p-4 text-center cursor-pointer transition-colors"
              >
                {uploading ? (
                  <p className="text-gray-500 text-xs">Uploading…</p>
                ) : imageUrl ? (
                  <img src={imageUrl} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
                ) : (
                  <div className="py-4">
                    <p className="text-2xl mb-1">🖼</p>
                    <p className="text-gray-500 text-xs">Click or drag & drop an image</p>
                    <p className="text-gray-600 text-xs mt-0.5">JPG, PNG, WEBP · max 5MB</p>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleImageUpload(file)
                  e.target.value = ''
                }}
              />
              {/* Manual URL fallback */}
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Or paste an image URL…"
                className="mt-2 w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-white/30"
              />
              {imageUrl && (
                <button
                  onClick={() => setImageUrl('')}
                  className="mt-1 text-xs text-red-500 hover:text-red-400 transition-colors"
                >
                  Remove image
                </button>
              )}
            </div>
          </div>

          {/* Author */}
          <div className="bg-[#1a1d20] rounded-2xl border border-white/5 p-5 space-y-3">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider">Author</h3>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Name</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Alex Mercer"
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/30"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Role</label>
              <input
                type="text"
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
                placeholder="Senior Streaming Architect"
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/30"
              />
            </div>
          </div>

          {/* SEO */}
          <div className="bg-[#1a1d20] rounded-2xl border border-white/5 p-5 space-y-3">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider">SEO</h3>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Excerpt (meta description)</label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A short summary shown in search results and blog cards…"
                rows={3}
                maxLength={200}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/30 resize-none"
              />
              <p className="text-right text-xs text-gray-600">{excerpt.length}/200</p>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">SEO Keywords</label>
              <input
                type="text"
                value={seoKeywords}
                onChange={(e) => setSeoKeywords(e.target.value)}
                placeholder="keyword one, keyword two, keyword three"
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/30"
              />
            </div>
          </div>

          {/* Preview link */}
          {mode === 'edit' && post && (
            <Link
              href={`/blog/${post.slug}`}
              target="_blank"
              className="block text-center text-gray-500 hover:text-white text-sm py-2 rounded-xl border border-white/10 hover:border-white/20 transition-colors"
            >
              Preview post ↗
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
