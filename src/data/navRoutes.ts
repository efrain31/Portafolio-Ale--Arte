// Estructura de navegación compartida por el dropdown del header (NavLinks)
// y por la pantalla de galería intermedia (GalleryIntro), para no
// duplicarla en cada componente.
export const navRoutes = [
  { label: "Fotografía", basePath: "fotografia", items: ["FOOD", "JPG", "PHOTOSHOOT", "STILLS (BTS)", "STUDIO"] },
  { label: "Trabajos", basePath: "work", items: ["RESTORATIONS", "ADS", "ART"] },
  { label: "Sobre mí", basePath: "info", items: ["ABOUT", "CONTACT", "MODEL"] },
];

export const normalizeSlug = (s: string) =>
  s.toLowerCase().replace(/\s+/g, "-").replace(/[()&]/g, "").replace(/--+/g, "-");
