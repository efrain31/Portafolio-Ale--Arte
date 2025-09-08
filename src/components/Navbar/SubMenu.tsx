"use client";

import { useState, useEffect } from "react";
import { Menu, MenuItem, Typography, Box } from "@mui/material";
import Link from "next/link";
import { routesMap } from "@/Data/routes";

interface SubMenuProps {
  label: string;
  items?: string[];
  basePath?: string; // Ej: "fotografia", "work", "info"
  mainPath?: string; // ruta principal opcional
}

export default function SubMenu({
  label,
  items = [],
  basePath = "",
  mainPath = "",
}: SubMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showAlt, setShowAlt] = useState(true);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const [mainLabel, altLabel] = label.split("┃").map((part) => part.trim());

  // Aparece al inicio y luego cada 20s
  useEffect(() => {
    if (!altLabel) return;

    const initialTimeout = setTimeout(() => setShowAlt(false), 9000);
    const interval = setInterval(() => {
      setShowAlt(true);
      setTimeout(() => setShowAlt(false), 3000);
    }, 20000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [altLabel]);

  return (
    <div onMouseEnter={handleOpen} onMouseLeave={handleClose} style={{ display: "inline-block" }}>
      <Link href={mainPath || "#"} style={{ textDecoration: "none", color: "inherit" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }}>
          <Typography
            sx={{
              color: "white",
              fontFamily: "'Inconsolata', monospace",
              fontWeight: 500,
              fontSize: "1rem",
              transition: "color 0.3s ease",
              "&:hover": { color: "#aaa" },
            }}
          >
            {mainLabel}
          </Typography>
          {altLabel && (
            <>
              <Typography sx={{ color: "white" }}>┃</Typography>
              <Typography
                sx={{
                  color: "white",
                  fontFamily: "'Inconsolata', monospace",
                  fontWeight: 400,
                  fontSize: "0.95rem",
                  opacity: showAlt ? 1 : 0,
                  transform: showAlt ? "translateX(0)" : "translateX(-10px)",
                  transition: "all 0.5s ease",
                }}
              >
                {altLabel}
              </Typography>
            </>
          )}
        </Box>
      </Link>

      {/* Submenú */}
      {items.length > 0 && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          PaperProps={{
            sx: {
              backgroundColor: "black",
              color: "white",
              borderRadius: 0,
              paddingY: 1,
              minWidth: 180,
              boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
            },
          }}
        >
          {items.map((item, index) => {
            // Genera el slug del item
            const slug = item.toLowerCase().replace(/\s+/g, "-");
            const path = `/${basePath}/${slug}`; // ruta final

            return (
              <MenuItem
                key={index}
                onClick={handleClose}
                sx={{
                  color: "white",
                  fontFamily: "'Inconsolata', monospace",
                  fontSize: "0.95rem",
                  "&:hover": { backgroundColor: "#222" },
                }}
              >
                <Link href={path} style={{ textDecoration: "none", color: "inherit" }}>
                  {item}
                </Link>
              </MenuItem>
            );
          })}
        </Menu>
      )}
    </div>
  );
}
