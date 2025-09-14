//INDEX
import ImageGrid from "@/Page/Photography/index";

//PAGES
import PhotographyGallery from "@/Page/Photography/Artegalery";
import FoodGallery from "@/Page/Photography/Food";
import JPGGallery from "@/Page/Photography/Jpg";
import PHOTOSHOOTGallery from "@/Page/Photography/Photoshoot";
import STILLSGallery from "@/Page/Photography/Stills";
import SUTDIOGallery from "@/Page/Photography/Studio";
//WORKS
import WorksRestauraciones from "@/Page/Works/Restauraciones";
import WorksPublicidad from "@/Page/Works/Publicidad";
import WorksIlustration from "@/Page/Works/Ilustration";
//INFOS
import About from "@/Page/Info/About-me";
import ALE from "@/Page/Info/AleVazquez";
//MODEL
import MODEL from "@/Page/Modelings/Modeling";



const normalizeSlug = (s: string) =>
  s.toLowerCase().replace(/\s+/g, "-").replace(/[()&]/g, "").replace(/--+/g, "-");

export const routesMap: Record<string, Record<string, React.ComponentType>> = {
  fotografia: {
    [normalizeSlug("ART GALLERY")]: PhotographyGallery,
    [normalizeSlug("FOOD")]: FoodGallery,
    [normalizeSlug("JPG PHOTOS")]: JPGGallery,
    [normalizeSlug("PHOTOSHOOT")]: PHOTOSHOOTGallery,
    [normalizeSlug("STILLS (BTS)")]:  STILLSGallery,
    [normalizeSlug("STUDIO")]: SUTDIOGallery,
    [normalizeSlug("Index")]: ImageGrid,
  },
  work: {
    [normalizeSlug("RESTORATIONS")]: WorksRestauraciones,
    [normalizeSlug("ADS")]: WorksPublicidad,
    [normalizeSlug("ART")]: WorksIlustration,
  },
  info: {
    [normalizeSlug("ABOUT")]: About,
    [normalizeSlug("CONTACT")]: ALE,
    [normalizeSlug("MODEL")]: MODEL,
  },
  //  model: {
  //   [normalizeSlug("MODEL")]: MODEL,

  // },
};
