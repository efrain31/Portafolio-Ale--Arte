"use client";

import { useEffect, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavLinks from "./NavLinks";
import MobileNav from "./MobileNav";

export default function GlobalHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isPortfolioIndex = pathname === "/portafolio";
  // /galeria trae su propio sidebar con logo y nav (al estilo de la
  // referencia): el GlobalHeader se oculta por completo ahí para no
  // duplicar la marca/navegación (se retorna null más abajo, después de
  // los hooks, para no romper las Rules of Hooks).
  const hideEntirely = pathname === "/galeria";

  const handleHomeClick = (event: React.MouseEvent) => {
    if (!isPortfolioIndex) return; // ruta distinta: el Link navega normal

    // Ya estamos en /portafolio: el Link no navegaría (misma ruta), así
    // que en vez de eso avisamos a PortfolioShowcase que resetee su
    // estado interno (categoría/subcategoría seleccionada) y volvemos
    // al inicio del scroll para ver el índice de categorías.
    event.preventDefault();
    window.dispatchEvent(new Event("portfolio:go-index"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  useEffect(() => {
    setScrolledPastHero(false);

    const threshold = () => {
      const doc = document.documentElement;
      const maxScroll = Math.max(doc.scrollHeight - window.innerHeight, 0);
      // Páginas largas: exige pasar ~60% del alto de viewport (el hero típico).
      // Páginas cortas, donde ese punto es inalcanzable: exige la mitad del
      // recorrido real disponible, para que siga siendo alcanzable.
      return Math.min(window.innerHeight * 0.6, maxScroll * 0.5);
    };

    const handleScroll = () => {
      setScrolledPastHero(window.scrollY > threshold());
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const showNav = !isHome && scrolledPastHero;

  if (hideEntirely) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        padding: "1rem 2rem",
        zIndex: 100,
        background: showNav ? "rgba(0, 0, 0, 0.75)" : "transparent",
        backdropFilter: showNav ? "blur(6px)" : "none",
        transition: "background 0.4s ease, backdrop-filter 0.4s ease",
      }}
    >
      <Box
        sx={{
          maxWidth: 1400,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.2rem",
                fontWeight: 600,
                color: "white",
                letterSpacing: "2px",
                cursor: "pointer",
                transition: "opacity 0.3s",
                "&:hover": {
                  opacity: 0.8,
                },
              }}
            >
              ALE VÁZQUEZ
            </Typography>
          </Link>

          <Box
            sx={{
              opacity: showNav ? 1 : 0,
              transform: showNav ? "translateY(0)" : "translateY(-6px)",
              pointerEvents: showNav ? "auto" : "none",
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
          >
            <NavLinks />
          </Box>
        </Box>

        {!isHome && (
          <Link
            href="/portafolio"
            onClick={handleHomeClick}
            style={{ textDecoration: "none", display: "flex" }}
          >
            <IconButton
              sx={{
                display: { xs: "none", md: "inline-flex" },
                color: "white",
                transition: "all 0.3s",
                "&:hover": {
                  opacity: 0.7,
                },
              }}
            >
              <HomeIcon sx={{ fontSize: 28 }} />
            </IconButton>
          </Link>
        )}

        {/* En mobile, el ícono de casa se reemplaza por la hamburguesa
            (gira a cruz al abrir) con el mismo nav que NavLinks. */}
        {!isHome && <MobileNav />}
      </Box>
    </Box>
  );
}
