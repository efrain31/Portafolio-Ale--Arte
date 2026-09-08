"use client";

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navRoutes, normalizeSlug } from "@/data/navRoutes";

// Botón hamburguesa (se convierte en cruz al abrir) + panel de navegación
// para mobile, donde el dropdown de NavLinks está oculto (display:none).
// Ocupa el mismo lugar que el ícono de casa en el header.
export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isPortfolioIndex = pathname === "/portafolio";

  const close = () => setOpen(false);

  const handleHomeClick = (event: React.MouseEvent) => {
    close();
    if (!isPortfolioIndex) return; // ruta distinta: el Link navega normal

    // Ya estamos en /portafolio (misma lógica que el ícono de casa en
    // desktop): resetea la vista en vez de navegar a la misma ruta.
    event.preventDefault();
    window.dispatchEvent(new Event("portfolio:go-index"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Botón hamburguesa / cruz */}
      <Box
        onClick={() => setOpen((o) => !o)}
        role="button"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        sx={{
          display: { xs: "flex", md: "none" },
          flexDirection: "column",
          justifyContent: "center",
          gap: "6px",
          width: 32,
          height: 32,
          cursor: "pointer",
          position: "relative",
          zIndex: 210,
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "2px",
            backgroundColor: "white",
            transition: "transform 0.3s ease",
            transform: open ? "translateY(8px) rotate(45deg)" : "none",
          }}
        />
        <Box
          sx={{
            width: "100%",
            height: "2px",
            backgroundColor: "white",
            transition: "opacity 0.2s ease",
            opacity: open ? 0 : 1,
          }}
        />
        <Box
          sx={{
            width: "100%",
            height: "2px",
            backgroundColor: "white",
            transition: "transform 0.3s ease",
            transform: open ? "translateY(-8px) rotate(-45deg)" : "none",
          }}
        />
      </Box>

      {/* Panel de navegación a pantalla completa */}
      {open && (
        <Box
          sx={{
            display: { xs: "block", md: "none" },
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.97)",
            zIndex: 150,
            padding: "6.5rem 2rem 2rem",
            overflowY: "auto",
          }}
        >
          <Link href="/portafolio" onClick={handleHomeClick} style={{ textDecoration: "none" }}>
            <Typography
              sx={{
                fontFamily: "'Inconsolata', monospace",
                fontSize: "1rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "white",
                marginBottom: "2.5rem",
              }}
            >
              Home
            </Typography>
          </Link>

          <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {navRoutes.map((route) => (
              <Box key={route.basePath}>
                <Typography
                  sx={{
                    fontFamily: "'Inconsolata', monospace",
                    fontSize: "1rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "rgba(255, 255, 255, 0.9)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {route.label}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "0.6rem", paddingLeft: "1rem" }}>
                  {route.items.map((item) => (
                    <Link
                      key={item}
                      href={`/${route.basePath}/${normalizeSlug(item)}`}
                      onClick={close}
                      style={{ textDecoration: "none" }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "'Inconsolata', monospace",
                          fontSize: "0.85rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "rgba(255, 255, 255, 0.6)",
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
      )}
    </>
  );
}
