'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDate, getExcerpt, type BlogPost } from '@/lib/markdown';
import { getAllBlogPosts } from '@/lib/github-blog-loader';
import { ArrowRight, Loader } from 'lucide-react';

export default function HomePage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        // Make sure to set your GitHub config before calling this
        const blogPosts = await getAllBlogPosts();
        setPosts(blogPosts);
      } catch (err) {
        console.error('Failed to fetch blog posts:', err);
        setError('Failed to load blog posts. Please check your GitHub configuration.');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (error) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Blog</h1>
            <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
              <p className="font-semibold">Configuration Required</p>
              <p className="text-sm mt-2">{error}</p>
              <p className="text-sm mt-4">
                Please ensure you have:
              </p>
              <ul className="text-sm mt-2 space-y-1">
                <li>1. Set your GitHub repo configuration in your app initialization</li>
                <li>2. Created a public/blog-name/index.md file structure in your repo</li>
                <li>3. Added YAML frontmatter with title, date, and description</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Blog</h1>
          <p className="text-muted-foreground text-lg">
            Thoughts, stories, and ideas
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader className="animate-spin text-muted-foreground" size={32} />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No blog posts found yet.</p>
          </div>
        ) : (
          /* Blog Grid */
          <div className="grid gap-6 md:gap-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-border hover:border-primary/50">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {post.frontmatter.title}
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                          {formatDate(post.frontmatter.date)}
                        </CardDescription>
                      </div>
                      <ArrowRight size={20} className="text-muted-foreground flex-shrink-0 mt-1" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground leading-relaxed">
                      {post.frontmatter.description || getExcerpt(post.content, 200)}
                    </p>
                    {post.frontmatter.author && (
                      <p className="text-sm text-muted-foreground mt-4">
                        By {post.frontmatter.author}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
