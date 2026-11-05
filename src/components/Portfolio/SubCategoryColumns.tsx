"use client";

import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

// Subcategorías en columnas (inspirado en una landing de columnas):
// - Escritorio: una columna vertical por subcategoría. En reposo la foto se
//   ve tenue en gris; al pasar el cursor la foto a color sube dentro de su
//   columna. Al hacer clic se expande a toda la sección con el nombre, el
//   número de fotos y una miniatura circular para abrir la galería.
// - Móvil: franjas horizontales que se abren al tocar.

const sans = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const mono = "'Inconsolata', monospace";
const ease = [0.76, 0, 0.24, 1] as const;

// Cursor en forma de asterisco, como en la referencia
const asteriskCursor = `url("data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28"><g stroke="white" stroke-width="2.4" stroke-linecap="round"><path d="M14 4v20M5.3 9l17.4 10M5.3 19L22.7 9"/></g></svg>'
)}") 14 14, pointer`;

export interface ColumnItem {
  name: string;
  images: { src: string }[];
}

export default function SubCategoryColumns({
  items,
  categoryLabel,
  onOpen,
}: {
  items: ColumnItem[];
  categoryLabel: string;
  onOpen: (index: number) => void;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<{ index: number; clip: string } | null>(null);
  const n = items.length;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Recorte exacto de la columna tocada: desde ahí se expande (y ahí vuelve)
  const openAt = (index: number, el: HTMLElement) => {
    const s = sectionRef.current?.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    if (!s) return;
    setOpen({
      index,
      clip: `inset(${r.top - s.top}px ${s.right - r.right}px ${s.bottom - r.bottom}px ${r.left - s.left}px)`,
    });
  };

  const current = open ? items[open.index] : null;
  const cover = (item: ColumnItem) => item.images[0]?.src;

  return (
    <Box
      ref={sectionRef}
      sx={{
        position: "relative",
        height: { xs: "80svh", md: "calc(100vh - 120px)" },
        minHeight: { xs: 520, md: 560 },
        backgroundColor: "#000",
        color: "white",
        overflow: "hidden",
        letterSpacing: 0,
        textTransform: "none",
        cursor: asteriskCursor,
      }}
    >
      {/* Columnas / franjas */}
      <Box sx={{ position: "absolute", inset: 0, display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        {items.map((item, i) => (
          <Box
            key={item.name}
            component="button"
            onClick={(e: React.MouseEvent<HTMLElement>) => openAt(i, e.currentTarget)}
            aria-label={`Abrir ${item.name}`}
            sx={{
              position: "relative",
              flex: 1,
              minWidth: 0,
              minHeight: 0,
              padding: 0,
              border: 0,
              background: "transparent",
              color: "inherit",
              cursor: "inherit",
              overflow: "hidden",
              textAlign: "left",
              "& .col-color": {
                clipPath: "inset(100% 0 0 0)",
                transition: "clip-path 0.8s cubic-bezier(0.22,1,0.36,1)",
              },
              "& .col-color img": {
                transform: "scale(1.12)",
                transition: "transform 1.3s cubic-bezier(0.22,1,0.36,1)",
              },
              "@media (hover: hover)": {
                "&:hover .col-color": { clipPath: "inset(0 0 0 0)" },
                "&:hover .col-color img": { transform: "scale(1)" },
                "&:hover .col-label": { transform: "translateY(-6px)" },
              },
              "&:focus-visible .col-color": { clipPath: "inset(0 0 0 0)" },
            }}
          >
            {/* Línea divisoria que se dibuja al entrar */}
            {i > 0 && (
              <Box
                component={motion.span}
                initial={{ scaleX: 0, scaleY: 0 }}
                animate={{ scaleX: 1, scaleY: 1 }}
                transition={{ duration: 1, delay: 0.15 + i * 0.1, ease }}
                sx={{
                  position: "absolute",
                  zIndex: 2,
                  background: "rgba(255,255,255,0.18)",
                  left: 0,
                  top: 0,
                  width: { xs: "100%", md: "1px" },
                  height: { xs: "1px", md: "100%" },
                  transformOrigin: { xs: "left", md: "top" },
                }}
              />
            )}
            {/* Foto tenue en gris (reposo) */}
            <Box
              component="img"
              src={cover(item)}
              alt=""
              sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1)", opacity: 0.28 }}
            />
            {/* Foto a color que sube al pasar el cursor */}
            <Box className="col-color" sx={{ position: "absolute", inset: 0 }}>
              <Box component="img" src={cover(item)} alt="" sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </Box>
            <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0) 50%)" }} />
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 + i * 0.08 }}
            >
              <Box
                className="col-label"
                sx={{
                  position: "absolute",
                  zIndex: 3,
                  left: { xs: "6%", md: "1.25rem" },
                  right: { md: "1rem" },
                  bottom: { xs: "50%", md: "1.5rem" },
                  transform: { xs: "translateY(50%)", md: "none" },
                  transition: "transform 0.4s",
                }}
              >
                <Box sx={{ fontFamily: mono, fontSize: "0.62rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.55)", mb: 0.6 }}>
                  {String(i + 1).padStart(2, "0")}
                </Box>
                <Box sx={{ fontFamily: sans, fontWeight: 300, fontSize: { xs: "1.25rem", md: n > 4 ? "1.05rem" : "1.3rem" }, textTransform: "uppercase", lineHeight: 1.15 }}>
                  {item.name}
                </Box>
              </Box>
            </motion.div>
          </Box>
        ))}
      </Box>

      {/* Subcategoría abierta: se expande desde su columna */}
      <AnimatePresence>
        {current && open && (
          <motion.div
            key={current.name}
            initial={{ clipPath: open.clip }}
            animate={{ clipPath: "inset(0px 0px 0px 0px)" }}
            exit={{ clipPath: open.clip }}
            transition={{ duration: 0.9, ease }}
            style={{ position: "absolute", inset: 0, zIndex: 5, cursor: "default" }}
          >
            <Box component="img" src={cover(current)} alt={current.name} sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0.35) 100%)" }} />

            <Box
              component="button"
              onClick={() => setOpen(null)}
              sx={{
                position: "absolute",
                top: { xs: "1.25rem", md: "1.75rem" },
                right: { xs: "1.25rem", md: "2rem" },
                background: "rgba(0,0,0,0.35)",
                border: "1px solid rgba(255,255,255,0.5)",
                borderRadius: "999px",
                color: "white",
                padding: "0.45rem 1rem",
                fontFamily: mono,
                fontSize: "0.65rem",
                letterSpacing: "0.3em",
                cursor: "pointer",
                "&:hover": { background: "white", color: "black" },
              }}
            >
              CERRAR ✕
            </Box>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
            >
              <Box sx={{ position: "absolute", left: { xs: "6%", md: "2.5rem" }, right: { xs: "6%", md: "auto" }, bottom: { xs: "13rem", md: "2.5rem" }, maxWidth: { md: "60%" } }}>
                <Box sx={{ fontFamily: mono, fontSize: "0.65rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.7)", mb: 1.5, textTransform: "uppercase" }}>
                  {String(open.index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")} — {categoryLabel} · {current.images.length} fotos
                </Box>
                <Box sx={{ fontFamily: sans, fontWeight: 300, fontSize: { xs: "2.6rem", md: "clamp(3rem, 7vw, 6.5rem)" }, lineHeight: 0.95, textTransform: "uppercase" }}>
                  {current.name}
                </Box>
              </Box>

              {/* Miniatura circular → abrir la galería */}
              <Box
                component="button"
                onClick={() => onOpen(open.index)}
                sx={{
                  pointerEvents: "auto",
                  position: "absolute",
                  right: { xs: "6%", md: "2.5rem" },
                  bottom: { xs: "6.5rem", md: "7rem" },
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  background: "none",
                  border: 0,
                  padding: 0,
                  color: "white",
                  cursor: "pointer",
                  "&:hover .thumb": { transform: "scale(1.06)" },
                }}
              >
                <Box sx={{ fontFamily: mono, fontSize: "0.65rem", letterSpacing: "0.3em", textAlign: "right", lineHeight: 1.8 }}>
                  VER
                  <br />
                  SERIE
                </Box>
                {/* Flecha que se mueve hacia la miniatura: indica que hay que dar clic */}
                <motion.svg
                  width="34"
                  height="14"
                  viewBox="0 0 34 14"
                  aria-hidden
                  animate={{ x: [0, 7, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                  style={{ flexShrink: 0 }}
                >
                  <path d="M0 7 H31 M25 1 L32 7 L25 13" fill="none" stroke="white" strokeWidth="1.3" />
                </motion.svg>
                <Box
                  className="thumb"
                  sx={{
                    position: "relative",
                    width: { xs: 88, md: 120 },
                    height: { xs: 88, md: 120 },
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.6)",
                    transition: "transform 0.4s",
                  }}
                >
                  <Box
                    component="img"
                    src={current.images[1]?.src ?? cover(current)}
                    alt=""
                    sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      right: 8,
                      bottom: 8,
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "white",
                      color: "black",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.9rem",
                    }}
                  >
                    ↗
                  </Box>
                </Box>
              </Box>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
