"use client";

import { Box } from "@mui/material";
import Image from "next/image";
import { useParallax } from "./useParallax";

interface ParallaxSectionProps {
  image: string;
  label?: string;
  height?: { xs: number | string; md: number | string };
  /** Apila la sección con position:sticky para que la siguiente sección
   * (con un zIndex mayor) se deslice por encima y la "cubra" al hacer
   * scroll — el efecto de paneles que se tapan entre sí de ysl.com. */
  zIndex?: number;
}

// Sección editorial a sangre entre bloques de contenido — la imagen vive en
// una capa más grande que el recorte y se desplaza en Y con el scroll
// (parallax), igual que los bloques de imagen suelta entre grids de
// categorías en ysl.com.
export default function ParallaxSection({
  image,
  label,
  height = { xs: "100vh", md: "100vh" },
  zIndex,
}: ParallaxSectionProps) {
  const { ref, offset } = useParallax(70);

  return (
    <Box
      sx={{
        position: zIndex ? "sticky" : "relative",
        top: zIndex ? 0 : undefined,
        zIndex,
        height,
        overflow: "hidden",
        width: "100%",
        backgroundColor: "#000000",
      }}
    >
      <Box ref={ref} sx={{ position: "relative", height: "100%", width: "100%", overflow: "hidden" }}>
        <Box
          sx={{
            position: "absolute",
            inset: "-15% 0",
            height: "130%",
            willChange: "transform",
          }}
          style={{ transform: `translateY(${offset}px)` }}
        >
          <Image
            src={image}
            alt={label ?? ""}
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </Box>

        {label && (
          <Box
            sx={{
              position: "absolute",
              left: { xs: "1.5rem", md: "3rem" },
              bottom: { xs: "1.5rem", md: "3rem" },
              fontFamily: "'Inconsolata', monospace",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "white",
              textShadow: "0 1px 8px rgba(0,0,0,0.7)",
            }}
          >
            {label}
          </Box>
        )}
      </Box>
    </Box>
  );
}
