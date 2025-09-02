"use client";

import { useState } from "react";
import { Menu, MenuItem, Button } from "@mui/material";
import Link from "next/link";

interface SubMenuProps {
  label: string;
  items: string[];
  basePath: string;
}

export default function SubMenu({ label, items, basePath }: SubMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      style={{ display: "inline-block" }}
    >
      {/* Botón del menú principal */}
      <Button
        sx={{
          color: "white",
          fontFamily: "'Inconsolata', monospace",
          textTransform: "none",
          fontWeight: 500,
          fontSize: "1rem",
          transition: "color 0.3s ease",
          "&:hover": { color: "#aaa" },
        }}
      >
        {label}
      </Button>

      {/* Submenú */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
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
        MenuListProps={{
          sx: {
            paddingY: 0,
          },
        }}
      >
        {items.map((item, index) => (
          <MenuItem
            key={index}
            onClick={handleClose}
            sx={{
              color: "white",
              fontFamily: "'Inconsolata', monospace",
              fontWeight: 400,
              fontSize: "0.95rem",
              transition: "background-color 0.2s ease",
              "&:hover": {
                backgroundColor: "#222",
              },
            }}
          >
            <Link
              href={`${basePath}/${item.toLowerCase().replace(/\s+/g, "-")}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {item}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
