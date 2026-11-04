"use client";

import { Box, Typography, IconButton, Link as MuiLink } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  // En el splash (home) sólo se muestra el fondo del footer, sin contenido
  const isSplash = pathname === "/";

  // En /galeria no se usa el footer global: la galería ya trae su propio
  // menú con copyright y redes. Para volver a mostrarlo, comenta esta línea.
  if (pathname === "/galeria") return null;

  const footerLink = {
    color: "rgba(255, 255, 255, 0.7)",
    textDecoration: "none",
    transition: "all 0.3s ease",
    fontFamily: "'Inconsolata', monospace",
    fontSize: "0.85rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    "&:hover": {
      color: "white",
      textDecoration: "underline",
      textUnderlineOffset: "4px",
    },
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#000000",
        color: "white",
        py: isSplash ? 3 : { xs: 6, md: 10 },
        px: 3,
        mt: isSplash ? 0 : 8,
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
          display: isSplash ? "none" : "block",
        },
      }}
    >
      {/* En el splash sólo queda una franja corta de fondo, sin contenido */}
      {!isSplash && (
      <>
      {/* Contenedor principal con grid */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" },
          gap: { xs: 4, md: 6 },
          mb: 6,
        }}
      >
        {/* Sección 1: Sobre */}
        <Box>
          <Typography
            sx={{
              fontFamily: "'Inconsolata', monospace",
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
              color: "white",
            }}
          >
            Sobre MI
          </Typography>
          <Typography
            sx={{
              fontSize: "0.9rem",
              lineHeight: 1.8,
              color: "rgba(255, 255, 255, 0.6)",
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            Artista Visual | Diseñadora Gráfica | Modelo | Fotógrafa
          </Typography>
        </Box>

        {/* Sección 2: Categorías */}
        <Box>
          <Typography
            sx={{
              fontFamily: "'Inconsolata', monospace",
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
              color: "white",
            }}
          >
            Categorías
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <MuiLink href="/portafolio?category=portafolio" sx={footerLink}>
              HOME
            </MuiLink>
            <MuiLink href="/portafolio?category=modelaje" sx={footerLink}>
              Modelaje
            </MuiLink>
            <MuiLink href="/portafolio?category=fotografia" sx={footerLink}>
              Fotografía
            </MuiLink>
            <MuiLink href="/portafolio?category=diseño" sx={footerLink}>
              Diseño
            </MuiLink>
          </Box>
        </Box>

        {/* Sección 3: Social */}
        <Box>
          <Typography
            sx={{
              fontFamily: "'Inconsolata', monospace",
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
              color: "white",
            }}
          >
            Social & Media
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <IconButton
                size="small"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "white",
                    transform: "scale(1.15)",
                  },
                }}
              >
                <InstagramIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=alejandra@prueba.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <IconButton
                size="small"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "white",
                    transform: "scale(1.15)",
                  },
                }}
              >
                <EmailIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </a>
          </Box>
        </Box>

        {/* Sección 4: Copyright */}
        <Box>
          <Typography
            sx={{
              fontFamily: "'Inconsolata', monospace",
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
              color: "white",
            }}
          >
            Legal
          </Typography>
          <Typography
            sx={{
              fontSize: "0.85rem",
              color: "rgba(255, 255, 255, 0.6)",
              lineHeight: 1.8,
            }}
          >
            © 2025 Ale Vázquez
            <br />
            Todos los derechos reservados
          </Typography>
        </Box>
      </Box>

      {/* Línea divisora */}
      <Box
        sx={{
          height: "1px",
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
          mb: 3,
        }}
      />

      {/* Bottom credits */}
      <Box
        sx={{
          textAlign: "center",
          fontSize: "0.75rem",
          color: "rgba(255, 255, 255, 0.4)",
          letterSpacing: "0.1em",
          fontFamily: "'Inconsolata', monospace",
        }}
      >
        X LAPLACE COMPANY
      </Box>
      </>
      )}
    </Box>
  );
}

