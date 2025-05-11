"use client";

import React, { FC, useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { NavbarMobile } from "./navbar-mobile";
import { usePathname } from "next/navigation";
import { WebsiteThemeToggle } from "@/components/theme/website-theme-toggle";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/context/language-context";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Navigation items
const NAV_ITEMS = [
  { href: "/", label: "navbar.home" },
  { href: "/products", label: "navbar.products" },
  { href: "/industries", label: "navbar.industries" },
  { href: "/about", label: "navbar.about" },
  { href: "/blog", label: "navbar.blog" },
  { href: "/contact", label: "navbar.contact" },
];

export const NavBar: FC = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, x: 0, y: 0 });
  const [activeIndex, setActiveIndex] = useState(-1);
  const { t, language, setLanguage } = useLanguage();
  const langBtnRef = useRef<HTMLButtonElement | null>(null);
  
  // Don't render the navbar on dashboard routes
  if (pathname?.startsWith('/dashboard') || pathname?.startsWith('/app')) {
    return null;
  }
  
  // Update active index and dimensions when pathname changes
  useEffect(() => {
    const index = NAV_ITEMS.findIndex(item => item.href === pathname);
    setActiveIndex(index);
    
    // Update dimensions when active item changes
    if (index !== -1 && itemRefs.current[index] && navRef.current) {
      const activeItem = itemRefs.current[index];
      if (!activeItem || !navRef.current) return;
      const navRect = navRef.current.getBoundingClientRect();
      const rect = activeItem.getBoundingClientRect();
      
      setDimensions({
        width: rect.width,
        height: rect.height,
        x: rect.left - navRect.left,
        y: 0
      });
    }
  }, [pathname, language]);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);
  
  return (
    <header className="fixed w-full z-50 top-6 px-3">
      <div 
        className={`mx-auto max-w-4xl transition-all duration-300 rounded-full ${
          scrolled 
            ? "bg-white/80 backdrop-blur-md shadow-lg dark:bg-black/60 border border-brand-primary/10 dark:border-brand-primary/20"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between h-12 px-3">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="relative h-7 w-7">
                <Image 
                  src="/handline-logo.png" 
                  alt="HandLine Logo" 
                  fill
                  className="object-contain"
                />
              </div>
              <span className="ml-1.5 font-bold text-brand-dark dark:text-white">HandLine</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <nav ref={navRef} className="relative flex items-center">
              {/* Background Pill */}
              {activeIndex !== -1 && (
                <motion.div
                  className="absolute z-[-1] bg-brand-primary rounded-full"
                  initial={false}
                  animate={{
                    width: dimensions.width,
                    height: dimensions.height,
                    x: dimensions.x,
                    y: dimensions.y
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30
                  }}
                />
              )}
              
              {/* Navigation Items */}
              {NAV_ITEMS.map((item, index) => {
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      px-2.5 py-1 mx-0.5 rounded-full text-sm font-medium transition-colors
                      ${isActive 
                        ? "text-white" 
                        : "text-brand-dark dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-primary"
                      }
                    `}
                    ref={el => {
                      itemRefs.current[index] = el;
                    }}
                  >
                    {t(item.label)}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <WebsiteThemeToggle 
              variant="ghost" 
              className="rounded-full hover:bg-brand-primary/10 dark:hover:bg-brand-primary/20 text-brand-dark dark:text-gray-300" 
            />
            
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger ref={langBtnRef} className="rounded-full hover:bg-brand-primary/10 dark:hover:bg-brand-primary/20 p-2 text-brand-dark dark:text-gray-300">
                <Globe className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => { setLanguage('en'); langBtnRef.current?.blur(); }}>
                  <span role="img" aria-label="English" className="mr-2">🇬🇧</span> English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { setLanguage('it'); langBtnRef.current?.blur(); }}>
                  <span role="img" aria-label="Italian" className="mr-2">🇮🇹</span> Italiano
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link 
              href="/login" 
              className="px-3 py-1 bg-brand-primary text-white text-sm font-medium rounded-full hover:bg-brand-primary/90 transition-all"
            >
              {t('navbar.dashboard')}
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <NavbarMobile />
          </div>
        </div>
      </div>
    </header>
  );
};
