import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Calendar, Clock, User, Share2, Tag } from 'lucide-react';
import { Metadata } from 'next';

import { getBlogBySlug, getRelatedBlogs } from '@/lib/blog-service';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BlogCard } from '@/components/website/blog/blog-card';
import { MarkdownContent } from '@/components/website/blog/markdown-content';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }
  
  return {
    title: `${post.title} | HandLine Blog`,
    description: post.summary,
  };
}

// Disable static generation for this page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogBySlug(params.slug);
  
  if (!post) {
    notFound();
  }
  
  // Calculate reading time (approximately 200 words per minute)
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);
  
  // Format the date
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  // Get related posts using tags
  const relatedPosts = post.tags && post.tags.length > 0 
    ? await getRelatedBlogs(post.id || '', post.tags, 3)
    : [];

  return (
    <main className="flex flex-col min-h-[100dvh] bg-[#F5EFE0]/80 dark:bg-transparent pt-8 md:pt-12">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-grid-primary/[0.02] absolute inset-0 [mask-image:radial-gradient(white,transparent_85%)]" />
        <div className="absolute -top-1/3 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-brand-primary/5 blur-[100px]" />
        <div className="absolute bottom-0 left-0 -z-10 h-[300px] w-[300px] rounded-full bg-brand-primary/10 blur-[100px]" />
      </div>

      {/* Hero Section */}
      <section className="relative w-full pt-4 pb-8 md:py-12">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-2 border-b border-brand-primary/10">
          {/* Back Button */}
          <div className="mb-6">
            <Button variant="outline" size="sm" asChild className="bg-[#F5EFE0]/90 hover:bg-[#F5EFE0] dark:bg-transparent dark:hover:bg-black/20 border-brand-primary/20 hover:border-brand-primary/40 dark:border-brand-primary/30 dark:hover:border-brand-primary/50 transition-all duration-200">
              <Link href="/blog" className="flex items-center gap-1.5 text-brand-dark dark:text-gray-200 hover:text-brand-primary dark:hover:text-brand-primary">
                <ChevronLeft className="h-4 w-4 text-brand-primary" />
                Back to Blogs
              </Link>
            </Button>
          </div>
          
          <div className="space-y-6">
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <Badge key={tag} variant="outline" className="bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 border-brand-primary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            
            {/* Featured Image - Moved here */}
            {post.image_url && (
              <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl">
                <Image 
                  src={post.image_url}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover transition-all duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 70vw"
                />
                <div className="absolute inset-0 rounded-xl border border-brand-primary/10 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
              </div>
            )}
            
            {/* Title */}
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-brand-dark dark:text-white">
              {post.title}
            </h1>
            
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-brand-secondary dark:text-gray-300">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary/10">
                  <User className="h-4 w-4 text-brand-primary" />
                </div>
                <span>{post.author}</span>
              </div>
              {post.published_at && (
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary/10">
                    <Calendar className="h-4 w-4 text-brand-primary" />
                  </div>
                  <span>{formatDate(post.published_at)}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary/10">
                  <Clock className="h-4 w-4 text-brand-primary" />
                </div>
                <span>{readingTime} min read</span>
              </div>
              <div className="ml-auto">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Content Section */}
      <section className="w-full pt-0 md:pt-0 pb-12 md:pb-16">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            {/* Use the client component for markdown rendering */}
            <MarkdownContent content={post.content} />
          </div>
        </div>
      </section>
      
      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-8 md:py-10">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2 text-brand-dark dark:text-white">Related Articles</h2>
              <p className="text-brand-secondary dark:text-gray-300">
                Continue reading with these related articles
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((post, index) => (
                <BlogCard key={post.slug} post={post} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
} 