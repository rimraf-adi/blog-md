'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatDate, getExcerpt, type BlogPost } from '@/lib/markdown';
import { ArrowRight, Loader, TrendingUp, Calendar, User } from 'lucide-react';

export default function HomePage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/blogs');
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const blogPosts = await response.json();
        setPosts(blogPosts);
      } catch (err) {
        console.error('Failed to fetch blog posts:', err);
        setError('Failed to load blog posts. Please check your configuration.');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (error) {
    return (
      <main className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gold-gradient mb-4">Blog</h1>
            <div className="glass-card p-6 rounded-xl">
              <p className="font-semibold text-[#EF4444]">Configuration Required</p>
              <p className="text-sm mt-2 text-[#94A3B8]">{error}</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.3)] mb-6">
            <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-sm text-[#D4AF37]">Latest Market Insights</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-[#F8FAFC]">Stay Ahead in</span>
            <br />
            <span className="text-gold-gradient">Financial Markets</span>
          </h1>
          <p className="text-xl text-[#94A3B8] max-w-2xl mx-auto">
            Expert analysis, market trends, and investment strategies to help you make informed financial decisions.
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="flex flex-col items-center gap-4">
              <Loader className="animate-spin text-[#D4AF37]" size={40} />
              <p className="text-[#94A3B8]">Loading insights...</p>
            </div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16">
            <div className="glass-card p-12 rounded-2xl max-w-lg mx-auto">
              <TrendingUp className="w-16 h-16 text-[#D4AF37] mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-[#F8FAFC] mb-2">No Posts Yet</h2>
              <p className="text-[#94A3B8]">Fresh financial insights are coming soon. Stay tuned!</p>
            </div>
          </div>
        ) : (
          /* Blog Grid */
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article
                  className={`glass-card h-full rounded-2xl overflow-hidden group cursor-pointer ${index === 0 ? 'md:col-span-2 lg:col-span-2' : ''
                    }`}
                >
                  {/* Thumbnail or Gradient Header */}
                  {post.frontmatter.thumbnail ? (
                    <div className={`relative overflow-hidden ${index === 0 ? 'h-48 md:h-64' : 'h-40'}`}>
                      <img
                        src={post.frontmatter.thumbnail}
                        alt={post.frontmatter.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,22,40,0.8)] to-transparent" />
                    </div>
                  ) : (
                    <div className="h-2 bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#10B981]" />
                  )}

                  <div className="p-6">
                    {/* Tags */}
                    {post.frontmatter.tags && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {(post.frontmatter.tags as string[]).slice(0, 3).map((tag: string) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs rounded-full bg-[rgba(212,175,55,0.1)] text-[#D4AF37] border border-[rgba(212,175,55,0.2)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Title */}
                    <h2 className={`font-bold text-[#F8FAFC] group-hover:text-[#D4AF37] transition-colors mb-3 ${index === 0 ? 'text-2xl md:text-3xl' : 'text-xl'
                      }`}>
                      {post.frontmatter.title}
                    </h2>

                    {/* Description */}
                    <p className="text-[#94A3B8] leading-relaxed mb-4">
                      {post.frontmatter.description || getExcerpt(post.content, 150)}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between pt-4 border-t border-[rgba(212,175,55,0.1)]">
                      <div className="flex items-center gap-4 text-sm text-[#64748B]">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(post.frontmatter.date)}
                        </span>
                        {post.frontmatter.author && (
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {post.frontmatter.author}
                          </span>
                        )}
                      </div>
                      <ArrowRight className="w-5 h-5 text-[#D4AF37] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
