"use client";
import { useState, useEffect, useRef } from "react";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";
import { ImageData } from "@/data/data";

interface ImageGridProps {
  images: ImageData[];
}

export default function ImageGrid({ images }: ImageGridProps) {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [imageOrientation, setImageOrientation] = useState<"portrait" | "landscape">("landscape");
  const containerRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(3);

  const updateColumns = () => {
    const width = window.innerWidth;
    if (width < 600) setColumns(1);
    else if (width < 900) setColumns(2);
    else setColumns(3);
  };

  useEffect(() => {
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  // 🔹 Solo selecciona la imagen, la orientación se calcula en el onLoad del modal
  const handleImageClick = (imgData: ImageData) => {
    setSelectedImage(imgData);
  };

  // 🔹 Cerrar modal con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <Box
        ref={containerRef}
        sx={{
          columnCount: columns,
          columnGap: "16px",
          maxWidth: 1200,
          margin: "0 auto",
          padding: 2,
        }}
      >
        <AnimatePresence>
          {images.map((imgData, index) => (
            <motion.div
              key={imgData.src}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              style={{
                breakInside: "avoid",
                marginBottom: "16px",
                cursor: "pointer",
                position: "relative",
              }}
              onClick={() => handleImageClick(imgData)}
            >
              <motion.img
                src={imgData.src}
                alt={imgData.title || `img-${index}`}
                  loading="lazy"
                style={{
                  width: "100%",
                  display: "block",
                  objectFit: "cover",
                  borderRadius: 0,
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              {imgData.title && (
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
                    padding: "5px 0",
                    "&:hover": { opacity: 1 },
                  }}
                >
                  {imgData.title}
                </Box>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </Box>

      {/* Modal */}
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
            padding: 2,
            boxSizing: "border-box",
            cursor: "pointer", // 🔹 fondo clickeable
          }}
          onClick={() => setSelectedImage(null)}
        >
          <Box
            onClick={(e) => e.stopPropagation()} // 🔹 no cerrar al hacer clic en la imagen
            sx={{
              position: "relative",
              width: "800px",
              height: "800px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "default", // 🔹 cursor normal sobre la imagen
            }}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.title || "selected"}
              onLoad={(e) => {
                const imgEl = e.currentTarget;
                if (imgEl.naturalWidth > imgEl.naturalHeight)
                  setImageOrientation("landscape");
                else setImageOrientation("portrait");
              }}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "cover",
                borderRadius: 0,
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
