"use client";
import { useState, useEffect, useRef } from "react";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ImageGridProps {
  images: string[];
}

// Patrones de tamaño (imitando Squarespace stacked)
const sizePattern = [
  { width: 250, height: 374 },
  { width: 484, height: 374 },
  { width: 743, height: 504 },
  { width: 743, height: 596 },
  { width: 743, height: 556 },
  { width: 600, height: 600 },
  { width: 743, height: 514 },
  { width: 743, height: 371 },
];

export default function ImageGrid({ images }: ImageGridProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [positions, setPositions] = useState<{ top: number; left: number }[]>(
    []
  );
  const containerRef = useRef<HTMLDivElement>(null);

  // Calcula posiciones tipo “stacked gallery”
  useEffect(() => {
    if (!containerRef.current) return;
    let topOffset = 0;
    let leftOffset = 0;
    const gap = 10;
    const containerWidth = containerRef.current.clientWidth;

    const tempPositions: { top: number; left: number }[] = [];

    images.forEach((_, index) => {
      const { width, height } = sizePattern[index % sizePattern.length];

      // Guardar posición
      tempPositions.push({ top: topOffset, left: leftOffset });

      // Actualizar offsets
      leftOffset += width + gap;
      if (leftOffset + width > containerWidth) {
        leftOffset = 0;
        topOffset += height + gap;
      }
    });

    setPositions(tempPositions);
  }, [images]);

  return (
    <>
      <Box
        ref={containerRef}
        id="thumbList"
        sx={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        {images.map((src, index) => {
          const { width, height } = sizePattern[index % sizePattern.length];
          const pos = positions[index] || { top: 0, left: 0 };

          return (
            <Box
              key={index}
              className="thumb"
              sx={{
                position: "absolute",
                top: pos.top,
                left: pos.left,
                width,
                height,
                overflow: "hidden",
                cursor: "pointer",
                "&:hover img": {
                  transform: "scale(1.05)",
                  transition: "0.5s ease",
                },
              }}
              onClick={() => setSelectedImage(src)}
            >
              <img
                src={src}
                alt={`img-${index}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "0.5s ease",
                }}
              />
              <Box
                className="thumb-title"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  color: "white",
                  background: "rgba(0,0,0,0.4)",
                  textAlign: "center",
                  opacity: 0,
                  transition: "0.3s",
                  "&:hover": { opacity: 1 },
                }}
              ></Box>
            </Box>
          );
        })}
      </Box>

      {/* Modal full-screen */}
      {selectedImage && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
          onClick={() => setSelectedImage(null)}
        >
          <Box
            sx={{
              position: "relative",
              maxWidth: "90%",
              maxHeight: "90%",
            }}
          >
            <img
              src={selectedImage}
              alt="selected"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: "4px",
              }}
            />
            <IconButton
              onClick={() => setSelectedImage(null)}
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                color: "white",
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      )}
    </>
  );
}
