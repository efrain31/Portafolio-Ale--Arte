import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import SubMenu from "./SubMenu";

const routesData = [
  {
    label: "Fotografía ┃ Photograph",
    basePath: "fotografia",
    mainPath: "/fotografia",
    items: ["FOOD", "JPG PHOTOS", "PHOTOSHOOT", "STILLS (BTS)", "STUDIO"]
    // "ART GALLERY", 
  },
  {
    label: "Trabajos ┃ Work",
    basePath: "work",
    mainPath: "/work",
    items: ["RESTORATIONS", "ADS", "ART"]
  },
  {
    label: "Sobre mi ┃ About me",
    basePath: "info",
    mainPath: "/about-me",
    items: ["ABOUT", "CONTACT", "MODEL"]
  },
  // {
  //   label: "Modelaje ┃ Modeling",
  //   basePath: "model",
  //   mainPath: "/Modeling",
  //   items: ["MODEL"]
  // }
];

export default function Navbar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "black", paddingY: 2 }}>
      <Toolbar sx={{ flexDirection: "column", alignItems: "center", gap: 2 }}>
        <Typography variant="h4" sx={{ fontFamily: "'Inconsolata', monospace", color: "white", textAlign: "center", paddingY: 1, marginTop: 6 }}>
          <a href="/" style={{ color: "inherit", textDecoration: "none" }}>Ale Vazquez</a>
        </Typography>

        <Box component="nav" sx={{ display: "flex", gap: 4 }}>
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
      </Toolbar>
    </AppBar>
  );
}
