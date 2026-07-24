"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideNavbar = pathname === "/";

  return (
    <html lang="es">
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          margin: 0,
          backgroundColor: "black",
          color: "white",
          fontFamily: "'Inconsolata', monospace",
          letterSpacing: "0.45em",
          textTransform: "uppercase",
        }}
      >
        {!hideNavbar && <Navbar />}
        <main className="main-content" style={{ flex: 1 }}>{children}</main>
        <Footer />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
