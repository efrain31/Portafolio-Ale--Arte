import { Box } from "@mui/material";
import ImageGrid from "@/components/Galerias/ImagenGrid";
import { imagesData } from "@/Data/data";
import Footer from "@/components/Footer/Footer";

export default function aleVazquez() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1 }}>
        <ImageGrid images={imagesData} />
      </div>
      <Footer />
    </div>
  );
}