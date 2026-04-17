'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { BlogPost } from '@/lib/posts'

export default function AdminDashboardClient({ posts: initialPosts }: { posts: BlogPost[] }) {
  const router = useRouter()
  const [posts, setPosts] = useState(initialPosts)
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null)

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin')
  }

  async function handleDelete(slug: string) {
    if (!confirm('Delete this post? This cannot be undone.')) return
    setDeletingSlug(slug)
    try {
      const res = await fetch(`/api/posts/${slug}`, { method: 'DELETE' })
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.slug !== slug))
      } else {
        alert('Failed to delete post.')
      }
    } finally {
      setDeletingSlug(null)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-white/5 px-6 py-4 flex items-center justify-between sticky top-0 bg-[#0a0a0a] z-10">
        <div className="flex items-center gap-3">
          <span className="text-xl font-black text-white">
            SMART <span className="text-red-500">4K</span>
          </span>
          <span className="text-gray-500 text-sm font-semibold">/ Admin</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href="/admin/orders"
            className="text-gray-400 hover:text-white text-sm font-semibold px-4 py-2 rounded-xl border border-white/10 hover:border-white/20 transition-colors"
          >
            Orders
          </Link>
          <Link
            href="/admin/clients"
            className="text-gray-400 hover:text-white text-sm font-semibold px-4 py-2 rounded-xl border border-white/10 hover:border-white/20 transition-colors"
          >
            Clients
          </Link>
          <Link
            href="/admin/new"
            className="bg-red-600 hover:bg-red-700 text-white text-sm font-black px-5 py-2 rounded-xl uppercase tracking-wider transition-colors"
          >
            + New Post
          </Link>
          <button
            onClick={handleLogout}
            className="text-gray-500 hover:text-white text-sm font-semibold px-4 py-2 rounded-xl border border-white/10 hover:border-white/20 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-black text-white">All Posts <span className="text-gray-600 text-lg">({posts.length})</span></h2>
          <Link href="/" target="_blank" className="text-gray-500 hover:text-red-400 text-sm transition-colors">
            View Site ↗
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-24 text-gray-600">
            <p className="text-5xl mb-4">📝</p>
            <p className="text-xl font-bold mb-2">No posts yet</p>
            <p className="text-sm mb-6">Create your first blog post to get started.</p>
            <Link href="/admin/new" className="bg-red-600 hover:bg-red-700 text-white font-black px-6 py-3 rounded-xl transition-colors">
              + Create First Post
            </Link>
          </div>
        ) : (
          <div className="bg-[#1a1d20] rounded-2xl border border-white/5 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <th className="text-left px-6 py-4">Title</th>
                  <th className="text-left px-6 py-4 hidden md:table-cell">Category</th>
                  <th className="text-left px-6 py-4 hidden md:table-cell">Date</th>
                  <th className="text-left px-6 py-4">Status</th>
                  <th className="text-right px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, idx) => (
                  <tr
                    key={post.slug}
                    className={`border-b border-white/5 hover:bg-white/[0.02] transition-colors ${
                      idx === posts.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {post.imageUrl && (
                          <img
                            src={post.imageUrl}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover hidden sm:block bg-white/5"
                          />
                        )}
                        <div>
                          <p className="text-white font-bold text-sm leading-tight mb-1 line-clamp-1">{post.title}</p>
                          <p className="text-gray-600 text-xs font-mono">/blog/{post.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="text-gray-400 text-sm">{post.category || '—'}</span>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="text-gray-500 text-sm">{post.date}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                        post.status === 'published'
                          ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                          : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                      }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="text-gray-500 hover:text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
                        >
                          View ↗
                        </Link>
                        <Link
                          href={`/admin/edit/${post.slug}`}
                          className="text-gray-300 hover:text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(post.slug)}
                          disabled={deletingSlug === post.slug}
                          className="text-red-500 hover:text-red-400 disabled:opacity-50 text-xs font-bold px-3 py-1.5 rounded-lg border border-red-500/20 hover:border-red-500/40 transition-colors"
                        >
                          {deletingSlug === post.slug ? '…' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
