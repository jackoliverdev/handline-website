"use client";

import { SignInForm } from "@/components/auth/sign-in-form";
import { SignUpForm } from "@/components/auth/sign-up-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "reactfire";
import { AnimatePresence, motion } from "framer-motion";

export const AuthCard = () => {
  const [isShowingSignUp, setIsShowingSignUp] = useState<boolean>(false);
  const { data: user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      // Check if user is admin (jackoliverdev@gmail.com) before redirecting
      if (user.email === "jackoliverdev@gmail.com") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    }
  }, [user, router]);
  
  return (
    <Card className="w-full border-border/40 shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">
          {isShowingSignUp ? "Create Your Account" : "Welcome Back"}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {isShowingSignUp 
            ? "Create an account to access our full suite of services and features."
            : "Enter your credentials to access your account and dashboard."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          <motion.div
            key={isShowingSignUp ? "signup" : "signin"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {isShowingSignUp ? (
              <SignUpForm onShowLogin={() => setIsShowingSignUp(false)} />
            ) : (
              <SignInForm onShowSignUp={() => setIsShowingSignUp(true)} />
            )}
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};
