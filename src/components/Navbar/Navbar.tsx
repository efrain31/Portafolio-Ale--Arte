"use client";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SubMenu from "./SubMenu";

export default function Navbar() {
  const submenuFotografia = ["Arte", "Comida", "JPG Photos", "Stills", "Estudio"];
  const submenuWork = ["Restauraciones", "Publicidad Arte"];

  return (
    <AppBar position="static" sx={{ backgroundColor: "black", paddingY: 2 }}>
      <Toolbar sx={{ flexDirection: "column", alignItems: "center", gap: 2 }}>
        {/* Nombre */}
        <Typography
          variant="h4" 
          sx={{
            fontFamily: "'Inconsolata', monospace",
            color: "white",
            textAlign: "center",
            paddingY: 1,
            marginTop: 6, // separa el nombre del borde superior del navbar
          }}
        >
          <a href="/" style={{ color: "inherit", textDecoration: "none" }}>
            Ale Vazquez
          </a>
        </Typography>



        {/* Menú principal */}
        <Box component="nav" sx={{ display: "flex", gap: 4 }}>
          <SubMenu label="Fotografía" items={submenuFotografia} basePath="/fotografia" />
          <SubMenu label="Work" items={submenuWork} basePath="/work" />
          <Typography
            sx={{
              color: "white",
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 500,
              fontSize: "1rem",
              "&:hover": { color: "#aaa" },
            }}
          >
          </Typography>
        </Box>

      </Toolbar>
    </AppBar>
  );
}
