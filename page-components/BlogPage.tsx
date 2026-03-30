'use client'

import React from 'react'
import Link from 'next/link'
import { blogPosts } from '@/data/blogData'

const BlogPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#020204] py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto mt-16">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-white drop-shadow-xl">
            SMART 4K <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white">BLOG</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            The ultimate resource for cutting the cord, optimizing your Firestick, and mastering 4K Live Sports streaming.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.id}
              className="group bg-[#1a1d20] rounded-3xl overflow-hidden hover:scale-105 transition-all duration-300 border border-white/5 hover:border-red-500/50 shadow-2xl flex flex-col"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1d20] to-transparent"></div>
                <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  {post.category}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center text-xs text-gray-500 mb-4 font-bold tracking-wider">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-red-400 transition-colors leading-tight">
                  {post.title}
                </h2>
                <p className="text-gray-400 leading-relaxed mb-6 flex-1">{post.excerpt}</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-600/20 text-red-500 flex items-center justify-center font-black">
                    {post.author.charAt(0)}
                  </div>
                  <div className="text-sm">
                    <div className="text-white font-bold">{post.author}</div>
                    <div className="text-gray-500 text-xs">{post.authorRole}</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogPage
