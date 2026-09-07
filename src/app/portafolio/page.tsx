import type { Metadata } from "next";
import PortfolioShowcase from "@/components/Portfolio/PortfolioShowcase";

export const metadata: Metadata = {
  title: "Portafolio | Ale Vazquez",
};

export default function PortafolioPage() {
  return <PortfolioShowcase />;
}
