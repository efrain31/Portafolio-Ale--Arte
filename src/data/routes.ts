import PhotographyGallery from "@/Page/Photography/PhotographyGallery";
import FoodGallery from "@/Page/Photography/FoodGallery";
import WorksRestauraciones from "@/Page/Works/WorksRestauraciones";
import WorksPublicidad from "@/Page/Works/WorksPublicidad";
import About from "@/Page/Info/About";

export const routesMap: Record<string, Record<string, React.ComponentType>> = {
  fotografia: {
    "art-gallery": PhotographyGallery,
    food: FoodGallery,
  },
  work: {
    restauraciones: WorksRestauraciones,
    "publicidad-arte": WorksPublicidad,
  },
  info: {
    "about-me": About,
  },
};
