"use client";

import { ReactNode, useEffect, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ImageGrid from "@/Page/Photography/index";
import { usePathname } from "next/navigation";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'; // icono de flecha

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300); // muestra el botón después de 300px
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
          position: "relative",
        }}
      >
        {/* Navbar siempre visible */}
        <Navbar />

        {/* Página principal */}
        {pathname === "/" && <ImageGrid />}

        <main style={{ flex: 1 }}>{children}</main>

        {/* Footer siempre al final */}
        <Footer />

        {/* Botón flotante Scroll to Top */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            style={{
              position: "fixed",
              bottom: "30px",
              right: "30px",
              width: "50px",
              height: "50px",
              backgroundColor: "white",
              color: "black",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
              zIndex: 1000,
            }}
          >
            <ArrowUpwardIcon />
          </button>
        )}
      </body>
    </html>
  );
}
