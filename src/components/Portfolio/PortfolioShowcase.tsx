"use client";

import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import CategoryCard from "./CategoryCard";
import SubCategoryGrid from "./SubCategoryGrid";
// import ParallaxSection from "./ParallaxSection"; // desactivado junto con los usos de abajo
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
  jerseryImagesData,
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
     {
      name: "Jersey & Frame",
      images: jerseryImagesData,
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

      {/* Hero — estático (sin parallax): pantalla completa, tipografía plana
          y muy espaciada, sin adornos ni scripts decorativos (referencia:
          hero de ysl.com). Sin sticky/z-index: un Hero "pegado" con
          z-index terminaba tapando (y capturando los clics de) todo lo
          que viene después, ya que su ventana de "stuck" cubre el resto
          del scroll — rompía la navegación de las categorías. */}
      <Box
        sx={{
          height: { xs: "100vh", md: "calc(100vh + 60px)" },
          backgroundImage: "url('/PORTADAINDEX.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          textAlign: "center",
          position: "relative",
          marginTop: { xs: 0, md: "-60px" },
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)",
            zIndex: 1,
          },
        }}
      >
        <Box sx={{ position: "relative", zIndex: 2, paddingBottom: "5rem" }}>
          <Typography
            sx={{
              fontFamily: "'Inconsolata', monospace",
              fontSize: "clamp(1.8rem, 6vw, 3.2rem)",
              fontWeight: 700,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              marginBottom: "0.9rem",
            }}
          >
            Portafolio
          </Typography>
          <Typography
            sx={{
              fontSize: "0.75rem",
              color: "rgba(255, 255, 255, 0.65)",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontFamily: "'Inconsolata', monospace",
            }}
          >
           Artista Visual | Diseñadora Gráfica | Modelo | Fotógrafa
          </Typography>
        </Box>
      </Box>

      {/* Contenido Principal — grids a sangre (sin margen ni gap entre
          piezas), como las categorías de ysl.com. */}
      <Box sx={{ flex: 1, width: "100%" }}>
        {selectedCategory === null ? (
            // Vista de Categorías Principales — scroll normal, sin
            // sticky/z-index encimados: esa combinación (varias secciones
            // "pegadas" compitiendo por z-index) hacía que capas
            // decorativas taparan la grilla y le robaran los clics. El
            // efecto de parallax (drift de la imagen al hacer scroll) se
            // mantiene vía useParallax, solo se quita el "pin + cubre".
            <Box>
              {/* <ParallaxSection
                image="/images/dataale/SOBREMI/SHOOTINGS/SOLUNA/Estrella-4.jpg"
                label="Proyecto Catrina"
              /> */}

              {/* Grilla de categorías — contenido normal (no sticky), así
                  siempre queda arriba y siempre recibe el click. */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                  width: "100%",
                  backgroundColor: "#000000",
                  paddingTop: { xs: "6rem", md: "12rem" },
                  paddingBottom: { xs: "10rem", md: "18rem" },
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

              {/* <ParallaxSection
                image="/images/dataale/SOBREMI/SHOOTINGS/MARUATHA/7.JPG"
                label="Studio"
              /> */}

              {/* <ParallaxSection
                image="/images/dataale/SOBREMI/SHOOTINGS/CANTADRINK/4.jpg"
                label="Sol & Luna"
              /> */}
            </Box>
          ) : (
            // Vista de Subcategorías
            <SubCategoryGrid
              category={selectedCategory}
              subCategories={subCategories[selectedCategory] || []}
              onBack={() => setSelectedCategory(null)}
              initialSubCategoryName={initialSubCategoryName}
            />
          )}
      </Box>
    </Box>
  );
}
