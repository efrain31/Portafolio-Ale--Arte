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
          variant="h5"
          sx={{
            fontFamily: "Century Schoolbook",
            color: "white",
            textAlign: "center",
          }}
        >
          <a href="/" style={{ color: "inherit", textDecoration: "none" }}>
            Ale Vezquez
          </a>
        </Typography>

        {/* Menú principal */}
        <Box sx={{ display: "flex", gap: 4 }}>
          <SubMenu label="Fotografía" items={submenuFotografia} basePath="/fotografia" />
          <SubMenu label="Work" items={submenuWork} basePath="/work" />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
