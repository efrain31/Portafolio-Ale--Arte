"use client";

import { Box, Typography, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function GlobalHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        padding: "1rem 2rem",
        zIndex: 100,
        background: "transparent",
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

        {!isHome && (
          <Link href="/portafolio" style={{ textDecoration: "none" }}>
            <IconButton
              sx={{
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
      </Box>
    </Box>
  );
}
