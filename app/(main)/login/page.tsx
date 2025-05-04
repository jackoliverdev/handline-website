import { AuthCard } from "@/components/auth-card";
import { ProviderLoginButtons } from "@/components/auth/provider-login-buttons";
import { OrSeparator } from "@/components/ui/or-separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | HandLine Company",
  description: "Sign in to your HandLine Company account",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-light dark:bg-background pt-16 sm:pt-16">
      <div className="flex flex-1 items-center justify-center py-12 sm:py-20">
        <div className="w-full max-w-lg mx-auto px-4 sm:px-0 space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-heading text-brand-dark dark:text-white">
              Customer Portal
            </h1>
            <p className="text-brand-secondary dark:text-gray-300 font-body">
              Access your account dashboard and services
            </p>
          </div>
          <AuthCard />
          <div className="space-y-4">
            <OrSeparator />
            <ProviderLoginButtons />
          </div>
          <div className="text-center text-xs text-brand-secondary dark:text-gray-400 font-body">
            By signing in, you agree to our{" "}
            <a href="/legal?tab=terms" className="underline underline-offset-4 hover:text-brand-primary">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/legal?tab=privacy" className="underline underline-offset-4 hover:text-brand-primary">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
