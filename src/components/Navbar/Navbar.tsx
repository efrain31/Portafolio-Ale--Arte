import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import SubMenu from "./SubMenu";

const routesData = [
  {
    label: "Fotografía ┃ Photograph",
    basePath: "fotografia",
    mainPath: "/fotografia",
    items: ["FOOD", "JPG PHOTOS", "PHOTOSHOOT", "STILLS (BTS)", "STUDIO"],
  },
  {
    label: "Trabajos ┃ Work",
    basePath: "work",
    mainPath: "/work",
    items: ["RESTORATIONS", "ADS", "ART"],
  },
  {
    label: "Sobre mi ┃ About me",
    basePath: "info",
    mainPath: "/about-me",
    items: ["ABOUT", "CONTACT", "MODEL"],
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "black", paddingY: 1 }}>
      <Toolbar
        sx={{
          flexDirection: { xs: "row", md: "column" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: { xs: 0, md: 2 },
        }}
      >
        {/* Logo / título */}
        <Typography
          variant="h5"
          sx={{
            fontFamily: "'Inconsolata', monospace",
            color: "white",
            textAlign: "center",
            paddingY: 1,
          }}
        >
          <a
            href="/"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Ale Vazquez
          </a>
        </Typography>

        {/* Menú desktop */}
        <Box
          component="nav"
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 4,
          }}
        >
          {routesData.map((route) => (
            <SubMenu
              key={route.label}
              label={route.label}
              items={route.items}
              basePath={route.basePath}
              mainPath={route.mainPath}
            />
          ))}
        </Box>

        {/* Botón hamburguesa (solo móvil) */}
        <IconButton
          color="inherit"
          edge="end"
          onClick={handleDrawerToggle}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Drawer para móvil */}
      <Drawer
  anchor="right"
  open={mobileOpen}
  onClose={() => setMobileOpen(false)} // se cierra SOLO al dar tap afuera
  ModalProps={{ keepMounted: true }}
  PaperProps={{
    sx: { width: 250, backgroundColor: "black", color: "white", p: 2 },
  }}
>
  <Box
    component="nav"
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: 2,
    }}
  >
    {routesData.map((route) => (
     <SubMenu
  key={route.label}
  label={route.label}
  items={route.items}
  basePath={route.basePath}
  mainPath={route.mainPath}
  onItemClick={() => setMobileOpen(false)} 
/>



    ))}
  </Box>
</Drawer>

    </AppBar>
  );
}
