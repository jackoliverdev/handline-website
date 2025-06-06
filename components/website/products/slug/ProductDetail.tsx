"use client";
import React from 'react';
import Link from "next/link";
import { useLanguage } from "@/lib/context/language-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Flame, Scissors, User2, Link2, Download, ListChecks, ChevronRight } from "lucide-react";
import { ProductImageGallery } from "@/components/website/products/product-image-gallery";
import { ProductCard } from "@/components/website/products/product-card";

export function ProductDetail({ product, relatedProducts }: { product: any, relatedProducts: any[] }) {
  const { t, language } = useLanguage();
  // Localise product fields
  const name = product.name_locales?.[language] || product.name;
  const description = product.description_locales?.[language] || product.description;
  const short_description = product.short_description_locales?.[language] || product.short_description;
  const category = product.category_locales?.[language] || product.category;
  const sub_category = product.sub_category_locales?.[language] || product.sub_category;
  const features = product.features_locales?.[language] || product.features;
  const applications = product.applications_locales?.[language] || product.applications;
  const industries = product.industries_locales?.[language] || product.industries;
  // Check if the product is new (created within the last 30 days)
  const isNew = new Date(product.created_at).getTime() > Date.now() - (30 * 24 * 60 * 60 * 1000);
  const hasRelatedProducts = relatedProducts && relatedProducts.length > 0;

  return (
    <main className="bg-brand-light dark:bg-background min-h-screen pt-20">
      {/* Breadcrumb */}
      <div className="border-b border-brand-primary/10 dark:border-brand-primary/20 mt-6">
        <div className="container py-3">
          <div className="flex items-center text-sm text-brand-secondary dark:text-gray-400">
            <Link href="/" className="hover:text-brand-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-brand-primary">{t('navbar.products')}</Link>
            <span className="mx-2">/</span>
            <span className="text-brand-dark dark:text-white font-medium">{name}</span>
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
          {t('productPage.backToProducts')}
        </Link>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Product images */}
          <ProductImageGallery
            mainImage={product.image_url || ''}
            image2={product.image2_url}
            image3={product.image3_url}
            image4={product.image4_url}
            additionalImages={product.additional_images}
            productName={name}
            isFeatured={product.is_featured}
            isNew={isNew}
            outOfStock={product.out_of_stock}
          />
          {/* Product info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2 overflow-x-auto pb-1 scrollbar-hide max-w-full">
                <Badge variant="outline" className="border-brand-primary/30 text-brand-secondary dark:text-gray-300 whitespace-nowrap flex-shrink-0">
                  {category}
                </Badge>
                {sub_category && (
                  <Badge variant="outline" className="border-brand-primary/30 text-brand-secondary dark:text-gray-300 whitespace-nowrap flex-shrink-0">
                    {sub_category}
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl text-brand-dark dark:text-white">{name}</h1>
            </div>
            <div className="pt-2">
              <p className="text-brand-secondary dark:text-gray-300 leading-relaxed">
                {short_description || description}
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
                    {t('productPage.specifications')}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="features" 
                    className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-brand-primary"
                  >
                    {t('productPage.features')}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="applications" 
                    className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-brand-primary"
                  >
                    {t('productPage.applications')}
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="specifications" className="mt-0">
                  <div className="space-y-4">
                    {/* Product Description */}
                    <div className="group relative overflow-hidden rounded-lg border bg-[#F5EFE0]/80 dark:bg-transparent shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm dark:backdrop-blur-none p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <ListChecks className="h-5 w-5 text-brand-primary" />
                        <h3 className="font-medium text-brand-dark dark:text-white">{t('productPage.productDetails')}</h3>
                      </div>
                      <p className="text-brand-secondary dark:text-gray-300">{description}</p>
                    </div>
                    {/* Technical Specifications */}
                    <h4 className="text-lg font-medium text-brand-dark dark:text-white mt-4 mb-2">{t('productPage.technicalSpecifications')}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.temperature_rating && (
                        <div className="group relative overflow-hidden rounded-lg border bg-[#F5EFE0]/80 dark:bg-transparent shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm dark:backdrop-blur-none p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Flame className="h-5 w-5 text-brand-primary" />
                            <h3 className="font-medium text-brand-dark dark:text-white">{t('productPage.temperatureRating')}</h3>
                          </div>
                          <p className="text-brand-secondary dark:text-gray-300">{product.temperature_rating}°C</p>
                        </div>
                      )}
                      {product.cut_resistance_level && (
                        <div className="group relative overflow-hidden rounded-lg border bg-[#F5EFE0]/80 dark:bg-transparent shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm dark:backdrop-blur-none p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Scissors className="h-5 w-5 text-brand-primary" />
                            <h3 className="font-medium text-brand-dark dark:text-white">{t('productPage.cutResistanceLevel')}</h3>
                          </div>
                          <p className="text-brand-secondary dark:text-gray-300">{product.cut_resistance_level}</p>
                        </div>
                      )}
                    </div>
                    <div className="group relative overflow-hidden rounded-lg border bg-[#F5EFE0]/80 dark:bg-transparent shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm dark:backdrop-blur-none p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <User2 className="h-5 w-5 text-brand-primary" />
                        <h3 className="font-medium text-brand-dark dark:text-white">{t('productPage.industries')}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {industries && industries.length > 0 ? (
                          industries.map((industry: string) => (
                            <Badge key={industry} variant="outline" className="bg-brand-primary/5 border-brand-primary/20">
                              {industry}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-brand-secondary dark:text-gray-400">-</span>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="features" className="mt-0">
                  <div className="space-y-4">
                    <div className="group relative overflow-hidden rounded-lg border bg-[#F5EFE0]/80 dark:bg-transparent shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm dark:backdrop-blur-none p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <ListChecks className="h-5 w-5 text-brand-primary" />
                        <h3 className="font-medium text-brand-dark dark:text-white">{t('productPage.features')}</h3>
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-brand-secondary dark:text-gray-300">
                        {features && features.length > 0 ? (
                          features.map((feature: string, idx: number) => (
                            <li key={idx}>{feature}</li>
                          ))
                        ) : (
                          <li>-</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="applications" className="mt-0">
                  <div className="space-y-4">
                    <div className="group relative overflow-hidden rounded-lg border bg-[#F5EFE0]/80 dark:bg-transparent shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm dark:backdrop-blur-none p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <ListChecks className="h-5 w-5 text-brand-primary" />
                        <h3 className="font-medium text-brand-dark dark:text-white">{t('productPage.applications')}</h3>
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-brand-secondary dark:text-gray-300">
                        {applications && applications.length > 0 ? (
                          applications.map((application: string, idx: number) => (
                            <li key={idx}>{application}</li>
                          ))
                        ) : (
                          <li>-</li>
                        )}
                      </ul>
                    </div>
                  </div>
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
                  {t('productPage.submitEnquiry')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 