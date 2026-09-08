"use client";

import { Box } from "@mui/material";
import Link from "next/link";

interface BackLinkProps {
  href: string;
  label: string;
}

// Enlace de regreso reutilizado en las páginas legacy del dropdown
// (Food, Restorations, About, etc.), que no tienen otra forma de navegar
// hacia atrás. Mismo estilo que el "← Volver a Categorías" de SubCategoryGrid.
export default function BackLink({ href, label }: BackLinkProps) {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          cursor: "pointer",
          padding: "0.5rem 0",
          marginBottom: "1.5rem",
          color: "rgba(255, 255, 255, 0.7)",
          transition: "color 0.3s",
          fontFamily: "'Inconsolata', monospace",
          fontSize: "0.9rem",
          letterSpacing: "1px",
          textTransform: "uppercase",
          "&:hover": {
            color: "white",
          },
        }}
      >
        ← {label}
      </Box>
    </Link>
  );
}
