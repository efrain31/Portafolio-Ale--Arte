"use client";

import { useRef } from "react";
import { Box } from "@mui/material";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";

// Flujo de categorías inspirado en una landing editorial: cada categoría
// ocupa una pantalla con su nombre gigante que se desliza con el scroll,
// fotos "flotando" delante y detrás de las letras (parallax a distintas
// velocidades) y un bloque corto de texto con el botón para entrar.

export interface FlowCategory {
  id: string;
  word: string;
  description: string;
  series: string[];
  images: string[]; // 3 fotos: [frente arriba, fondo desenfocada, frente abajo]
}

const grotesk = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const mono = "'Inconsolata', monospace";

function FloatingPhoto({
  src,
  progress,
  range,
  sx,
  blur = 0,
  zIndex,
  rotate = 0,
  onClick,
}: {
  src: string;
  progress: MotionValue<number>;
  range: [number, number];
  sx: object;
  blur?: number;
  zIndex: number;
  rotate?: number;
  onClick: () => void;
}) {
  const y = useTransform(progress, [0, 1], range);
  return (
    <Box sx={{ position: "absolute", zIndex, ...sx }}>
      <motion.div
        style={{ y, rotate, filter: blur ? `blur(${blur}px)` : undefined, cursor: "pointer" }}
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: blur ? 0.7 : 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        onClick={onClick}
      >
        <Box sx={{ position: "relative", width: "100%", aspectRatio: "3 / 4", overflow: "hidden" }}>
          <Image src={src} alt="" fill sizes="(max-width: 900px) 50vw, 25vw" style={{ objectFit: "cover" }} />
        </Box>
      </motion.div>
    </Box>
  );
}

function FlowSection({
  cat,
  index,
  total,
  onSelect,
}: {
  cat: FlowCategory;
  index: number;
  total: number;
  onSelect: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // La palabra entra desde la derecha y sigue de largo mientras bajas
  const wordX = useTransform(scrollYProgress, [0, 1], ["12%", "-22%"]);
  const letters = Array.from(cat.word);

  return (
    <Box
      ref={ref}
      component="section"
      sx={{
        position: "relative",
        height: "100svh",
        minHeight: 620,
        overflow: "hidden",
        backgroundColor: "#000",
        color: "white",
        letterSpacing: 0,
        textTransform: "none",
      }}
    >
      {/* Palabra gigante, a sangre. La animación de las letras la dispara
          el contenedor (las letras ocultas bajo el recorte nunca "entran"
          en pantalla por sí solas). */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          left: 0,
          top: { xs: "13%", md: "9%" },
          zIndex: 2,
          fontFamily: grotesk,
          fontWeight: 800,
          fontSize: { xs: "26vw", md: "17vw" },
          lineHeight: 0.85,
          letterSpacing: "-0.055em",
        }}
      >
        <motion.div
          style={{ x: wordX, display: "flex", whiteSpace: "nowrap", overflow: "hidden", paddingBottom: "0.08em" }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ show: { transition: { staggerChildren: 0.045 } } }}
        >
          {letters.map((ch, i) => (
            <motion.span
              key={i}
              variants={{ hidden: { y: "105%" }, show: { y: "0%" } }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "inline-block" }}
            >
              {ch}
            </motion.span>
          ))}
        </motion.div>
      </Box>

      {/* Fotos flotando: una detrás de la palabra (desenfocada) y dos delante */}
      <FloatingPhoto
        src={cat.images[1] ?? cat.images[0]}
        progress={scrollYProgress}
        range={[60, -60]}
        blur={3}
        zIndex={1}
        rotate={-4}
        onClick={onSelect}
        sx={{ width: { xs: "34vw", md: "15vw" }, left: { xs: "6%", md: "auto" }, right: { md: "34%" }, top: { xs: "36%", md: "40%" } }}
      />
      <FloatingPhoto
        src={cat.images[0]}
        progress={scrollYProgress}
        range={[160, -160]}
        zIndex={3}
        rotate={3}
        onClick={onSelect}
        sx={{ width: { xs: "48vw", md: "21vw" }, right: { xs: "6%", md: "9%" }, top: { xs: "26%", md: "12%" } }}
      />
      <FloatingPhoto
        src={cat.images[2] ?? cat.images[0]}
        progress={scrollYProgress}
        range={[240, -120]}
        zIndex={3}
        rotate={-2}
        onClick={onSelect}
        sx={{ display: { xs: "none", md: "block" }, width: "14vw", right: "22%", bottom: "-4%" }}
      />

      {/* Texto + botón */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, delay: 0.3 }}
      >
        <Box
          sx={{
            position: "absolute",
            zIndex: 4,
            left: { xs: "6%", md: "5%" },
            right: { xs: "6%", md: "auto" },
            bottom: { xs: "7%", md: "12%" },
            maxWidth: { md: 340 },
          }}
        >
          <Box sx={{ fontFamily: mono, fontSize: "0.7rem", letterSpacing: "0.35em", color: "rgba(255,255,255,0.55)", mb: 2 }}>
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </Box>
          <Box sx={{ fontFamily: grotesk, fontSize: { xs: "0.85rem", md: "0.9rem" }, lineHeight: 1.6, color: "rgba(255,255,255,0.85)", mb: 1.5 }}>
            {cat.description}
          </Box>
          <Box sx={{ fontFamily: mono, fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", lineHeight: 1.8, mb: 2.5 }}>
            {cat.series.join(" · ")}
          </Box>
          <Box
            component="button"
            onClick={onSelect}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.8rem",
              background: "transparent",
              color: "white",
              border: "1px solid rgba(255,255,255,0.6)",
              padding: "0.6rem 1.2rem",
              fontFamily: mono,
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "background 0.3s, color 0.3s",
              "&:hover": { background: "white", color: "black" },
            }}
          >
            Ver {cat.word} <span aria-hidden>→</span>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
}

// Portada de /portafolio con el mismo lenguaje del flujo: la palabra
// "portafolio" se arma letra por letra, la foto entra con zoom y al bajar
// se encoge y oscurece, y un índice lleva directo a cada categoría.
export function PortfolioHero({
  image,
  categories,
  onSelect,
}: {
  image: string;
  categories: FlowCategory[];
  onSelect: (id: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const imgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.25]);
  const wordX = useTransform(scrollYProgress, [0, 1], ["0%", "-28%"]);
  const letters = Array.from("portafolio");

  return (
    <Box
      ref={ref}
      component="section"
      sx={{
        position: "relative",
        height: { xs: "100svh", md: "calc(100vh + 60px)" },
        marginTop: { xs: 0, md: "-60px" },
        overflow: "hidden",
        backgroundColor: "#000",
        color: "white",
        letterSpacing: 0,
        textTransform: "none",
      }}
    >
      {/* Foto: zoom de entrada + se encoge al hacer scroll */}
      <motion.div style={{ position: "absolute", inset: 0, scale: imgScale, opacity: imgOpacity }}>
        <motion.div
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "absolute", inset: 0 }}
        >
          <Image src={image} alt="Portafolio Ale Vázquez" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
        </motion.div>
      </motion.div>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* Subtítulo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <Box
          sx={{
            position: "absolute",
            zIndex: 3,
            left: { xs: "6%", md: "5%" },
            right: { xs: "6%", md: "auto" },
            bottom: { xs: "calc(12% + 26vw)", md: "calc(8% + 16vw)" },
            fontFamily: mono,
            fontSize: { xs: "0.62rem", md: "0.72rem" },
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.75)",
            lineHeight: 1.8,
          }}
        >
          Ale Vázquez — Artista Visual | Diseñadora Gráfica | Modelo | Fotógrafa
        </Box>
      </motion.div>

      {/* Índice de categorías (escritorio) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
      >
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            position: "absolute",
            zIndex: 3,
            right: "5%",
            top: "22%",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "0.9rem",
          }}
        >
          {categories.map((cat, i) => (
            <Box
              key={cat.id}
              component="button"
              onClick={() => onSelect(cat.id)}
              sx={{
                background: "none",
                border: 0,
                color: "rgba(255,255,255,0.8)",
                cursor: "pointer",
                fontFamily: mono,
                fontSize: "0.75rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                padding: 0,
                transition: "color 0.2s, transform 0.2s",
                "&:hover": { color: "white", transform: "translateX(-6px)" },
              }}
            >
              {String(i + 1).padStart(2, "0")} · {cat.word}
            </Box>
          ))}
        </Box>
      </motion.div>

      {/* Palabra gigante */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          zIndex: 2,
          left: { xs: "4%", md: "2%" },
          bottom: { xs: "12%", md: "7%" },
          fontFamily: grotesk,
          fontWeight: 800,
          fontSize: { xs: "26vw", md: "16vw" },
          lineHeight: 0.85,
          letterSpacing: "-0.055em",
        }}
      >
        <motion.div
          style={{ x: wordX, display: "flex", whiteSpace: "nowrap", overflow: "hidden", paddingBottom: "0.08em" }}
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.3 } } }}
        >
          {letters.map((ch, i) => (
            <motion.span
              key={i}
              variants={{ hidden: { y: "105%" }, show: { y: "0%" } }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "inline-block" }}
            >
              {ch}
            </motion.span>
          ))}
        </motion.div>
      </Box>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        style={{ position: "absolute", zIndex: 3, left: "50%", bottom: "2.5%", translateX: "-50%" }}
      >
        <Box sx={{ position: "relative", width: "1px", height: 40, background: "rgba(255,255,255,0.2)", overflow: "hidden" }}>
          <motion.div
            animate={{ y: ["-100%", "220%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
            style={{ position: "absolute", left: 0, width: 1, height: 16, background: "white" }}
          />
        </Box>
      </motion.div>
    </Box>
  );
}

export default function CategoryFlow({
  categories,
  onSelect,
}: {
  categories: FlowCategory[];
  onSelect: (id: string) => void;
}) {
  return (
    <Box>
      {categories.map((cat, i) => (
        <FlowSection key={cat.id} cat={cat} index={i} total={categories.length} onSelect={() => onSelect(cat.id)} />
      ))}
    </Box>
  );
}
