import { Box } from "@mui/material";
import ImageGrid from "../components/Imagenes/ImagenGrid";
import SocialIcons from "../../src/components/Icons/Socialicons";

const images = [
  "/images/1.jpg","/images/2.jpg","/images/3.jpg","/images/4.jpg",
  "/images/5.jpg","/images/6.jpg","/images/7.jpg","/images/8.jpg",
  "/images/9.jpg","/images/10.jpg","/images/11.jpg","/images/12.jpg",
  "/images/13.jpg","/images/14.jpg",
];

export default function HomePage() {
  return (
    <Box sx={{ backgroundColor: "black", minHeight: "100vh", padding: 4 }}>
      <ImageGrid images={images} />
      <SocialIcons />
    </Box>
  );
}
