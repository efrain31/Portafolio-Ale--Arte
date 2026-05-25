"use client";

import { useState, useEffect } from "react";
import { Menu, MenuItem, Typography, Box } from "@mui/material";
import Link from "next/link";

interface SubMenuProps {
  label: string;
  items?: string[];
  basePath?: string;
  fontSize: number;
  onItemClick?: () => void;
  mobile?: boolean;
}

export default function SubMenu({
  label,
  items = [],
  basePath = "",
  fontSize,
  onItemClick,
  mobile = false,
}: SubMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [showAlt, setShowAlt] = useState(true);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const [mainLabel, altLabel] = label.split("┃").map((part) => part.trim());

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

  /* ── MÓVIL: acordeón inline ── */
  if (mobile) {
    return (
      <Box sx={{ borderBottom: "1px solid #1a1a1a" }}>
        <Box
          onClick={() => setExpanded(!expanded)}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
            py: 1.5,
            px: 1,
            userSelect: "none",
            "&:active": { backgroundColor: "rgba(255,255,255,0.04)" },
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontFamily: "'Inconsolata', monospace",
              fontWeight: 500,
              fontSize: `${fontSize * 0.55}rem`,
            }}
          >
            {mainLabel}
          </Typography>
          <Typography
            sx={{
              color: expanded ? "white" : "#555",
              fontSize: "1.4rem",
              fontWeight: 300,
              transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease, color 0.3s ease",
              lineHeight: 1,
              pr: 0.5,
            }}
          >
            ›
          </Typography>
        </Box>

        <Box
          sx={{
            overflow: "hidden",
            maxHeight: expanded ? "500px" : "0px",
            transition: "max-height 0.35s ease",
          }}
        >
          <Box sx={{ borderLeft: "1px solid #2a2a2a", ml: 1.5, mb: 1.5 }}>
            {items.map((item, index) => {
              const slug = item.toLowerCase().replace(/\s+/g, "-");
              const path = `/${basePath}/${slug}`;
              return (
                <Link
                  key={index}
                  href={path}
                  style={{ textDecoration: "none", display: "block" }}
                  onClick={onItemClick}
                >
                  <Typography
                    sx={{
                      color: "#aaa",
                      fontFamily: "'Inconsolata', monospace",
                      fontSize: `${fontSize * 0.45}rem`,
                      py: 0.8,
                      px: 2,
                      transition: "color 0.2s ease, padding-left 0.2s ease",
                      "&:hover": { color: "white", paddingLeft: "2.5rem" },
                    }}
                  >
                    {item}
                  </Typography>
                </Link>
              );
            })}
          </Box>
        </Box>
      </Box>
    );
  }

  /* ── DESKTOP: hover + menú flotante ── */
  return (
    <div onMouseEnter={handleOpen} onMouseLeave={handleClose} style={{ display: "inline-block" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "default" }}>
        <Typography
          sx={{
            color: "white",
            fontFamily: "'Inconsolata', monospace",
            fontWeight: 500,
            fontSize: `${fontSize}rem`,
            transition: "color 0.3s ease",
            "&:hover": { color: "#aaa" },
          }}
        >
          {mainLabel}
        </Typography>
        {altLabel && (
          <>
            <Typography sx={{ color: "white", fontSize: `${fontSize}rem` }}>┃</Typography>
            <Typography
              sx={{
                color: "white",
                fontFamily: "'Inconsolata', monospace",
                fontWeight: 400,
                fontSize: `${fontSize * 0.9}rem`,
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

      {items.length > 0 && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          slotProps={{
            paper: {
              sx: {
                backgroundColor: "black",
                color: "white",
                borderRadius: 0,
                paddingY: 1,
                minWidth: 180,
                boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
              },
            },
          }}
        >
          {items.map((item, index) => {
            const slug = item.toLowerCase().replace(/\s+/g, "-");
            const path = `/${basePath}/${slug}`;
            return (
              <MenuItem
                key={index}
                sx={{
                  color: "white",
                  fontFamily: "'Inconsolata', monospace",
                  fontSize: `${fontSize * 0.88}rem`,
                  paddingLeft: "1.2rem",
                  transition: "padding-left 0.25s ease, background-color 0.2s ease",
                  "&:hover": {
                    backgroundColor: "#111",
                    paddingLeft: "1.8rem",
                    textDecoration: "underline",
                    textUnderlineOffset: "4px",
                  },
                }}
              >
                <Link
                  href={path}
                  style={{ textDecoration: "none", color: "inherit", width: "100%" }}
                  onClick={() => {
                    handleClose();
                    onItemClick?.();
                  }}
                >
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
