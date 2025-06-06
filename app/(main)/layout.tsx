import { ReactNode } from "react";
import { NavBar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen animate-in fade-in bg-background overflow-x-hidden w-full max-w-[100vw]">
      <NavBar />
      <main className="flex flex-col grow h-full w-full overflow-x-hidden">{children}</main>
      <Footer />
    </div>
  );
}
