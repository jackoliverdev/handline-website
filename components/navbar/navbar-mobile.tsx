"use client";

import { usePathname } from "next/navigation";
import { NavbarUserLinks } from "@/components/navbar/navbar-user-links";
import { Button } from "@/components/ui/button";
import * as Sheet from "@/components/ui/sheet";
import { Menu, X, ChevronRight, Sun, Moon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { WebsiteThemeToggle } from "@/components/theme/website-theme-toggle";
import { useState } from "react";
import { useWebsiteTheme } from "@/hooks/use-website-theme";

export const NavbarMobile = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme, mounted } = useWebsiteTheme();
  
  return (
    <>
      <Button 
        size="icon" 
        variant="ghost" 
        className="rounded-full h-9 w-9 flex items-center justify-center hover:bg-[#F5EFE0]/50 dark:hover:bg-gray-800/40" 
        onClick={() => setOpen(true)}
      >
        <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        <span className="sr-only">Open menu</span>
      </Button>

      <Sheet.Sheet open={open} onOpenChange={setOpen}>
        <Sheet.SheetContent side="right" className="w-[85vw] max-w-[350px] p-0 rounded-l-2xl border-l-0 bg-[#F5EFE0]/90 dark:bg-background backdrop-blur-sm dark:backdrop-blur-none">
          <div className="flex flex-col h-full">
            <div className="border-b border-brand-primary/10 dark:border-gray-800/50 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-brand-primary to-brand-primary/80 p-[2px] shadow-md">
                  <div className="h-full w-full rounded-full bg-[#F5EFE0] dark:bg-slate-900 p-1">
                    <Image 
                      src="/handline-logo.png"
                      alt="HandLine Company Logo"
                      width={24}
                      height={24}
                      className="h-full w-full object-contain"
                      priority
                    />
                  </div>
                </div>
                <span className="font-semibold text-lg text-brand-primary">HandLine</span>
              </div>
              <Button 
                size="icon" 
                variant="ghost" 
                className="rounded-full h-8 w-8 hover:bg-[#F5EFE0] dark:hover:bg-gray-800/40"
                onClick={() => setOpen(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>

            <div className="flex-1 overflow-auto py-6 px-4">
              <nav className="flex flex-col space-y-2">
                {[
                  { href: "/", label: "Home" },
                  { href: "/products", label: "Products" },
                  { href: "/industries", label: "Industries" },
                  { href: "/about", label: "About Us" },
                  { href: "/blog", label: "Blog" },
                  { href: "/contact", label: "Contact" },
                ].map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link 
                      key={item.href} 
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center px-5 py-3 text-sm font-medium rounded-xl transition-all ${
                        isActive 
                          ? "text-white bg-brand-primary dark:bg-transparent dark:text-brand-primary dark:border-2 dark:border-brand-primary shadow-md" 
                          : "text-gray-700 dark:text-gray-300 hover:bg-[#F5EFE0] dark:hover:bg-gray-800/40"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="border-t border-brand-primary/10 dark:border-gray-800/50 p-4 space-y-4">
              {/* Theme Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center justify-between w-full px-3 py-2 rounded-xl bg-[#F5EFE0] dark:bg-gray-800/20 hover:bg-[#F5EFE0]/70 dark:hover:bg-gray-800/40 transition-colors border border-brand-primary/10 dark:border-brand-primary/20 focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                aria-label="Toggle theme"
              >
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Theme</span>
                <span className="rounded-full h-8 w-8 bg-white dark:bg-gray-800 border border-brand-primary/20 dark:border-brand-primary/30 flex items-center justify-center">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 text-gray-800 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 text-brand-primary transition-all dark:rotate-0 dark:scale-100" />
                </span>
              </button>
              
              {/* Dashboard Button */}
              <Link 
                href="/login" 
                onClick={() => setOpen(false)} 
                className="block w-full"
              >
                <Button
                  className="w-full justify-between bg-brand-primary hover:bg-brand-primary/90 text-white shadow-md"
                >
                  <span>Dashboard</span>
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </Sheet.SheetContent>
      </Sheet.Sheet>
    </>
  );
};
