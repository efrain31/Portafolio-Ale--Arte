"use client";

import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function AboutMeHero() {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "black",
        color: "white",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      {/* Contenedor principal */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          maxWidth: 1000,
          width: "100%",
        }}
      >
        {/* Imagen */}
        <Box
          sx={{
            flex: { xs: "none", md: 1 },
            width: { xs: "80%", md: "45%" },
            opacity: 0,
            transform: "translateX(-50px)",
            transition: "all 1s ease-in-out",
            "& img": { borderRadius: 0 },
            mb: { xs: 2, md: 0 },
          }}
          className="image-box"
        >
          <Image
            src="/images/aleabout.jpg"
            alt="About Me"
            width={400}
            height={400}
            style={{ width: "100%", height: "auto" }}
            onLoad={(e) => {
              (e.currentTarget.parentElement as HTMLElement).style.opacity = "1";
              (e.currentTarget.parentElement as HTMLElement).style.transform = "translateX(0)";
            }}
          />
        </Box>

        {/* Línea vertical */}
        <Box
          sx={{
            width: { xs: "80%", md: "2px" },
            height: { xs: "2px", md: "auto" },
            backgroundColor: "white",
            mx: { xs: 0, md: 3 },
            my: { xs: 2, md: 0 },
          }}
        />

        {/* Texto */}
        <Box
          sx={{
            flex: { xs: "none", md: 1 },
            width: { xs: "80%", md: "45%" },
            opacity: showText ? 1 : 0,
            transform: showText ? "translateY(0)" : "translateY(50px)",
            transition: "all 1s ease-in-out",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography
            variant="h3"
            sx={{ fontFamily: "'Inconsolata', monospace", mb: 1 }}
          >
            ALE VÁZQUEZ
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ fontFamily: "'Inconsolata', monospace", mb: 2, fontWeight: 500 }}
          >
            VISUAL ARTIST / ARTISTA VISUAL
          </Typography>

          {/* Texto en inglés */}
          <Typography sx={{ mb: 2, lineHeight: 1.6 }}>
            Art is a product of spirituality. Through it, we connect with others and with ourselves.
          </Typography>
          <Typography sx={{ mb: 1 }}>
            The two main differentiators in my artistic products are:
          </Typography>
          <Typography sx={{ mb: 1 }}>• Capturing and conveying emotions.</Typography>
          <Typography sx={{ mb: 2 }}>• Attention to detail.</Typography>

          {/* Texto en español */}
          <Typography sx={{ mb: 2, lineHeight: 1.6 }}>
            El arte es producto de la espiritualidad. A través de él, es como nos conectamos con las demás personas y con nosotros mismos.
          </Typography>
          <Typography sx={{ mb: 1 }}>
            Los dos principales diferenciadores en mis productos artísticos son:
          </Typography>
          <Typography sx={{ mb: 1 }}>• Capturar y transmitir emociones.</Typography>
          <Typography sx={{ mb: 0 }}>• La observación por el detalle.</Typography>
        </Box>
      </Box>

      {/* Línea horizontal debajo */}
      <Box
        sx={{
          width: "80%",
          height: "2px",
          backgroundColor: "white",
          mt: 4,
        }}
      />
    </Box>
  );
}
