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
}

export default function SubMenu({
  label,
  items = [],
  basePath = "",
  fontSize,
  onItemClick,
}: SubMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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

  return (
    <div onMouseEnter={handleOpen} onMouseLeave={handleClose} style={{ display: "inline-block" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "default" }}>
        <Typography
          sx={{
            color: "white",
            fontFamily: "'Inconsolata', monospace",
            fontWeight: 500,
            fontSize: `${fontSize}rem`,
            transition: "color 0.3s ease, font-size 0.2s ease",
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
                transition: "all 0.5s ease, font-size 0.2s ease",
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
            const slug = item.toLowerCase().replace(/\s+/g, "-");
            const path = `/${basePath}/${slug}`;
            return (
              <MenuItem
                key={index}
                sx={{
                  color: "white",
                  fontFamily: "'Inconsolata', monospace",
                  fontSize: `${fontSize * 0.88}rem`,
                  "&:hover": { backgroundColor: "#222" },
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
