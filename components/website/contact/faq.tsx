'use client';

import { motion } from 'framer-motion';
import { HelpCircle, ChevronDown, ArrowRight, Shield } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Define the component props with the motion div capabilities
type MotionDivProps = React.ComponentProps<typeof motion.div> & {
  ref?: React.Ref<HTMLDivElement>;
};

// FAQ content
const faqs = [
  {
    question: 'What types of safety gloves do you offer?',
    answer:
      'HandLine manufactures a comprehensive range of safety gloves including heat-resistant gloves (up to 350°C), cut-resistant gloves (up to Level 5), general-purpose work gloves, chemical-resistant gloves, and specialized gloves for various industries.',
  },
  {
    question: 'How do I choose the right safety gloves for my application?',
    answer:
      'We recommend assessing the specific hazards in your workplace (heat, cuts, chemicals, etc.), considering comfort and dexterity requirements, and ensuring proper sizing. Our team can provide personalized recommendations based on your industry and specific needs.',
  },
  {
    question: 'Are your gloves CE certified?',
    answer:
      'Yes, all HandLine safety gloves are CE certified and comply with relevant European standards including EN 388 for mechanical risks, EN 407 for thermal risks, and other applicable safety standards.',
  },
  {
    question: 'Do you offer custom solutions for specific industries?',
    answer:
      'Absolutely! We work closely with clients in various industries to develop tailored hand protection solutions. Contact our team to discuss your specific requirements, and we can develop or recommend products that meet your exact needs.',
  },
  {
    question: 'How can I request product samples?',
    answer:
      'You can request product samples by contacting our sales team through our contact form. Please specify which products you\'re interested in, your industry, and intended application. We typically provide samples for evaluation within 1-2 weeks.',
  }
];

export function ContactFaq() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 bg-[#F5EFE0]/80 dark:bg-transparent">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 text-center"
        >
          <div className="mb-4 inline-flex items-center rounded-full bg-brand-primary/10 px-3 py-1 text-sm border border-[#F28C38]/40 backdrop-blur-sm">
            <Shield className="mr-2 h-4 w-4 text-brand-primary" />
            <span className="text-brand-dark dark:text-white font-medium">
              Safety First
            </span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-brand-dark dark:text-white">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-brand-secondary dark:text-gray-300 max-w-2xl mx-auto">
            Find quick answers to common questions about our safety gloves and services
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 100,
                  damping: 15,
                  delay: index * 0.1,
                }}
              >
                <div
                  className={cn(
                    'overflow-hidden rounded-lg',
                    'bg-[#F5EFE0]/80 dark:bg-transparent shadow-sm',
                    'border border-brand-primary/10 dark:border-brand-primary/20',
                    'hover:border-brand-primary/30 transition-colors',
                    openIndex === index && 'border-brand-primary/40'
                  )}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="flex w-full items-center justify-between gap-4 p-4 text-left"
                  >
                    <span
                      className={cn(
                        'font-medium',
                        openIndex === index ? 'text-brand-primary' : 'text-brand-dark dark:text-white'
                      )}
                    >
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        'h-5 w-5 shrink-0 text-brand-primary transition-transform duration-200',
                        openIndex === index && 'rotate-180'
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      'grid transition-all duration-200 ease-in-out',
                      openIndex === index ? 'grid-rows-[1fr] pb-4' : 'grid-rows-[0fr]'
                    )}
                  >
                    <div className="overflow-hidden px-4">
                      <div className="text-brand-secondary dark:text-gray-300">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Support CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-12 text-center"
          >
            <Button asChild variant="outline" className="group font-medium rounded-lg border-2 border-brand-primary/30 text-brand-primary hover:bg-brand-primary/5 dark:text-white dark:border-white/20 dark:hover:bg-white/5 transition-all duration-300">
              <Link
                href="#contact-form"
                className="flex items-center gap-2"
              >
                Need more information? Contact our experts
                <ArrowRight className="h-4 w-4 transition-all duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 