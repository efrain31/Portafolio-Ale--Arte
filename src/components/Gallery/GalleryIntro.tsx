"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import Image from "next/image";
import Link from "next/link";
import { navRoutes, normalizeSlug } from "@/data/navRoutes";
import PortfolioCover from "./PortfolioCover";

const SIDEBAR_WIDTH = 300;
const ITEM_WIDTH = 420; // ancho fijo (desktop) de cada imagen del filmstrip
const DESKTOP_BREAKPOINT = 900; // debe coincidir con el "md" de MUI

// Selección curada de piezas de SOBREMI/SHOOTINGS para la fila de imágenes
// al estilo "filmstrip" horizontal, alternando entre las 5 series para que
// no se repita carpeta en dos imágenes seguidas.
const featured = [
   { src: "/images/dataale/SOBREMI/SHOOTINGS/STUDIO7/STUDIO5.jpg", label: "Studio 7" },
  { src: "/images/dataale/SOBREMI/SHOOTINGS/SOLUNA/Estrella-16.jpg", label: "Sol & Luna" },
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
];

// Indicador de scroll: "DESLIZA" + línea con una luz que baja.
function ScrollHint({ visible, sx }: { visible: boolean; sx: object }) {
  return (
    <AnimatePresence>
      {visible && (
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          aria-hidden
          sx={{
            position: "absolute",
            zIndex: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.8rem",
            pointerEvents: "none",
            ...sx,
          }}
        >
          <Box
            sx={{
              fontFamily: "'Inconsolata', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.4em",
              color: "white",
              textShadow: "0 1px 8px rgba(0,0,0,0.8)",
            }}
          >
            DESLIZA
          </Box>
          <Box sx={{ position: "relative", width: "1px", height: 56, background: "rgba(255,255,255,0.3)", overflow: "hidden" }}>
            <motion.div
              animate={{ y: ["-100%", "260%"] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
              style={{ position: "absolute", left: 0, width: 1, height: 20, background: "white" }}
            />
          </Box>
        </Box>
      )}
    </AnimatePresence>
  );
}

export default function GalleryIntro() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxTranslate, setMaxTranslate] = useState(0);
  // El menú lateral aparece hasta que se termina de recorrer la tira de
  // fotos; mientras tanto se muestra el indicador de scroll.
  const [reachedEnd, setReachedEnd] = useState(false);
  const [measured, setMeasured] = useState(false);

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
      setMeasured(true);
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
        // Si la tira cabe completa en pantalla no hay nada que recorrer
        if (measured && maxTranslate <= 0) setReachedEnd(true);
        return;
      }
      const rect = section.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / maxTranslate, 0), 1);
      trackRef.current.style.transform = `translateX(-${progress * maxTranslate}px)`;
      // Una vez que llega al final, el menú se queda visible
      if (progress >= 0.98) setReachedEnd(true);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [maxTranslate, measured]);

  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, minHeight: "100vh", backgroundColor: "#000000" }}>
      {/* Portada de presentación (sólo móvil) antes del filmstrip */}
      <PortfolioCover />

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
          // En mobile el sidebar va en el flujo normal (no fijo), así que
          // el orden visual lo controla "order": las imágenes primero,
          // el menú después. En desktop el sidebar es fijo y el order no
          // aplica (queda a la izquierda por su position).
          order: { xs: 2, md: 0 },
          // Menú oculto hasta terminar la tira de fotos; entra con un leve
          // desplazamiento (el bloque de abajo con un pequeño retraso).
          "& > .sidebar-block": {
            opacity: reachedEnd ? 1 : 0,
            transform: reachedEnd ? "none" : "translateY(18px)",
            visibility: reachedEnd ? "visible" : "hidden",
            transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(0.22,1,0.36,1), visibility 0.8s",
          },
          "& > .sidebar-block:last-of-type": { transitionDelay: reachedEnd ? "0.25s" : "0s" },
        }}
      >
        {/* Indicador de scroll en el lugar del menú (escritorio) */}
        <ScrollHint
          visible={!reachedEnd}
          sx={{ display: { xs: "none", md: "flex" }, inset: 0 }}
        />

        <Box className="sidebar-block">
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

        <Box className="sidebar-block">
          <Typography
            sx={{
              fontFamily: "'Inconsolata', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.05em",
              color: "rgba(255, 255, 255, 0.4)",
              marginBottom: "1rem",
            }}
          >
            © {new Date().getFullYear()} Ale Vázquez. Todos los derechos reservados X LAPLACE COMPANY.
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
          order: { xs: 1, md: 0 },
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
          {/* Indicador de scroll sobre las fotos (móvil y tablet) */}
          <ScrollHint
            visible={!reachedEnd}
            sx={{
              display: { xs: "flex", md: "none" },
              left: 0,
              right: 0,
              bottom: "6rem",
              width: "fit-content",
              margin: "0 auto",
              padding: "0.9rem 1.1rem 0.8rem",
              borderRadius: "14px",
              background: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          />

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
