import { BlogHero } from '@/components/website/blog/hero';
import { BlogGrid } from '@/components/website/blog/grid';
import { Metadata } from 'next';
import { getAllBlogs } from '@/lib/blog-service';

export const metadata: Metadata = {
  title: 'Blog | HandLine Safety Insights',
  description: 'Explore our collection of articles, insights, and resources about industrial safety, glove technology and industry standards.',
};

// Disable static generation for this page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BlogPage() {
  // Get the latest blog posts from Supabase
  const { data: blogPosts } = await getAllBlogs({ published: true });
  
  console.log(`Fetched ${blogPosts?.length || 0} blog posts for display`);
  
  return (
    <main className="flex flex-col min-h-[100dvh]">
      <BlogHero />
      <div id="blog-grid" className="bg-[#F5EFE0]/80 dark:bg-transparent py-12">
        <BlogGrid blogPosts={blogPosts || []} />
      </div>
    </main>
  );
} 