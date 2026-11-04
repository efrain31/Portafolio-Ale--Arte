"use client";

import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// PROPUESTA (temporal): portada de presentación del portafolio en móvil.
// Se elige la variante con ?intro=a | b | c en /galeria. Al decidir una,
// se deja sólo esa y se quita el selector por query.
type Variant = "a" | "b" | "c";

const serif = "'Cormorant Garamond', serif";
const mono = "'Inconsolata', monospace";

// Indicadores de "desliza" (PROPUESTA): se eligen con &cue=1..4
type Cue = "0" | "1" | "2" | "3" | "4";
const cueLabel = { fontFamily: mono, fontSize: "0.62rem", letterSpacing: "0.4em", color: "rgba(255,255,255,0.6)" } as const;

function ScrollCue({ cue = "0" }: { cue?: Cue }) {
  // 1 — Flecha fina que baja y se desvanece en bucle
  if (cue === "1") {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.2rem" }}>
        {[0, 1].map((i) => (
          <motion.svg
            key={i}
            width="22"
            height="12"
            viewBox="0 0 22 12"
            animate={{ opacity: [0, 1, 0], y: [-4, 4, 8] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
          >
            <path d="M1 1 L11 11 L21 1" fill="none" stroke="white" strokeWidth="1" />
          </motion.svg>
        ))}
      </div>
    );
  }

  // 2 — Texto circular girando alrededor de una flecha (estilo editorial)
  if (cue === "2") {
    const text = "DESLIZA · VER TRABAJOS · ";
    return (
      <div style={{ position: "relative", width: 96, height: 96 }}>
        <motion.svg
          viewBox="0 0 100 100"
          width="96"
          height="96"
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          style={{ position: "absolute", inset: 0 }}
        >
          <defs>
            <path id="cue-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
          </defs>
          <text fill="rgba(255,255,255,0.7)" style={{ fontFamily: mono, fontSize: 9.2, letterSpacing: "0.22em" }}>
            <textPath href="#cue-circle" textLength="236" lengthAdjust="spacing">{text}</textPath>
          </text>
        </motion.svg>
        <motion.svg
          width="14"
          height="22"
          viewBox="0 0 14 22"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", left: 41, top: 37 }}
        >
          <path d="M7 0 V20 M1 14 L7 20 L13 14" fill="none" stroke="white" strokeWidth="1" />
        </motion.svg>
      </div>
    );
  }

  // 3 — Riel vertical con una luz que recorre hacia abajo
  if (cue === "3") {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.8rem" }}>
        <span style={cueLabel}>DESLIZA PARA VER</span>
        <div style={{ position: "relative", width: 1, height: 56, background: "rgba(255,255,255,0.18)", overflow: "hidden" }}>
          <motion.div
            animate={{ y: ["-100%", "220%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
            style={{ position: "absolute", left: 0, width: 1, height: 22, background: "white" }}
          />
        </div>
      </div>
    );
  }

  // 4 — Pastilla tipo "scroll" con un punto que baja
  if (cue === "4") {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.8rem" }}>
        <div style={{ position: "relative", width: 22, height: 36, border: "1px solid rgba(255,255,255,0.6)", borderRadius: 12 }}>
          <motion.div
            animate={{ y: [0, 12], opacity: [1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
            style={{ position: "absolute", left: 9, top: 7, width: 3, height: 6, borderRadius: 2, background: "white" }}
          />
        </div>
        <span style={cueLabel}>DESLIZA</span>
      </div>
    );
  }

  // 0 — Actual: texto + línea que flota
  return (
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem" }}
    >
      <span style={cueLabel}>DESLIZA</span>
      <span style={{ width: 1, height: 36, background: "rgba(255,255,255,0.5)" }} />
    </motion.div>
  );
}

// A — Portada editorial: pantalla negra tipo índice de revista.
function CoverA({ cue }: { cue: Cue }) {
  return (
    <Box
      sx={{
        display: { xs: "flex", md: "none" },
        height: "100svh",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "center",
        background: "#000",
        color: "white",
        padding: "5.5rem 1.5rem 2.5rem",
      }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1 }}
        style={{ fontFamily: mono, fontSize: "0.7rem", letterSpacing: "0.45em" }}
      >
        ALE VÁZQUEZ — {new Date().getFullYear()}
      </motion.span>

      <Box>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ margin: 0, fontFamily: serif, fontStyle: "italic", fontWeight: 300, fontSize: "4.2rem", lineHeight: 1, textTransform: "none", letterSpacing: 0 }}
        >
          Portafolio
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{ height: 1, background: "rgba(255,255,255,0.5)", margin: "1.5rem auto", width: 120 }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          style={{ display: "flex", flexDirection: "column", gap: "0.7rem", fontFamily: mono, fontSize: "0.75rem", letterSpacing: "0.35em", color: "rgba(255,255,255,0.75)" }}
        >
          <span>01 · MODELAJE</span>
          <span>02 · FOTOGRAFÍA</span>
          <span>03 · DISEÑO</span>
        </motion.div>
      </Box>

      <ScrollCue cue={cue} />
    </Box>
  );
}

// B — Portada con foto: imagen completa oscurecida con el título encima.
function CoverB({ cue }: { cue: Cue }) {
  return (
    <Box sx={{ display: { xs: "block", md: "none" }, position: "relative", height: "100svh", overflow: "hidden", background: "#000" }}>
      <motion.div
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: "easeOut" }}
        style={{ position: "absolute", inset: 0 }}
      >
        <Image
          src="/images/dataale/SOBREMI/SHOOTINGS/SOLUNA/Estrella-1.jpg"
          alt="Portafolio Ale Vázquez"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </motion.div>
      <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.85) 100%)" }} />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          padding: "0 1.5rem 2.5rem",
          color: "white",
        }}
      >
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 0.75, x: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          style={{ fontFamily: mono, fontSize: "0.7rem", letterSpacing: "0.45em" }}
        >
          SELECCIÓN DE TRABAJOS
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ margin: "0.4rem 0 1.8rem", fontFamily: serif, fontWeight: 600, fontSize: "3.6rem", lineHeight: 1, textTransform: "none", letterSpacing: 0 }}
        >
          <em style={{ fontWeight: 300 }}>El </em>Portafolio
        </motion.h1>
        <Box sx={{ alignSelf: "center" }}>
          <ScrollCue cue={cue} />
        </Box>
      </Box>
    </Box>
  );
}

// C — Intro animada: cortina negra que presenta y se retira sola (~2.6s).
function CoverC() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 2600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro-c"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          onClick={() => setShow(false)}
          className="portfolio-intro-c"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "#000",
            color: "white",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: "1.2rem",
          }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.6 }}
            style={{ fontFamily: mono, fontSize: "0.7rem", letterSpacing: "0.45em" }}
          >
            ALE VÁZQUEZ
          </motion.span>
          <Box sx={{ overflow: "hidden" }}>
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ margin: 0, fontFamily: serif, fontStyle: "italic", fontWeight: 300, fontSize: "4rem", lineHeight: 1.05, textTransform: "none", letterSpacing: 0 }}
            >
              Portafolio
            </motion.h1>
          </Box>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 140 }}
            transition={{ duration: 1.4, delay: 0.8, ease: "easeInOut" }}
            style={{ height: 1, background: "white" }}
          />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            style={{ fontFamily: mono, fontSize: "0.65rem", letterSpacing: "0.35em" }}
          >
            MODELAJE · FOTOGRAFÍA · DISEÑO
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function PortfolioCover() {
  const [variant, setVariant] = useState<Variant | null>(null);
  const [cue, setCue] = useState<Cue>("0");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const v = params.get("intro");
    setVariant(v === "b" || v === "c" ? v : "a");
    const c = params.get("cue");
    if (c && ["1", "2", "3", "4"].includes(c)) setCue(c as Cue);
  }, []);

  if (variant === "a") return <CoverA cue={cue} />;
  if (variant === "b") return <CoverB cue={cue} />;
  if (variant === "c") return <CoverC />;
  return null;
}
