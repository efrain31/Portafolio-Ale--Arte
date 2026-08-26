"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function LayoutClient({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideNavbar = pathname === "/";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main className="main-content" style={{ flex: 1 }}>{children}</main>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}
