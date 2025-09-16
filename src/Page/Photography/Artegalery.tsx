"use client";

import { Box, Typography } from "@mui/material";
import ImageGrid from "@/components/galerias/ImagenGrid";
import { artImagesData } from "@/data/data";
import { useState } from "react";

export default function PhotographyGallery() {
  // Estado para detectar orientación de la imagen seleccionada
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("landscape");

  // Función que recibe la imagen al abrir el modal
  const handleImageOpen = (img: { src: string; title: string }) => {
    const image = new Image();
    image.src = img.src;
    image.onload = () => {
      if (image.width > image.height) {
        setOrientation("landscape");
      } else {
        setOrientation("portrait");
      }
    };
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "black",
        color: "white",
      }}
    >
      <Box sx={{ flex: 1, maxWidth: 1200, margin: "0 auto", padding: 2 }}>
        <Typography
          sx={{
            fontFamily: "'Inconsolata', monospace",
            fontWeight: 500,
            fontSize: "1.2rem",
            marginBottom: 2,
            color: "white",
          }}
        >
          ART GALLERY
        </Typography>
        <ImageGrid images={artImagesData} />
      </Box>
    </Box>
  );
}
