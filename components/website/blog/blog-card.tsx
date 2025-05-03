'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, User, Tag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import type { BlogPost } from '@/lib/blog-service';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  // Calculate the reading time (approximately 200 words per minute)
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);
  
  // Format the date
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  const formattedDate = post.published_at 
    ? formatDate(post.published_at)
    : formatDate(post.created_at);
  
  // Fallback image if image_url is null
  const imageUrl = post.image_url || '/images/placeholder-blog.jpg';

  // Check if the post is new (created within the last 14 days)
  const isNew = post.published_at 
    ? new Date(post.published_at).getTime() > Date.now() - (14 * 24 * 60 * 60 * 1000)
    : false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: Math.min(index * 0.1, 0.8),
        duration: 0.3,
      }}
      className="group relative overflow-hidden rounded-lg border bg-[#F5EFE0]/80 dark:bg-transparent shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm dark:backdrop-blur-none"
    >
      {/* New Badge */}
      {isNew && (
        <Badge 
          className="absolute right-3 top-3 z-10 bg-brand-primary text-white"
        >
          New
        </Badge>
      )}
      
      {/* Blog Image */}
      <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-black dark:bg-black">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>
      
      {/* Blog Details */}
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {post.tags.slice(0, 2).map((tag, idx) => (
                <Badge key={idx} variant="outline" className="text-xs border-brand-primary/30 text-brand-secondary dark:text-gray-300">
                  {tag}
                </Badge>
              ))}
              {post.tags.length > 2 && (
                <Badge variant="outline" className="text-xs border-brand-primary/30 text-brand-secondary dark:text-gray-300">
                  +{post.tags.length - 2}
                </Badge>
              )}
            </div>
          )}
        </div>
        
        <Link href={`/blog/${post.slug}`}>
          <h3 className="mb-2 line-clamp-1 text-lg font-bold text-brand-dark hover:text-brand-primary dark:text-white dark:hover:text-brand-primary">
            {post.title}
          </h3>
        </Link>
        
        <p className="mb-3 text-sm text-brand-secondary dark:text-gray-300 line-clamp-2">
          {post.summary}
        </p>
        
        {/* Meta info */}
        <div className="mb-4 grid grid-cols-2 gap-2">
          <div className="flex items-center text-sm text-brand-secondary dark:text-gray-300">
            <User className="mr-1 h-4 w-4 text-brand-primary" />
            <span className="truncate">{post.author}</span>
          </div>
          <div className="flex items-center text-sm text-brand-secondary dark:text-gray-300">
            <Clock className="mr-1 h-4 w-4 text-brand-primary" />
            <span>{readingTime} min read</span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="mt-2 grid grid-cols-1 gap-2">
          <Button 
            variant="default" 
            size="sm" 
            className="flex items-center justify-between bg-brand-primary text-white hover:bg-brand-primary/90"
            asChild
          >
            <Link href={`/blog/${post.slug}`}>
              <span>Read Article</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
} 