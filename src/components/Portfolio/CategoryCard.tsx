"use client";

import { Box } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      onClick={onClick}
    >
      <Box
        sx={{
          position: "relative",
          height: 400,
          overflow: "hidden",
          cursor: "pointer",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          transition: "all 0.4s ease",
          "&:hover": {
            transform: "translateY(-12px)",
            borderColor: "rgba(255, 255, 255, 0.3)",
            boxShadow: "0 30px 60px rgba(0, 0, 0, 0.8)",
            "& img": {
              transform: "scale(1.08)",
            },
            "& .overlay": {
              opacity: 1,
            },
          },
        }}
      >
        <Image
          src={category.image}
          alt={category.name}
          fill
          style={{
            objectFit: "cover",
            transition: "transform 0.4s ease",
          }}
          priority
        />

        <Box
          className="overlay"
          sx={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            padding: "2rem",
            opacity: 0,
            transition: "opacity 0.4s ease",
          }}
        >
          <Box
            sx={{
              fontFamily: "'Inconsolata', monospace",
              fontSize: "1.8rem",
              fontWeight: 300,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "white",
              textAlign: "center",
            }}
          >
            {category.name}
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}
