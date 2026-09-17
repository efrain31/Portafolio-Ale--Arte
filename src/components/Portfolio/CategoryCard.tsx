"use client";

import { Box } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import { useParallax } from "./useParallax";

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    image: string;
  };
  onClick: () => void;
  delay?: number;
}

export default function CategoryCard({ category, onClick, delay = 0 }: CategoryCardProps) {
  const { ref, offset } = useParallax(45);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      {/* Tarjeta plana, a sangre: sin borde, sombra ni elevación. La imagen
          vive en una capa más alta que el recorte (overflow hidden) y se
          desplaza en Y según el scroll — parallax al estilo ysl.com — y
          además hace un leve zoom al hover. */}
      <Box
        ref={ref}
        sx={{
          position: "relative",
          height: { xs: 380, md: 620 },
          overflow: "hidden",
          "&:hover img": {
            transform: "scale(1.04)",
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: "-12% 0",
            height: "124%",
            willChange: "transform",
          }}
          style={{ transform: `translateY(${offset}px)` }}
        >
          <Image
            src={category.image}
            alt={category.name}
            fill
            style={{
              objectFit: "cover",
              transition: "transform 0.6s ease",
            }}
            priority
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.4rem 1rem",
        }}
      >
        <Box
          sx={{
            fontFamily: "'Inconsolata', monospace",
            fontSize: "0.85rem",
            fontWeight: 500,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "white",
          }}
        >
          {category.name}
        </Box>
      </Box>
    </motion.div>
  );
}
