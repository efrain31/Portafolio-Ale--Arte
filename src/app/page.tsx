import { Box } from "@mui/material";
import ImageGrid from "../components/galerias/ImagenGrid";
import SocialIcons from "../../src/components/Icons/Socialicons";
import { imagesData } from "@/data/data";
import Footer from "@/components/Footer/Footer";

export default function Page() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1 }}>
        <ImageGrid images={imagesData} />
      </div>
      <Footer />
    </div>
  );
}