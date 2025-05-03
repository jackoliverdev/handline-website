"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Award, ArrowRight, ChevronRight, Shield, Clock, Factory, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GlovesModel } from "./3d-model";

const SPRING_CONFIG = { stiffness: 100, damping: 30, mass: 1 };

export const Hero = () => {
  return (
    <div className="relative overflow-visible bg-brand-light dark:bg-background pb-28 sm:pb-32 pt-28 sm:pt-12">
      {/* Decorative Elements */}
      <div className="absolute -top-32 -right-32 h-[300px] w-[300px] md:h-[500px] md:w-[500px] rounded-full bg-brand-primary/5 blur-3xl dark:bg-brand-primary/10"></div>
      <div className="absolute -bottom-32 -left-32 h-[250px] w-[250px] md:h-[400px] md:w-[400px] rounded-full bg-brand-primary/10 blur-3xl dark:bg-brand-primary/5"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent"></div>
      
      <div className="container relative z-10 mx-auto px-4 pt-2 pb-10 sm:pt-4 sm:pb-14 lg:pt-6 lg:pb-16 overflow-visible">
        <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2 overflow-visible">
          <div className="flex flex-col space-y-4 sm:space-y-8 mb-4 sm:mb-0">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={SPRING_CONFIG}
              className="mb-0 sm:mb-2"
            >
              <div className="inline-flex items-center rounded-full bg-transparent dark:bg-transparent px-3 py-1 text-xs sm:text-sm border border-[#F28C38] backdrop-blur-sm">
                <Award className="mr-1.5 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4 text-[#F28C38]" />
                <span className="text-brand-dark dark:text-white font-medium font-heading">
                  40+ Years of Expertise
                </span>
              </div>
            </motion.div>
            
            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING_CONFIG, delay: 0.1 }}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight font-heading">
                <span className="text-brand-dark dark:text-white">Your Hands </span>
                <span className="text-[#F28C38]">
                  Protected
                </span>
              </h1>
            </motion.div>
            
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING_CONFIG, delay: 0.2 }}
            >
              <p className="max-w-2xl text-base md:text-lg text-brand-secondary dark:text-gray-300">
                HandLine Company is an Italian manufacturer specialising in high-performance safety gloves for industrial settings. 
                Our heat-resistant and cut-resistant gloves provide unmatched protection up to 350°C with precision and comfort.
              </p>
            </motion.div>
            
            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING_CONFIG, delay: 0.3 }}
              className="flex flex-col space-y-3 sm:flex-row sm:space-x-6 sm:space-y-0 pt-4 sm:pt-4 w-full"
            >
              {/* Products Button */}
              <a 
                href="/products#product-categories"
                className="group flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-[#F28C38] text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:bg-[#F28C38]/90 w-full sm:w-auto text-sm md:text-base h-10 md:h-auto"
              >
                <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Explore Products</span>
                <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              
              {/* Get in Touch Button */}
              <Link 
                href="/contact" 
                className="group flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 sm:py-3 border-2 border-brand-primary text-brand-primary dark:text-white dark:border-white hover:text-brand-primary hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300 rounded-lg font-medium w-full sm:w-auto text-sm md:text-base h-10 md:h-auto"
              >
                <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Get in Touch</span>
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-all duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
          
          {/* 3D Gloves Model */}
          <div className="relative h-[350px] sm:h-[500px] md:h-[650px] mt-2 sm:mt-20 lg:mt-36 overflow-visible" style={{ zIndex: 999 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...SPRING_CONFIG, delay: 0.4 }}
              className="absolute inset-0 flex justify-center items-center overflow-visible"
              style={{ zIndex: 999 }}
            >
              <GlovesModel />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}; 