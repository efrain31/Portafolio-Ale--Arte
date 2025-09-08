"use client";

import { Box, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";


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
            fontWeight: 500,
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
            <InstagramIcon sx={{ fontSize: 50 }} />
          </a>

          {/* Gmail */}
          <a href="mailto:tuemail@gmail.com" style={{ color: "white" }}>
            <EmailIcon sx={{ fontSize: 50 }} />
          </a>
        </Box>
      </Box>
    </Box>
  );
}
