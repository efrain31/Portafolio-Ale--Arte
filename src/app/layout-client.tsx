"use client";

import type { ReactNode } from "react";
import GlobalHeader from "@/components/Header/GlobalHeader";
import Footer from "@/components/Footer/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import Watermark from "@/components/Watermark/Watermark";

export default function LayoutClient({ children }: { children: ReactNode }) {

  return (
    <>
      <GlobalHeader />
      <main className="main-content" style={{ flex: 1 }}>{children}</main>
      <Footer />
      <ScrollToTopButton />
      <Watermark />
    </>
  );
}
