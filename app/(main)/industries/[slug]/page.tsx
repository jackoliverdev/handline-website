import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { ChevronLeft, Tag, Box, Shield, Factory, Users, Wrench } from 'lucide-react';

import { getIndustryBySlug, getRelatedProducts } from '@/lib/industries-service';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from "@/components/ui/separator";
import { ProductCard } from '@/components/website/products/product-card';
import { MarkdownContent } from '@/components/website/blog/markdown-content';

interface IndustryPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const industry = await getIndustryBySlug(params.slug);
  
  if (!industry) {
    return {
      title: 'Industry Not Found',
    };
  }
  
  return {
    title: `${industry.industry_name} Safety Solutions | HandLine Company`,
    description: industry.description.split('\n\n')[0] || industry.description,
  };
}

// Disable static generation for this page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function IndustryPage({ params }: IndustryPageProps) {
  const industry = await getIndustryBySlug(params.slug);
  
  if (!industry) {
    notFound();
  }
  
  // Get related products if any are specified
  const relatedProducts = industry.related_products && industry.related_products.length > 0
    ? await getRelatedProducts(industry.related_products)
    : [];

  // Parse the description to extract features and benefits
  const parseDescription = (description: string) => {
    const paragraphs = description.split('\n\n').filter(p => p.trim() !== '');
    
    // Extract main description (first paragraph)
    const mainDescription = paragraphs[0] || '';
    
    // Extract bullet points for features
    const features: string[] = [];
    const lines = description.split('\n');
    for (const line of lines) {
      if (line.trim().startsWith('- ')) {
        features.push(line.trim().substring(2).trim());
      }
    }
    
    return { mainDescription, features };
  };
  
  const { mainDescription, features } = parseDescription(industry.description);

  // Extract tags from industry data or use fallback
  const tags = industry.tags || ['Safety', 'Protection', industry.industry_name];

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
              <Link href="/industries" className="flex items-center gap-1.5 text-brand-dark dark:text-gray-200 hover:text-brand-primary dark:hover:text-brand-primary">
                <ChevronLeft className="h-4 w-4 text-brand-primary" />
                Back to Industries
              </Link>
            </Button>
          </div>
          
          <div className="space-y-6">
            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag: string) => (
                  <Badge key={tag} variant="outline" className="bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 border-brand-primary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            
            {/* Featured Image */}
            {industry.image_url && (
              <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl">
                <Image 
                  src={industry.image_url}
                  alt={industry.industry_name}
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
              {industry.industry_name}
            </h1>
            
            {/* Industry Description */}
            <div className="text-lg text-brand-secondary dark:text-gray-300 max-w-3xl">
              <p>{mainDescription}</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Content Section */}
      {industry.content && (
        <section className="w-full pt-0 md:pt-0 pb-12 md:pb-16">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div>
              <MarkdownContent content={industry.content} />
            </div>
          </div>
        </section>
      )}
      
      {/* Features Section - Display only if content is NOT available */}
      {!industry.content && features.length > 0 && (
        <section className="w-full py-8 md:py-12">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-dark dark:text-white mb-6">
              Key Features
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-start p-4 rounded-lg bg-white/50 dark:bg-black/20 border border-brand-primary/10 backdrop-blur-sm"
                >
                  <Shield className="h-5 w-5 text-brand-primary mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-brand-secondary dark:text-gray-300">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Related Products - Renamed to match blog style */}
      {relatedProducts.length > 0 && (
        <section className="py-8 md:py-10">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2 text-brand-dark dark:text-white">Recommended Products</h2>
              <p className="text-brand-secondary dark:text-gray-300">
                Specialised safety equipment for {industry.industry_name} environments
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-brand-primary text-brand-primary hover:bg-brand-primary/10"
                asChild
              >
                <Link href="/products">
                  Browse All Products
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}
      
      {/* CTA Section */}
      <section className="w-full py-8 md:py-12">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-primary/10 border border-brand-primary/20 rounded-xl p-6 md:p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-dark dark:text-white mb-4">
              Need Custom Solutions?
            </h2>
            <p className="text-brand-secondary dark:text-gray-300 max-w-2xl mx-auto mb-6">
              Our specialists can help you design a tailored safety programme for your specific {industry.industry_name.toLowerCase()} requirements.
            </p>
            <Button 
              variant="default" 
              size="lg" 
              className="bg-brand-primary text-white hover:bg-brand-primary/90"
              asChild
            >
              <Link href="/contact">
                Contact Our Specialists
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
} 