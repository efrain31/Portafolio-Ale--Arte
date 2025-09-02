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
              onClick={() => setSelectedImage(imgData)}
            >
              <motion.img
                src={imgData.src}
                alt={imgData.title || `img-${index}`}
                style={{
                  width: "100%",
                  display: "block",
                  objectFit: "cover",
                  borderRadius: 0, // 🔹 bordes cuadrados
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
            overflowY: "auto",
            padding: 2,
          }}
          onClick={() => setSelectedImage(null)}
        >
          <Box
            onClick={(e) => e.stopPropagation()}
            sx={{
              position: "relative",
              maxWidth: "90%",
              maxHeight: "90%",
            }}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.title || "selected"}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: 0, 
              }}
            />
            {selectedImage.title && (
              <Box
                sx={{
                  position: "absolute",
                  bottom: 10,
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: "white",
                  // background: "rgba(0,0,0,0.2)",
                  padding: "5px 10px",
                  borderRadius: 0,
                }}
              >
                {/* {selectedImage.title} */}
              </Box>
            )}
            <IconButton
              onClick={() => setSelectedImage(null)}
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                color: "black",
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
