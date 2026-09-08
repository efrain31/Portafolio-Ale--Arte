"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import Image from "next/image";
import Link from "next/link";
import { navRoutes, normalizeSlug } from "@/data/navRoutes";

const SIDEBAR_WIDTH = 300;
const ITEM_WIDTH = 420; // ancho fijo (desktop) de cada imagen del filmstrip
const DESKTOP_BREAKPOINT = 900; // debe coincidir con el "md" de MUI

// Selección curada de piezas de SOBREMI/SHOOTINGS para la fila de imágenes
// al estilo "filmstrip" horizontal, alternando entre las 5 series para que
// no se repita carpeta en dos imágenes seguidas.
const featured = [
  { src: "/images/dataale/SOBREMI/SHOOTINGS/CANTADRINK/1.jpg", label: "Canta Drink" },
  { src: "/images/dataale/SOBREMI/SHOOTINGS/MARUATHA/1.jpg", label: "Maruatha" },
  { src: "/images/dataale/SOBREMI/SHOOTINGS/PROYECTOCATRINA/1.jpg", label: "Proyecto Catrina" },
  { src: "/images/dataale/SOBREMI/SHOOTINGS/STUDIO7/STUDIO1.jpg", label: "Studio 7" },
  { src: "/images/dataale/SOBREMI/SHOOTINGS/SOLUNA/Estrella-1.jpg", label: "Sol & Luna" },
  { src: "/images/dataale/SOBREMI/SHOOTINGS/CANTADRINK/3.jpg", label: "Canta Drink" },
  { src: "/images/dataale/SOBREMI/SHOOTINGS/MARUATHA/3.jpg", label: "Maruatha" },
  { src: "/images/dataale/SOBREMI/SHOOTINGS/PROYECTOCATRINA/4.jpg", label: "Proyecto Catrina" },
  { src: "/images/dataale/SOBREMI/SHOOTINGS/STUDIO7/STUDIO3.JPG", label: "Studio 7" },
  { src: "/images/dataale/SOBREMI/SHOOTINGS/SOLUNA/Estrella-3.jpg", label: "Sol & Luna" },
  { src: "/images/dataale/SOBREMI/SHOOTINGS/CANTADRINK/5.jpg", label: "Canta Drink" },
  { src: "/images/dataale/SOBREMI/SHOOTINGS/MARUATHA/5.jpg", label: "Maruatha" },
  { src: "/images/dataale/SOBREMI/SHOOTINGS/PROYECTOCATRINA/8.jpg", label: "Proyecto Catrina" },
  { src: "/images/dataale/SOBREMI/SHOOTINGS/STUDIO7/STUDIO5.jpg", label: "Studio 7" },
  { src: "/images/dataale/SOBREMI/SHOOTINGS/SOLUNA/Estrella-16.jpg", label: "Sol & Luna" },
];

export default function GalleryIntro() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxTranslate, setMaxTranslate] = useState(0);

  // Calcula cuánto hay que desplazar horizontalmente el filmstrip para
  // que la última imagen llegue al borde derecho del viewport. En desktop
  // el sidebar es fijo (se descuenta su ancho); en mobile el sidebar va en
  // el flujo normal arriba, así que cada imagen ocupa el ancho completo de
  // pantalla (como un carrusel de una imagen a la vez).
  useEffect(() => {
    const computeMax = () => {
      const isDesktop = window.innerWidth >= DESKTOP_BREAKPOINT;
      const itemWidth = isDesktop ? ITEM_WIDTH : window.innerWidth;
      const trackWidth = featured.length * itemWidth;
      const viewportWidth = isDesktop ? window.innerWidth - SIDEBAR_WIDTH : window.innerWidth;
      setMaxTranslate(Math.max(trackWidth - viewportWidth, 0));
    };
    computeMax();
    window.addEventListener("resize", computeMax);
    return () => window.removeEventListener("resize", computeMax);
  }, []);

  // Traduce el progreso de scroll vertical dentro de la sección en un
  // translateX del track (efecto "sticky pin + horizontal scroll").
  useEffect(() => {
    const section = document.getElementById("gallery-scroll-section");
    if (!section) return;

    const handleScroll = () => {
      if (maxTranslate <= 0 || !trackRef.current) {
        if (trackRef.current) trackRef.current.style.transform = "none";
        return;
      }
      const rect = section.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / maxTranslate, 0), 1);
      trackRef.current.style.transform = `translateX(-${progress * maxTranslate}px)`;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [maxTranslate]);

  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, minHeight: "100vh", backgroundColor: "#000000" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: SIDEBAR_WIDTH,
          flexShrink: 0,
          position: { xs: "static", md: "fixed" },
          top: 0,
          left: 0,
          height: { xs: "auto", md: "100vh" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "3rem 2.5rem",
          zIndex: 10,
        }}
      >
        <Box>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.4rem",
                fontWeight: 600,
                color: "white",
                letterSpacing: "2px",
                marginBottom: "3rem",
                cursor: "pointer",
                transition: "opacity 0.3s",
                "&:hover": { opacity: 0.8 },
              }}
            >
              ALE VÁZQUEZ
            </Typography>
          </Link>

          <Box sx={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            <Link href="/portafolio" style={{ textDecoration: "none" }}>
              <Typography
                sx={{
                  fontFamily: "'Inconsolata', monospace",
                  fontSize: "0.85rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(255, 255, 255, 0.9)",
                  transition: "color 0.2s",
                  "&:hover": { color: "white" },
                }}
              >
                Home
              </Typography>
            </Link>

            {navRoutes.map((route) => (
              <Box key={route.basePath}>
                <Typography
                  sx={{
                    fontFamily: "'Inconsolata', monospace",
                    fontSize: "0.85rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "rgba(255, 255, 255, 0.9)",
                    marginBottom: "0.6rem",
                  }}
                >
                  {route.label}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "0.4rem", paddingLeft: "0.75rem" }}>
                  {route.items.map((item) => (
                    <Link
                      key={item}
                      href={`/${route.basePath}/${normalizeSlug(item)}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "'Inconsolata', monospace",
                          fontSize: "0.7rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "rgba(255, 255, 255, 0.55)",
                          transition: "color 0.2s, padding-left 0.2s",
                          "&:hover": { color: "white", paddingLeft: "0.3rem" },
                        }}
                      >
                        {item}
                      </Typography>
                    </Link>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Box>
          <Typography
            sx={{
              fontFamily: "'Inconsolata', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.05em",
              color: "rgba(255, 255, 255, 0.4)",
              marginBottom: "1rem",
            }}
          >
            © {new Date().getFullYear()} Ale Vázquez. Todos los derechos reservados.
          </Typography>
          <Box sx={{ display: "flex", gap: "1.2rem" }}>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              <InstagramIcon sx={{ fontSize: 20, "&:hover": { color: "white" } }} />
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=alejandra@prueba.com&su=Interés%20en%20tus%20servicios%20de%20diseño%20y%20audiovisuales"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              <EmailIcon sx={{ fontSize: 20 }} />
            </a>
          </Box>
        </Box>
      </Box>

      {/* Sección de scroll: su altura extra (100vh + maxTranslate) es lo
          que le da al usuario "espacio" para desplazar el filmstrip. */}
      <Box
        id="gallery-scroll-section"
        sx={{
          marginLeft: { xs: 0, md: `${SIDEBAR_WIDTH}px` },
          width: "100%",
          height: maxTranslate > 0 ? `calc(100vh + ${maxTranslate}px)` : "100vh",
          position: "relative",
        }}
      >
        {/* Mientras la sección pasa por el viewport, este contenedor queda
            fijo ("sticky") y solo el track interno se traslada en X. */}
        <Box
          sx={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <Box
            ref={trackRef}
            sx={{
              display: "flex",
              flexDirection: "row",
              height: "100%",
              width: "max-content",
              willChange: "transform",
            }}
          >
            {featured.map((item) => (
              <Link
                key={item.src}
                href={`/portafolio?category=modelaje&sub=${encodeURIComponent(item.label)}`}
                style={{
                  position: "relative",
                  display: "block",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: { xs: "100vw", md: `${ITEM_WIDTH}px` },
                    height: "100%",
                  }}
                >
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    sizes={`(max-width: ${DESKTOP_BREAKPOINT}px) 100vw, ${ITEM_WIDTH}px`}
                    style={{ objectFit: "cover" }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      left: "1rem",
                      bottom: "1rem",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: "italic",
                      fontSize: "0.95rem",
                      color: "white",
                      textShadow: "0 1px 6px rgba(0,0,0,0.8)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.label}
                  </Box>
                </Box>
              </Link>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
