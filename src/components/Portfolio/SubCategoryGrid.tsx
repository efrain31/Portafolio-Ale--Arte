"use client";

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import ImageGrid from "@/components/galerias/ImagenGrid";
import { ImageData } from "@/data/data";

interface SubCategoryGridProps {
  category: string;
  subCategories: Array<{
    name: string;
    images: ImageData[];
  }>;
}

export default function SubCategoryGrid({
  category,
  subCategories,
}: SubCategoryGridProps) {
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(null);

  const categoryLabel = {
    modelaje: "Modelaje",
    fotografia: "Fotografía",
    diseño: "Diseño",
  }[category] || category;

  if (selectedSubCategory !== null) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Box sx={{ marginBottom: "2rem" }}>
          <Box
            onClick={() => setSelectedSubCategory(null)}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              cursor: "pointer",
              padding: "0.5rem 0",
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
            ← Volver a {categoryLabel}
          </Box>
        </Box>

        <Typography
          sx={{
            fontFamily: "'Inconsolata', monospace",
            fontSize: "1.8rem",
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: "2rem",
            paddingBottom: "1rem",
            borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
            color: "rgba(255, 255, 255, 0.9)",
          }}
        >
          {subCategories[selectedSubCategory].name}
        </Typography>

        <ImageGrid images={subCategories[selectedSubCategory].images} />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Typography
        sx={{
          fontFamily: "'Inconsolata', monospace",
          fontSize: "2rem",
          letterSpacing: "2px",
          textTransform: "uppercase",
          marginBottom: "3rem",
          paddingBottom: "1rem",
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
          color: "rgba(255, 255, 255, 0.9)",
        }}
      >
        {categoryLabel}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "2rem",
        }}
      >
        {subCategories.map((subCat, index) => (
          <motion.div
            key={subCat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            onClick={() => setSelectedSubCategory(index)}
          >
            <Box
              sx={{
                position: "relative",
                height: 300,
                overflow: "hidden",
                cursor: "pointer",
                background: "#000000",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  borderColor: "rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.8)",
                  "& img": {
                    transform: "scale(1.05)",
                  },
                  "& .label": {
                    opacity: 1,
                  },
                },
              }}
            >
              <img
                src={subCat.images[0]?.src}
                alt={subCat.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                  display: "block",
                }}
              />

              <Box
                className="label"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 100%)",
                  padding: "2rem 1rem 1rem",
                  fontSize: "0.9rem",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  color: "white",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  fontFamily: "'Inconsolata', monospace",
                }}
              >
                {subCat.name}
              </Box>
            </Box>
          </motion.div>
        ))}
      </Box>
    </motion.div>
  );
}
