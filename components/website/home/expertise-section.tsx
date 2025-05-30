"use client";

import React from "react";
import { Flame, Scissors, Shield, Award } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/lib/context/language-context";

const features = [
  {
    icon: <Flame className="h-10 w-10 text-brand-primary" />,
    key: "heatResistance"
  },
  {
    icon: <Scissors className="h-10 w-10 text-brand-primary" />,
    key: "cutResistance"
  },
  {
    icon: <Shield className="h-10 w-10 text-brand-primary" />,
    key: "craftsmanship"
  },
  {
    icon: <Award className="h-10 w-10 text-brand-primary" />,
    key: "expertise"
  }
];

export const ExpertiseSection = () => {
  const { t } = useLanguage();

  return (
    <section className="pt-0 pb-16 -mt-64 sm:-mt-48 md:-mt-32 relative overflow-hidden bg-brand-light dark:bg-background border-brand-primary/10 dark:border-brand-primary/20">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-primary/5 dark:bg-brand-primary/10 rounded-bl-full"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/3 bg-brand-primary/5 dark:bg-brand-primary/10 rounded-tr-full"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center mb-2">
              <div className="h-1 w-10 bg-brand-primary rounded-full mr-3"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark dark:text-white mb-4 font-heading">
                {t('expertise.title')}
              </h2>
              <div className="h-1 w-10 bg-brand-primary rounded-full ml-3"></div>
            </div>
            <p className="text-lg text-brand-secondary dark:text-gray-300 max-w-2xl mx-auto">
              {t('expertise.description')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.key}
              className="bg-[#F5EFE0]/80 dark:bg-transparent p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group relative overflow-hidden border border-brand-primary/20 dark:border-brand-primary/30 backdrop-blur-sm dark:backdrop-blur-none"
            >
              <div className="flex items-center mb-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-brand-primary/10 rounded-full transform scale-150"></div>
                  <div className="relative z-10 p-2.5 rounded-full bg-brand-primary text-white">
                    {React.cloneElement(feature.icon, { className: "h-5 w-5 text-white" })}
                  </div>
                </div>
                <h3 className="ml-3 text-lg font-medium text-brand-dark dark:text-white group-hover:text-brand-primary transition-colors duration-300">
                  {t(`expertise.features.${feature.key}.title`)}
                </h3>
              </div>
              <p className="text-sm text-brand-secondary dark:text-gray-300 leading-relaxed">
                {t(`expertise.features.${feature.key}.description`)}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 sm:mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="relative py-4 px-4 bg-[#F5EFE0]/60 dark:bg-transparent rounded-lg shadow-sm border border-brand-primary/20 dark:border-brand-primary/30 backdrop-blur-sm dark:backdrop-blur-none col-span-1 lg:col-span-4 text-center">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <div className="h-16 w-16 p-1 rounded-full" style={{ backgroundColor: "#F28C38" }}>
                  <div className="h-full w-full rounded-full overflow-hidden border-2 border-white shadow-md bg-white">
                    <Image 
                      src="/avatars/FrancoCastronuovo.png" 
                      alt="Franco Castronuovo" 
                      width={96} 
                      height={96}
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center pt-8">
                <div className="flex items-center w-full">
                  <span className="text-2xl text-brand-primary opacity-80">"</span>
                  <p className="text-base text-brand-secondary dark:text-gray-300 font-medium italic px-2 text-center flex-1">
                    {t('expertise.quote.text')}
                  </p>
                  <span className="text-2xl text-brand-primary opacity-80">"</span>
                </div>
                <div className="flex items-center mt-2">
                  <div className="h-px w-4 sm:w-5 bg-brand-primary/40 mr-2"></div>
                  <p className="text-xs font-medium text-brand-dark dark:text-white">
                    {t('expertise.quote.author')}
                  </p>
                  <div className="h-px w-4 sm:w-5 bg-brand-primary/40 ml-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 