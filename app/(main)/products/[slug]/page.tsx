import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getAllProducts, getRelatedProducts } from "@/lib/products-service";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Flame, Scissors, User2, Link2, Download, ListChecks, ChevronRight } from "lucide-react";
import { ProductImageGallery } from "@/components/website/products/product-image-gallery";
import { ProductCard } from "@/components/website/products/product-card";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  // Decode the slug to get the original product name
  const decodedSlug = decodeURIComponent(params.slug);
  const { product } = await getProductBySlug(decodedSlug);
  
  if (!product) {
    return {
      title: "Product Not Found | HandLine Company",
      description: "The requested product could not be found.",
    };
  }
  
  return {
    title: `${product.name} | HandLine Company`,
    description: product.short_description || product.description.substring(0, 160),
  };
}

export async function generateStaticParams() {
  const { products } = await getAllProducts();
  
  return products.map((product) => ({
    slug: encodeURIComponent(product.name),
  }));
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ProductPage({ params }: ProductPageProps) {
  // Decode the slug to get the original product name
  const decodedSlug = decodeURIComponent(params.slug);
  const { product } = await getProductBySlug(decodedSlug);
  
  if (!product) {
    notFound();
  }
  
  // Check if the product is new (created within the last 30 days)
  const isNew = new Date(product.created_at).getTime() > Date.now() - (30 * 24 * 60 * 60 * 1000);

  // Fetch related products if available
  const { relatedProducts } = await getRelatedProducts(product.id);
  const hasRelatedProducts = relatedProducts && relatedProducts.length > 0;

  return (
    <main className="bg-brand-light dark:bg-background min-h-screen pt-20">
      {/* Breadcrumb */}
      <div className="border-b border-brand-primary/10 dark:border-brand-primary/20 mt-6">
        <div className="container py-3">
          <div className="flex items-center text-sm text-brand-secondary dark:text-gray-400">
            <Link href="/" className="hover:text-brand-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-brand-primary">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-brand-dark dark:text-white font-medium">{product.name}</span>
          </div>
        </div>
      </div>
      
      {/* Product main content */}
      <section className="container py-8 md:py-12">
        <Link 
          href="/products" 
          className="inline-flex items-center text-sm text-brand-secondary hover:text-brand-primary mb-6 dark:text-gray-400 dark:hover:text-white group transition-all duration-300"
        >
          <ChevronLeft className="mr-1 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to products
        </Link>
      
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Product images */}
          <ProductImageGallery
            mainImage={product.image_url || ''}
            image2={product.image2_url}
            image3={product.image3_url}
            image4={product.image4_url}
            additionalImages={product.additional_images}
            productName={product.name}
            isFeatured={product.is_featured}
            isNew={isNew}
            outOfStock={product.out_of_stock}
          />
          
          {/* Product info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2 overflow-x-auto pb-1 scrollbar-hide max-w-full">
                <Badge variant="outline" className="border-brand-primary/30 text-brand-secondary dark:text-gray-300 whitespace-nowrap flex-shrink-0">
                  {product.category}
                </Badge>
                {product.sub_category && (
                  <Badge variant="outline" className="border-brand-primary/30 text-brand-secondary dark:text-gray-300 whitespace-nowrap flex-shrink-0">
                    {product.sub_category}
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl text-brand-dark dark:text-white">{product.name}</h1>
            </div>
            
            <div className="pt-2">
              <p className="text-brand-secondary dark:text-gray-300 leading-relaxed">
                {product.short_description || product.description}
              </p>
            </div>
            
            <Separator className="my-6 border-brand-primary/10 dark:border-brand-primary/20" />
            
            {/* Product details tabs */}
            <div className="pt-2">
              <Tabs defaultValue="specifications" className="w-full">
                <TabsList className="w-full justify-start bg-transparent mb-4 border-b border-brand-primary/10 dark:border-brand-primary/20">
                  <TabsTrigger 
                    value="specifications" 
                    className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-brand-primary"
                  >
                    Specifications
                  </TabsTrigger>
                  <TabsTrigger 
                    value="features" 
                    className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-brand-primary"
                  >
                    Features
                  </TabsTrigger>
                  <TabsTrigger 
                    value="applications" 
                    className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-brand-primary"
                  >
                    Applications
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="specifications" className="mt-0">
                  <div className="space-y-4">
                    {/* Product Description */}
                    <div className="group relative overflow-hidden rounded-lg border bg-[#F5EFE0]/80 dark:bg-transparent shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm dark:backdrop-blur-none p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <ListChecks className="h-5 w-5 text-brand-primary" />
                        <h3 className="font-medium text-brand-dark dark:text-white">Product Details</h3>
                      </div>
                      <p className="text-brand-secondary dark:text-gray-300">{product.description}</p>
                    </div>
                    
                    {/* Technical Specifications */}
                    <h4 className="text-lg font-medium text-brand-dark dark:text-white mt-4 mb-2">Technical Specifications</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.temperature_rating && (
                        <div className="group relative overflow-hidden rounded-lg border bg-[#F5EFE0]/80 dark:bg-transparent shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm dark:backdrop-blur-none p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Flame className="h-5 w-5 text-brand-primary" />
                            <h3 className="font-medium text-brand-dark dark:text-white">Temperature Rating</h3>
                          </div>
                          <p className="text-brand-secondary dark:text-gray-300">{product.temperature_rating}°C</p>
                        </div>
                      )}
                      
                      {product.cut_resistance_level && (
                        <div className="group relative overflow-hidden rounded-lg border bg-[#F5EFE0]/80 dark:bg-transparent shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm dark:backdrop-blur-none p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Scissors className="h-5 w-5 text-brand-primary" />
                            <h3 className="font-medium text-brand-dark dark:text-white">Cut Resistance Level</h3>
                          </div>
                          <p className="text-brand-secondary dark:text-gray-300">{product.cut_resistance_level}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="group relative overflow-hidden rounded-lg border bg-[#F5EFE0]/80 dark:bg-transparent shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm dark:backdrop-blur-none p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <User2 className="h-5 w-5 text-brand-primary" />
                        <h3 className="font-medium text-brand-dark dark:text-white">Industries</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {product.industries && product.industries.length > 0 ? (
                          product.industries.map((industry) => (
                            <Badge key={industry} variant="outline" className="bg-brand-primary/5 border-brand-primary/20">
                              {industry}
                            </Badge>
                          ))
                        ) : (
                          <p className="text-brand-secondary dark:text-gray-300">No industry information available</p>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="features" className="mt-0">
                  {product.features && product.features.length > 0 ? (
                    <Card className="group relative overflow-hidden border bg-[#F5EFE0]/80 dark:bg-transparent shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm dark:backdrop-blur-none">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-4">
                          <ListChecks className="h-5 w-5 text-brand-primary" />
                          <h3 className="font-medium text-brand-dark dark:text-white">Key Features</h3>
                        </div>
                        <ul className="list-disc list-inside space-y-2 text-brand-secondary dark:text-gray-300">
                          {product.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ) : (
                    <p className="text-brand-secondary dark:text-gray-300">
                      No feature information available for this product.
                    </p>
                  )}
                </TabsContent>
                
                <TabsContent value="applications" className="mt-0">
                  {product.applications && product.applications.length > 0 ? (
                    <Card className="group relative overflow-hidden border bg-[#F5EFE0]/80 dark:bg-transparent shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm dark:backdrop-blur-none">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-4">
                          <User2 className="h-5 w-5 text-brand-primary" />
                          <h3 className="font-medium text-brand-dark dark:text-white">Recommended Applications</h3>
                        </div>
                        <ul className="list-disc list-inside space-y-2 text-brand-secondary dark:text-gray-300">
                          {product.applications.map((application, index) => (
                            <li key={index}>{application}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ) : (
                    <p className="text-brand-secondary dark:text-gray-300">
                      No application information available for this product.
                    </p>
                  )}
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Technical Sheet */}
            {product.technical_sheet_url && (
              <div className="pt-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-brand-primary/30 bg-[#F5EFE0]/80 dark:bg-transparent text-brand-primary hover:bg-brand-primary/10 hover:border-brand-primary hover:text-black dark:hover:text-white dark:hover:bg-brand-primary/5 transition-all duration-300 group"
                  asChild
                >
                  <a href={product.technical_sheet_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                    <Download className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-1" />
                    Download Technical Sheet
                  </a>
                </Button>
              </div>
            )}
            
            {/* Enquiry Button */}
            <div className="pt-4">
              <Button
                variant="default"
                size="lg"
                className="w-full bg-brand-primary text-white hover:bg-brand-primary/90 transition-all duration-300 group"
                asChild
              >
                <Link href="/contact" className="flex items-center justify-center gap-2">
                  <Link2 className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" />
                  Submit Enquiry
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Products Section */}
      <section className="border-t border-brand-primary/10 dark:border-brand-primary/20 py-16">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-8 text-brand-dark dark:text-white">Related Safety Products</h2>
          
          {hasRelatedProducts ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-10">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          ) : (
            <p className="text-center text-brand-secondary dark:text-gray-300 mb-8">
              No related products available at this time.
            </p>
          )}
          
          <div className="text-center">
            <Button asChild className="bg-brand-primary hover:bg-brand-primary/90 text-white transition-all duration-300 group">
              <Link href="/products" className="flex items-center justify-center gap-2">
                View All Products
                <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
} 