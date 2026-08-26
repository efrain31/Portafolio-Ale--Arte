import type { ReactNode } from "react";
import type { Metadata } from "next";
import LayoutClient from "./layout-client";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ale Vazquez - Artista",
  description: "Portafolio de Ale Vazquez",
  icons: {
    icon: "/favicon.ico",
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
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
