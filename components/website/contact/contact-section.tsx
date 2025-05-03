'use client';

import { ContactForm } from './contact-form';
import { ContactInfo } from './contact-info';

export function ContactSection() {
  return (
    <section className="container max-w-7xl mx-auto py-12 md:py-16 bg-[#F5EFE0]/80 dark:bg-transparent backdrop-blur-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
        <div className="lg:col-span-5 lg:flex lg:flex-col lg:pt-0">
          <ContactInfo />
        </div>
      </div>
    </section>
  );
} 