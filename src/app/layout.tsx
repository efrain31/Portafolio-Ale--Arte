import type { Metadata } from "next";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ale Vazquez | Artista Visual",
  description:
    "Portafolio de Ale Vazquez — fotografía, ilustración, restauraciones y más.",
  openGraph: {
    title: "Ale Vazquez | Artista Visual",
    description:
      "Portafolio de Ale Vazquez — fotografía, ilustración, restauraciones y más.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
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
        <Navbar />
        <main className="main-content" style={{ flex: 1 }}>{children}</main>
        <Footer />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
