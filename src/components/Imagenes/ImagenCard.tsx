import { Box } from "@mui/material";

interface ImageCardProps {
  src: string;
  width?: string;
  height?: string;
}

export default function ImageCard({ src, width = "100%", height = "300px" }: ImageCardProps) {
  return (
    <Box
      component="img"
      src={src}
      alt=""
      sx={{
        width,
        height,
        margin: "8px",
        borderRadius: "8px",
        objectFit: "cover",
      }}
    />
  );
}
