'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { formatDate, type BlogPost } from '@/lib/markdown';
import { getBlogPostBySlug } from '@/lib/github-blog-loader';
import { MarkdownRenderer } from '@/components/markdown-renderer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader } from 'lucide-react';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const blogPost = await getBlogPostBySlug(slug);
        if (!blogPost) {
          setError('Blog post not found');
        } else {
          setPost(blogPost);
        }
      } catch (err) {
        console.error('Failed to fetch blog post:', err);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <Loader className="animate-spin text-muted-foreground" size={32} />
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <Link href="/">
            <Button variant="outline" className="mb-8 bg-transparent">
              <ArrowLeft size={16} className="mr-2" />
              Back to Blog
            </Button>
          </Link>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">404</h1>
            <p className="text-muted-foreground">{error || 'Blog post not found'}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-16">
        {/* Back Button */}
        <Link href="/">
          <Button variant="outline" className="mb-8 bg-transparent">
            <ArrowLeft size={16} className="mr-2" />
            Back to Blog
          </Button>
        </Link>

        {/* Article */}
        <article className="prose prose-sm max-w-none">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {post.frontmatter.title}
            </h1>

            <div className="flex items-center gap-4 text-muted-foreground border-b border-border pb-6">
              <time dateTime={post.frontmatter.date}>
                {formatDate(post.frontmatter.date)}
              </time>
              {post.frontmatter.author && (
                <>
                  <span className="text-border">•</span>
                  <span>By {post.frontmatter.author}</span>
                </>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="text-foreground leading-relaxed">
            <MarkdownRenderer content={post.content} />
          </div>
        </article>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-border">
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft size={16} className="mr-2" />
              Back to All Posts
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
