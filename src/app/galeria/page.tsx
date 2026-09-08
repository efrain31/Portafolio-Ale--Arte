import type { Metadata } from "next";
import GalleryIntro from "@/components/Gallery/GalleryIntro";

export const metadata: Metadata = {
  title: "Galería | Ale Vazquez",
};

export default function GaleriaPage() {
  return <GalleryIntro />;
}
