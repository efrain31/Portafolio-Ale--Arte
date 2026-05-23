"use client";

import { useState, useEffect, useCallback } from "react";
import { Box, IconButton, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ImageData } from "@/data/data";

interface ImageGridProps {
  images: ImageData[];
}

const PRIORITY_COUNT = 6;

export default function ImageGrid({ images }: ImageGridProps) {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [loadedSrcs, setLoadedSrcs] = useState<Set<string>>(new Set());
  const [modalLoaded, setModalLoaded] = useState(false);

  const isMobile = useMediaQuery("(max-width:599px)");
  const isTablet = useMediaQuery("(min-width:600px) and (max-width:899px)");
  const columns = isMobile ? 1 : isTablet ? 2 : 3;

  const markLoaded = useCallback((src: string) => {
    setLoadedSrcs((prev) => new Set(prev).add(src));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Resetear estado de carga del modal al cambiar imagen
  useEffect(() => {
    setModalLoaded(false);
  }, [selectedImage?.src]);

  return (
    <>
      <Box
        sx={{
          columnCount: columns,
          columnGap: "16px",
          maxWidth: 1200,
          margin: "0 auto",
          padding: 2,
        }}
      >
        <AnimatePresence>
          {images.map((imgData, index) => {
            const isLoaded = loadedSrcs.has(imgData.src);
            const isPriority = index < PRIORITY_COUNT;

            return (
              <motion.div
                key={imgData.src}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.5) }}
                style={{
                  breakInside: "avoid",
                  marginBottom: "16px",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  minHeight: "80px",
                  backgroundColor: "#111",
                }}
                whileHover={{ scale: 1.03 }}
                onClick={() => setSelectedImage(imgData)}
              >
                {/* Shimmer mientras carga */}
                {!isLoaded && (
                  <div
                    className="img-shimmer"
                    style={{
                      position: "absolute",
                      inset: 0,
                      zIndex: 1,
                    }}
                  />
                )}

                <Image
                  src={imgData.src}
                  alt={imgData.title || `imagen-${index + 1}`}
                  width={0}
                  height={0}
                  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                  className={`img-fade${isLoaded ? " loaded" : ""}`}
                  style={{ width: "100%", height: "auto", display: "block", position: "relative", zIndex: 2 }}
                  priority={isPriority}
                  loading={isPriority ? undefined : "lazy"}
                  onLoad={() => markLoaded(imgData.src)}
                />

                {imgData.title && (
                  <Box
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
                      zIndex: 3,
                      "&:hover": { opacity: 1 },
                    }}
                  >
                    {imgData.title}
                  </Box>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </Box>

      {/* Lightbox */}
      {selectedImage && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: 2,
            boxSizing: "border-box",
            cursor: "pointer",
          }}
          onClick={() => setSelectedImage(null)}
        >
          <Box
            onClick={(e) => e.stopPropagation()}
            sx={{
              position: "relative",
              maxWidth: "90vw",
              maxHeight: "90vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "default",
              backgroundColor: "#111",
              minWidth: 60,
              minHeight: 60,
            }}
          >
            {!modalLoaded && (
              <div
                className="img-shimmer"
                style={{ position: "absolute", inset: 0, minWidth: 200, minHeight: 200 }}
              />
            )}

            <Image
              src={selectedImage.src}
              alt={selectedImage.title || "imagen seleccionada"}
              width={0}
              height={0}
              sizes="100vw"
              className={`img-fade${modalLoaded ? " loaded" : ""}`}
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                width: "auto",
                height: "auto",
                objectFit: "contain",
                display: "block",
              }}
              priority
              onLoad={() => setModalLoaded(true)}
            />

            <IconButton
              onClick={() => setSelectedImage(null)}
              sx={{
                position: "absolute",
                top: -40,
                right: -8,
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
