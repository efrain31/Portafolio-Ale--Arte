"use client";

import { Box, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
import Link from "next/link";


export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "black",
        color: "white",
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        mt: 6,
      }}
    >
      {/* Contenedor principal */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            fontSize: "1.5rem",
            fontWeight: 300,
          }}
        >
          © 2025 Ale Vazquez
        </Typography>

        {/* Iconos con links */}
        <Box sx={{ display: "flex", gap: 3, justifyContent: "center", mt: 3 }}>
          {/* Instagram */}
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "white" }}
          >
            <InstagramIcon sx={{ fontSize: 30 }} />
          </a>

          {/* Gmail */}
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=alejandra@prueba.com&su=Interés%20en%20tus%20servicios%20de%20diseño%20y%20audiovisuales&body=Hola%20Alejandra,%0D%0A%0D%0AMe%20gustaría%20ponerme%20en%20contacto%20contigo%20para%20conocer%20más%20sobre%20tu%20trabajo%20como%20artista%20gráfica%20de%20audiovisuales.%0D%0A%0D%0AGracias!"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "white" }}
          >
            <EmailIcon sx={{ fontSize: 30 }} />
          </a>

        </Box>
      </Box>
    </Box>
  );
}

