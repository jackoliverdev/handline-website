import { AuthCard } from "@/components/auth-card";
import { ProviderLoginButtons } from "@/components/auth/provider-login-buttons";
import { OrSeparator } from "@/components/ui/or-separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Example LTD",
  description: "Sign in to your Example LTD account",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-background/80">
      <div className="container flex flex-1 flex-col items-center justify-center py-12 md:py-20">
        <div className="mx-auto w-full max-w-lg space-y-6 px-4 md:px-0">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Customer Portal
            </h1>
            <p className="text-muted-foreground">
              Access your account dashboard and services
            </p>
          </div>
          
          <AuthCard />
          
          <div className="space-y-4">
            <OrSeparator />
            <ProviderLoginButtons />
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            By signing in, you agree to our{" "}
            <a href="/legal?tab=terms" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/legal?tab=privacy" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
