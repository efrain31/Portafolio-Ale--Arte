"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useEffect } from "react";
import SubMenu from "./SubMenu";

const FONT_MIN = 0.8;
const FONT_MAX = 2.0;
const FONT_STEP = 0.15;
const FONT_DEFAULT = 1.3;
const STORAGE_KEY = "nav-font-size";

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
  const [fontSize, setFontSize] = useState(FONT_DEFAULT);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setFontSize(parseFloat(saved));
  }, []);

  const adjust = (delta: number) => {
    setFontSize((prev) => {
      const next = Math.min(FONT_MAX, Math.max(FONT_MIN, parseFloat((prev + delta).toFixed(2))));
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  };

  const tooltipSx = {
    tooltip: {
      sx: {
        backgroundColor: "#111",
        color: "white",
        fontFamily: "'Inconsolata', monospace",
        fontSize: "0.75rem",
        letterSpacing: "0.05em",
        border: "1px solid #333",
        borderRadius: 0,
      },
    },
  };

  const sizeControls = (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
      <Tooltip
        title="Reducir tamaño del menú"
        placement="bottom"
        componentsProps={tooltipSx}
      >
        <span>
          <button
            onClick={() => adjust(-FONT_STEP)}
            disabled={fontSize <= FONT_MIN}
            style={{
              background: "none",
              border: "none",
              color: fontSize <= FONT_MIN ? "#444" : "white",
              fontFamily: "'Inconsolata', monospace",
              fontSize: "0.85rem",
              cursor: fontSize <= FONT_MIN ? "default" : "pointer",
              padding: "2px 6px",
              letterSpacing: "0.05em",
              lineHeight: 1,
            }}
          >
            A−
          </button>
        </span>
      </Tooltip>
      <Tooltip
        title="Aumentar tamaño del menú"
        placement="bottom"
        componentsProps={tooltipSx}
      >
        <span>
          <button
            onClick={() => adjust(FONT_STEP)}
            disabled={fontSize >= FONT_MAX}
            style={{
              background: "none",
              border: "none",
              color: fontSize >= FONT_MAX ? "#444" : "white",
              fontFamily: "'Inconsolata', monospace",
              fontSize: "1.1rem",
              cursor: fontSize >= FONT_MAX ? "default" : "pointer",
              padding: "2px 6px",
              letterSpacing: "0.05em",
              lineHeight: 1,
            }}
          >
            A+
          </button>
        </span>
      </Tooltip>
    </Box>
  );

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
              fontSize={fontSize}
            />
          ))}
          {sizeControls}
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
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: { width: 260, backgroundColor: "black", color: "white", p: 2 },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {routesData.map((route) => (
            <SubMenu
              key={route.label}
              label={route.label}
              items={route.items}
              basePath={route.basePath}
              fontSize={fontSize}
              onItemClick={() => setMobileOpen(false)}
            />
          ))}
          <Box sx={{ pt: 1, borderTop: "1px solid #222" }}>
            {sizeControls}
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  );
}
