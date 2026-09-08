"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import CategoryCard from "./CategoryCard";
import SubCategoryGrid from "./SubCategoryGrid";
import {
  modelImagesData,
  IlustrationImagesData,
  RestauracionesImagesData,
  jpgImagesData,
  foodImagesData,
  photoshootImagesData,
  studioImagesData,
  studio7ImagesData,
  solLunaImagesData,
  stillsImagesData,
  PublicidadImagesData,
} from "@/data/data";

type CategoryType = "modelaje" | "fotografia" | "diseño";

interface SubCategory {
  name: string;
  images: { src: string }[];
}

const subCategories: Record<CategoryType, SubCategory[]> = {
  modelaje: [
    {
      name: "Canta Drink",
      images: [
        { src: "/images/dataale/SOBREMI/SHOOTINGS/CANTADRINK/1.jpg" },
        { src: "/images/dataale/SOBREMI/SHOOTINGS/CANTADRINK/2.jpg" },
        { src: "/images/dataale/SOBREMI/SHOOTINGS/CANTADRINK/3.jpg" },
        { src: "/images/dataale/SOBREMI/SHOOTINGS/CANTADRINK/4.jpg" },
        { src: "/images/dataale/SOBREMI/SHOOTINGS/CANTADRINK/5.jpg" },
        { src: "/images/dataale/SOBREMI/SHOOTINGS/CANTADRINK/6.jpg" },
        { src: "/images/dataale/SOBREMI/SHOOTINGS/CANTADRINK/7.jpg" },
      ],
    },
    {
      name: "Maruatha",
      images: [
        { src: "/images/dataale/SOBREMI/SHOOTINGS/MARUATHA/1.jpg" },
        { src: "/images/dataale/SOBREMI/SHOOTINGS/MARUATHA/2.jpg" },
        { src: "/images/dataale/SOBREMI/SHOOTINGS/MARUATHA/3.jpg" },
        { src: "/images/dataale/SOBREMI/SHOOTINGS/MARUATHA/4.jpg" },
        { src: "/images/dataale/SOBREMI/SHOOTINGS/MARUATHA/5.jpg" },
        { src: "/images/dataale/SOBREMI/SHOOTINGS/MARUATHA/6.jpg" },
        { src: "/images/dataale/SOBREMI/SHOOTINGS/MARUATHA/7.jpg" },
      ],
    },
    {
      name: "Proyecto Catrina",
      images: [
        { src: "/images/dataale/SOBREMI/SHOOTINGS/PROYECTOCATRINA/1.jpg" },
        { src: "/images/dataale/SOBREMI/SHOOTINGS/PROYECTOCATRINA/2.jpg" },
        { src: "/images/dataale/SOBREMI/SHOOTINGS/PROYECTOCATRINA/3.jpg" },
        { src: "/images/dataale/SOBREMI/SHOOTINGS/PROYECTOCATRINA/4.jpg" },
        { src: "/images/dataale/SOBREMI/SHOOTINGS/PROYECTOCATRINA/5.jpg" },
        { src: "/images/dataale/SOBREMI/SHOOTINGS/PROYECTOCATRINA/7.jpg" },
        { src: "/images/dataale/SOBREMI/SHOOTINGS/PROYECTOCATRINA/8.jpg" },
        { src: "/images/dataale/SOBREMI/SHOOTINGS/PROYECTOCATRINA/9.jpg" },
        { src: "/images/dataale/SOBREMI/SHOOTINGS/PROYECTOCATRINA/10.jpg" },
        { src: "/images/dataale/SOBREMI/SHOOTINGS/PROYECTOCATRINA/11.jpg" },
      ],
    },
    {
      name: "Studio 7",
      images: studio7ImagesData,
    },
    {
      name: "Sol & Luna",
      images: solLunaImagesData,
    },
  ],
  fotografia: [
    { name: "Retratos", images: jpgImagesData },
    { name: "Food", images: foodImagesData },
    { name: "Photoshoot", images: photoshootImagesData },
    { name: "Studio", images: studioImagesData },
    { name: "Stills", images: stillsImagesData },
  ],
  diseño: [
    { name: "Ilustraciones", images: IlustrationImagesData },
    { name: "Restauraciones", images: RestauracionesImagesData },
    { name: "Publicidad", images: PublicidadImagesData },
  ],
};

export default function PortfolioShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const [initialSubCategoryName, setInitialSubCategoryName] = useState<string | null>(null);

  useEffect(() => {
    // Deep link (ej. desde el filmstrip de /galeria): /portafolio?category=modelaje&sub=Studio%207
    // abre directo esa categoría y, si aplica, su subcategoría.
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category") as CategoryType | null;
    if (category && subCategories[category]) {
      setSelectedCategory(category);
      setInitialSubCategoryName(params.get("sub"));
    }
  }, []);

  useEffect(() => {
    // Disparado por el ícono de home del header cuando ya estamos en
    // /portafolio (ese Link no navega porque es la misma ruta): vuelve
    // a la vista principal de categorías.
    const goIndex = () => setSelectedCategory(null);
    window.addEventListener("portfolio:go-index", goIndex);
    return () => window.removeEventListener("portfolio:go-index", goIndex);
  }, []);

  const categories = [
    {
      id: "modelaje",
      name: "Modelaje",
      image: "/images/dataale/SOBREMI/SHOOTINGS/CANTADRINK/1.jpg",
    },
    {
      id: "fotografia",
      name: "Fotografía",
      image: "/images/dataale/FOTOGRAFIAS/JPG/8.jpg",
    },
    {
      id: "diseño",
      name: "Diseño",
      image: "/images/dataale/TRABAJOS/ART/1.JPG",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#000000",
        color: "white",
        position: "relative",
      }}
    >

      {/* Hero */}
      <Box
        sx={{
          height: "55vh",
          backgroundImage: "url('/PORTADAINDEX.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "1.5rem",
          position: "relative",
          marginTop: "-60px",
          paddingTop: "80px",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.25)",
            zIndex: 1,
          },
        }}
      >
        <Box sx={{ position: "relative", zIndex: 2 }}>
          <Typography
            sx={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
              fontWeight: 300,
              marginBottom: "0.5rem",
            }}
          >
            Portafolio Profesional
          </Typography>
          <Typography
            sx={{
              fontSize: "0.9rem",
              color: "rgba(255, 255, 255, 0.6)",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontFamily: "'Inconsolata', monospace",
            }}
          >
            Modelo | Diseñadora Gráfica
          </Typography>
        </Box>
      </Box>

      {/* Contenido Principal */}
      <Box sx={{ flex: 1, maxWidth: 1400, margin: "0 auto", width: "100%", padding: "4rem 2rem" }}>
        <AnimatePresence mode="wait">
          {selectedCategory === null ? (
            // Vista de Categorías Principales
            <motion.div
              key="main-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                  gap: "2rem",
                  width: "100%",
                }}
              >
                {categories.map((category, index) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    onClick={() => setSelectedCategory(category.id as CategoryType)}
                    delay={index * 0.1}
                  />
                ))}
              </Box>
            </motion.div>
          ) : (
            // Vista de Subcategorías
            <motion.div
              key={`${selectedCategory}-view`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SubCategoryGrid
                category={selectedCategory}
                subCategories={subCategories[selectedCategory] || []}
                onBack={() => setSelectedCategory(null)}
                initialSubCategoryName={initialSubCategoryName}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
}
