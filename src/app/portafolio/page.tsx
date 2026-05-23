import type { Metadata } from "next";
import IndexGallery from "@/Page/Photography/index";

export const metadata: Metadata = {
  title: "Portafolio | Ale Vazquez",
};

export default function PortafolioPage() {
  return <IndexGallery />;
}
