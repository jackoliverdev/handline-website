'use client';

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { MessageSquare, Sparkles, Send } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { motion } from 'framer-motion';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      companyName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // This would typically send data to your API/backend
    console.log(values);
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
    form.reset();
  }

  return (
    <div>
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
        id="contact-form"
        style={{ scrollMarginTop: "60px" }}
      >
        <div className="inline-flex items-center mb-6 rounded-full bg-brand-primary/10 px-4 py-1 text-sm border border-[#F28C38]/40 backdrop-blur-sm">
          <MessageSquare className="mr-2 h-4 w-4 text-brand-primary" />
          <span className="text-brand-dark dark:text-white font-medium">
            Get In Touch
          </span>
        </div>
        
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-brand-dark dark:text-white">Send Us a Message</h2>
        <p className="mx-auto mt-4 text-lg text-brand-secondary dark:text-gray-300 max-w-xl">
          Have questions about our safety gloves or need product recommendations? We're here to help.
        </p>
      </motion.div>

      <div className="flex justify-center">
        <div className="w-full max-w-xl">
          <div id="contact-form" className="rounded-lg border border-brand-primary/10 dark:border-brand-primary/20 bg-[#F5EFE0]/80 dark:bg-transparent p-6 shadow-sm backdrop-blur-sm">
            <h3 className="mb-4 text-xl font-semibold text-brand-dark dark:text-white">Contact HandLine</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-brand-dark dark:text-white">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} className="border-brand-primary/20 bg-[#F5EFE0]/80 dark:bg-transparent" />
                      </FormControl>
                      <FormMessage className="text-brand-primary" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-brand-dark dark:text-white">Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your organisation" {...field} className="border-brand-primary/20 bg-[#F5EFE0]/80 dark:bg-transparent" />
                      </FormControl>
                      <FormMessage className="text-brand-primary" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-brand-dark dark:text-white">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@company.com" {...field} className="border-brand-primary/20 bg-[#F5EFE0]/80 dark:bg-transparent" />
                      </FormControl>
                      <FormMessage className="text-brand-primary" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-brand-dark dark:text-white">Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Product inquiry or support request" {...field} className="border-brand-primary/20 bg-[#F5EFE0]/80 dark:bg-transparent" />
                      </FormControl>
                      <FormMessage className="text-brand-primary" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-brand-dark dark:text-white">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your safety requirements or questions about our products..."
                          className="min-h-32 resize-none border-brand-primary/20 bg-[#F5EFE0]/80 dark:bg-transparent"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-brand-primary" />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  size="lg"
                  className="w-full group relative overflow-hidden rounded-lg bg-brand-primary text-white font-medium shadow-md hover:bg-brand-primary/90 hover:shadow-lg transition-all duration-300"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    Send Message
                  </span>
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
