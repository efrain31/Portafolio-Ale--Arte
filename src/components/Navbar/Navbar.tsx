"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import SubMenu from "./SubMenu";

const FONT_SIZE = 2;

const routesData = [
  {
    label: "FOTOGRAFÍA ┃ PHOTOGRAPH",
    basePath: "fotografia",
    items: ["FOOD", "JPG", "PHOTOSHOOT", "STILLS (BTS)", "STUDIO"],
  },
  {
    label: "TRABAJOS ┃ WORK",
    basePath: "work",
    items: ["RESTORATIONS", "ADS", "ART"],
  },
  {
    label: "SOBRE MI ┃ ABOUT ME",
    basePath: "info",
    items: ["ABOUT", "CONTACT", "MODEL"],
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "black",
        paddingY: 1,
        "@media (min-width: 900px)": {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1200,
          backgroundColor: "transparent",
          backdropFilter: "none",
          WebkitBackdropFilter: "none",
          boxShadow: "none",
        },
      }}
    >
      <Toolbar
        sx={{
          flexDirection: { xs: "row", md: "column" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: { xs: 0, md: 2 },
        }}
      >
        {/* Logo */}
        <Typography
          variant="h5"
          sx={{
            fontFamily: "'Inconsolata', monospace",
            color: "white",
            textAlign: "center",
            paddingY: 1,
          }}
        >
          <a href="/" style={{ color: "inherit", textDecoration: "none" }}>
            Ale Vazquez
          </a>
        </Typography>

        {/* Menú desktop */}
        <Box
          component="nav"
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 4,
          }}
        >
          {routesData.map((route) => (
            <SubMenu
              key={route.label}
              label={route.label}
              items={route.items}
              basePath={route.basePath}
              fontSize={FONT_SIZE}
            />
          ))}
        </Box>

        {/* Botón hamburguesa móvil */}
        <IconButton
          color="inherit"
          edge="end"
          onClick={() => setMobileOpen(!mobileOpen)}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Drawer móvil */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        slotProps={{
          paper: {
            sx: {
              width: 300,
              backgroundColor: "#0a0a0a",
              color: "white",
              borderRight: "1px solid #1a1a1a",
            },
          },
        }}
      >
        {/* Encabezado del drawer */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            py: 2,
            borderBottom: "1px solid #1a1a1a",
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Inconsolata', monospace",
              fontSize: "0.9rem",
              color: "white",
              letterSpacing: "0.2em",
            }}
          >
            <a href="/" style={{ color: "inherit", textDecoration: "none" }}>
              Ale Vazquez
            </a>
          </Typography>
          <IconButton
            onClick={() => setMobileOpen(false)}
            sx={{ color: "#666", p: 0.5, "&:hover": { color: "white" } }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Items del menú */}
        <Box sx={{ display: "flex", flexDirection: "column", pt: 1 }}>
          {routesData.map((route) => (
            <SubMenu
              key={route.label}
              label={route.label}
              items={route.items}
              basePath={route.basePath}
              fontSize={FONT_SIZE}
              onItemClick={() => setMobileOpen(false)}
              mobile
            />
          ))}
        </Box>
      </Drawer>
    </AppBar>
  );
}
