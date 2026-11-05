"use client";

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import ImageGrid from "@/components/galerias/ImagenGrid";
import { ImageData } from "@/data/data";
import { useParallax } from "./useParallax";
import SubCategoryColumns from "./SubCategoryColumns";

interface SubCategoryGridProps {
  category: string;
  subCategories: Array<{
    name: string;
    images: ImageData[];
  }>;
  onBack: () => void;
  initialSubCategoryName?: string | null;
}

// Enlace de retorno minimal, sin caja ni flecha decorativa — solo texto
// espaciado que se subraya al pasar el cursor (referencia: breadcrumbs de
// ysl.com).
function BackLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "inline-block",
        cursor: "pointer",
        padding: "1.5rem 1.5rem 0",
        color: "rgba(255, 255, 255, 0.6)",
        fontFamily: "'Inconsolata', monospace",
        fontSize: "0.7rem",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        transition: "color 0.2s",
        "&:hover": {
          color: "white",
          textDecoration: "underline",
          textUnderlineOffset: "4px",
        },
      }}
    >
      {label}
    </Box>
  );
}

// Tarjeta de subcategoría con la misma capa de parallax + zoom al hover que
// las tarjetas principales (CategoryCard).
function SubCategoryTile({
  name,
  image,
  delay,
  onClick,
}: {
  name: string;
  image?: string;
  delay: number;
  onClick: () => void;
}) {
  const { ref, offset } = useParallax(35);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay }}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <Box
        ref={ref}
        sx={{
          position: "relative",
          height: { xs: 340, md: 440 },
          overflow: "hidden",
          background: "#000000",
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
          <img
            src={image}
            alt={name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.6s ease",
              display: "block",
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.2rem 1rem",
          fontFamily: "'Inconsolata', monospace",
          fontSize: "0.8rem",
          fontWeight: 500,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "white",
        }}
      >
        {name}
      </Box>
    </motion.div>
  );
}

export default function SubCategoryGrid({
  category,
  subCategories,
  onBack,
  initialSubCategoryName,
}: SubCategoryGridProps) {
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(() => {
    if (!initialSubCategoryName) return null;
    const index = subCategories.findIndex((s) => s.name === initialSubCategoryName);
    return index >= 0 ? index : null;
  });

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
        <BackLink label={`← Volver a ${categoryLabel}`} onClick={() => setSelectedSubCategory(null)} />

        <Typography
          sx={{
            fontFamily: "'Inconsolata', monospace",
            fontSize: "1.4rem",
            fontWeight: 700,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "white",
            textAlign: "center",
            padding: "2.5rem 1.5rem",
          }}
        >
          {subCategories[selectedSubCategory].name}
        </Typography>

        <Box sx={{ padding: "0 1.5rem 3rem" }}>
          <ImageGrid images={subCategories[selectedSubCategory].images} />
        </Box>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <BackLink label="← Volver a Categorías" onClick={onBack} />

      <Typography
        sx={{
          fontFamily: "'Inconsolata', monospace",
          fontSize: "1.4rem",
          fontWeight: 700,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "white",
          textAlign: "center",
          padding: "2.5rem 1.5rem",
        }}
      >
        {categoryLabel}
      </Typography>

      {/* Subcategorías en columnas (aplica a Modelaje, Fotografía y Diseño):
          hover asoma la foto, clic la expande, "Ver serie" abre la galería. */}
      <SubCategoryColumns
        items={subCategories}
        categoryLabel={categoryLabel}
        onOpen={(index) => {
          setSelectedSubCategory(index);
          window.scrollTo({ top: 0 });
          document.getElementById("portfolio-content")?.scrollIntoView();
        }}
      />

      {/* Grid anterior de subcategorías (tarjetas), reemplazado por las columnas:
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
          width: "100%",
        }}
      >
        {subCategories.map((subCat, index) => (
          <SubCategoryTile
            key={subCat.name}
            name={subCat.name}
            image={subCat.images[0]?.src}
            delay={index * 0.06}
            onClick={() => setSelectedSubCategory(index)}
          />
        ))}
      </Box>
      */}
    </motion.div>
  );
}
