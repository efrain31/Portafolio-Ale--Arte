"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import WifiIcon from "@mui/icons-material/Wifi";
import BatteryFullIcon from "@mui/icons-material/BatteryFull";
import SearchIcon from "@mui/icons-material/Search";

// "Sobre mí" con estética editorial clara (referencia: póster de presets):
// titular gigante con una palabra "seleccionada" (recuadro azul con
// tiradores y cursor), miniaturas tipo archivo, nota escrita a mano,
// ventanas de foto estilo macOS que se pueden arrastrar, menú contextual,
// carpetas azules, lista con palomitas y un botón azul grande.

const sans = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const hand = "'Caveat', cursive";
const blue = "#1a6bff";
const ink = "#111"; // texto oscuro dentro de tarjetas y ventanas claras
const fg = "#f5f5f5"; // texto claro sobre el fondo negro
const noteBlue = "#5b95ff";
const ease = [0.22, 1, 0.36, 1] as const;

const TEXT = {
  es: {
    hello: "Hola, soy",
    sub: ["artista visual, diseñadora", "gráfica, modelo y fotógrafa"],
    note: ["El arte es producto", "de la espiritualidad"],
    statement:
      "A través del arte es como nos conectamos con las demás personas y con nosotros mismos.",
    checks: ["Capturar y transmitir emociones", "La observación por el detalle", "Diseño e ilustración", "Modelaje y fotografía"],
    menu: ["Copiar enlace", "Compartir…", "Ver portafolio"],
    cta: "VER PORTAFOLIO",
    cv: "Descargar CV",
    copied: "¡Enlace copiado!",
  },
  en: {
    hello: "Hi, I'm",
    sub: ["visual artist, graphic", "designer, model and photographer"],
    note: ["Art is a product", "of spirituality"],
    statement: "Through art, we connect with others and with ourselves.",
    checks: ["Capturing and conveying emotions", "Attention to detail", "Design & illustration", "Modeling & photography"],
    menu: ["Copy link", "Share…", "View portfolio"],
    cta: "VIEW PORTFOLIO",
    cv: "Download CV",
    copied: "Link copied!",
  },
};

const IMG = {
  main: "/images/aleabout.jpg",
  result: "/images/dataale/SOBREMI/SHOOTINGS/STUDIO7/STUDIO1.jpg",
  detail: "/images/dataale/SOBREMI/SHOOTINGS/CANTADRINK/3.jpg",
  thumbs: [
    { src: "/images/dataale/SOBREMI/SHOOTINGS/MARUATHA/1.jpg", name: "MARUATHA.JPG", sub: "Maruatha" },
    { src: "/images/dataale/SOBREMI/SHOOTINGS/SOLUNA/Estrella-1.jpg", name: "SOLUNA.JPG", sub: "Sol & Luna" },
    { src: "/images/dataale/SOBREMI/SHOOTINGS/PROYECTOCATRINA/1.jpg", name: "CATRINA.JPG", sub: "Proyecto Catrina" },
  ],
};

// Cursor tipo flecha (blanco con borde negro)
function Cursor({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.13} viewBox="0 0 30 34" aria-hidden style={{ filter: "drop-shadow(0 3px 4px rgba(0,0,0,0.25))" }}>
      <path d="M3 2 L3 27 L9.5 21 L14 31 L18.5 29 L14 19.5 L23 19.5 Z" fill="white" stroke="black" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

// Ventana estilo macOS (arrastrable en escritorio)
function MacWindow({
  title,
  children,
  delay,
  drag,
  constraints,
  sx,
  dots = "traffic",
  selected = false,
}: {
  title: string;
  children: ReactNode;
  delay: number;
  drag: boolean;
  constraints: React.RefObject<HTMLDivElement | null>;
  sx?: object;
  dots?: "traffic" | "blue";
  selected?: boolean;
}) {
  return (
    <Box
      component={motion.div}
      drag={drag}
      // Sin dragConstraints: al redimensionar la ventana del navegador,
      // los límites se recalculan y movían las ventanas solas.
      dragMomentum={false}
      dragElastic={0.1}
      whileDrag={{ scale: 1.03, zIndex: 40, cursor: "grabbing" }}
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 170, damping: 20, delay }}
      sx={{ position: { xs: "relative", md: "absolute" }, cursor: drag ? "grab" : "default", touchAction: drag ? "none" : "auto", ...sx }}
    >
      <Box sx={{ position: "relative", background: "#f4f4f4", border: "1px solid #d5d5d5", borderRadius: "6px", boxShadow: "0 18px 40px rgba(0,0,0,0.12)", overflow: "visible" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 10px", borderBottom: "1px solid #ddd" }}>
          {dots === "traffic"
            ? ["#ff5f57", "#febc2e", "#28c840"].map((c) => <Box key={c} sx={{ width: 11, height: 11, borderRadius: "50%", background: c }} />)
            : [0, 1].map((i) => <Box key={i} sx={{ width: 9, height: 9, borderRadius: "50%", background: blue }} />)}
          <Box sx={{ fontSize: "0.72rem", letterSpacing: "0.04em", color: "#333", ml: 1 }}>{title}</Box>
        </Box>
        <Box sx={{ padding: "6px" }}>{children}</Box>
        {/* Tiradores de selección */}
        {selected &&
          [
            { left: -6, top: 30 },
            { right: -6, top: 30 },
            { left: -6, bottom: -6 },
            { right: -6, bottom: -6 },
          ].map((pos, i) => (
            <motion.span
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: delay + 0.5 + i * 0.06, type: "spring", stiffness: 400 }}
              style={{ position: "absolute", width: 11, height: 11, background: "white", border: `2px solid ${blue}`, ...pos }}
            />
          ))}
      </Box>
    </Box>
  );
}

function Folder({ href, label, sx, delay }: { href: string; label: string; sx: object; delay: number }) {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, scale: 0.4, rotate: -8 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 14, delay }}
      sx={{ position: { xs: "relative", md: "absolute" }, zIndex: 6, ...sx }}
    >
      <Box component={Link} href={href} aria-label={label} sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5, textDecoration: "none", color: fg, "&:hover svg": { transform: "translateY(-4px)" } }}>
        <svg width="92" height="70" viewBox="0 0 100 76" aria-hidden style={{ transition: "transform 0.25s", filter: "drop-shadow(0 10px 14px rgba(26,107,255,0.25))" }}>
          <path d="M4 10 Q4 4 10 4 H36 Q40 4 43 8 L47 13 H90 Q96 13 96 19 V24 H4 Z" fill="#2f8bff" />
          <rect x="2" y="20" width="96" height="54" rx="7" fill="#46a0ff" />
        </svg>
        <Box sx={{ fontSize: "0.7rem", letterSpacing: "0.08em" }}>{label}</Box>
      </Box>
    </Box>
  );
}


// Barra de menú estilo macOS: logo, nombre, menús (enlaces reales) y a la
// derecha íconos de estado con fecha y hora en vivo.
function MacMenuBar() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 15_000);
    return () => clearInterval(id);
  }, []);
  const clock = now
    ? `${now.toLocaleDateString("es-MX", { weekday: "short", day: "numeric", month: "short" })}  ${now.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit", hour12: false })}`
    : "";
  const item = {
    color: "rgba(255,255,255,0.92)",
    textDecoration: "none",
    padding: "0.15rem 0.6rem",
    borderRadius: "5px",
    fontSize: "0.82rem",
    "&:hover": { background: blue, color: "white" },
  } as const;
  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.2, ease }}
      style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 30 }}
      className="mac-menubar"
    >
      <Box
        sx={{
          position: "absolute",
          top: { xs: 64, md: 76 },
          left: 0,
          right: 0,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 0.9rem",
          background: "rgba(38,38,40,0.72)",
          backdropFilter: "blur(20px) saturate(160%)",
          WebkitBackdropFilter: "blur(20px) saturate(160%)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          color: "white",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
          <Box component={Link} href="/" aria-label="Inicio" sx={{ ...item, fontWeight: 800, fontSize: "0.9rem" }}>AV</Box>
          <Box sx={{ fontWeight: 700, fontSize: "0.82rem", padding: "0 0.6rem" }}>Ale Vázquez</Box>
          <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", gap: 0.2 }}>
            {[
              ["Sobre mí", "/info/about"],
              ["Portafolio", "/portafolio"],
              ["Galería", "/galeria"],
              ["Contacto", "/info/contact"],
            ].map(([label, href]) => (
              <Box key={href} component={Link} href={href} sx={item}>{label}</Box>
            ))}
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, fontSize: "0.8rem", "& svg": { fontSize: 17 } }}>
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1.2 }}>
            <SearchIcon />
            <WifiIcon />
          </Box>
          <BatteryFullIcon sx={{ transform: "rotate(90deg)" }} />
          <Box sx={{ fontVariantNumeric: "tabular-nums", whiteSpace: "pre", textTransform: "capitalize" }}>{clock}</Box>
        </Box>
      </Box>
    </motion.div>
  );
}

export default function AboutMeHero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [lang, setLang] = useState<"es" | "en">("es");
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState(false);
  const t = TEXT[lang];

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    // El menú contextual aparece cuando el cursor animado "llega"
    const id = setTimeout(() => setMenuOpen(true), 3000);
    return () => {
      mq.removeEventListener("change", update);
      clearTimeout(id);
    };
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/info/about`);
      setToast(true);
      setTimeout(() => setToast(false), 1600);
    } catch {
      /* portapapeles no disponible */
    }
  };
  const share = async () => {
    const url = `${window.location.origin}/info/about`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Ale Vázquez", url });
      } catch {
        /* cancelado */
      }
    } else copyLink();
  };

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        color: fg,
        fontFamily: sans,
        letterSpacing: 0,
        textTransform: "none",
        // Papel claro con textura muy suave
        background: "radial-gradient(ellipse at 50% 15%, #1a1a1c 0%, #0b0b0c 55%, #000 100%)",
        paddingTop: { xs: "8rem", md: "9rem" },
        paddingBottom: { xs: "3rem", md: "4rem" },
      }}
    >
      {/* Barra de menú estilo Mac */}
      <MacMenuBar />

      {/* Selector de idioma */}
      <Box sx={{ position: "absolute", top: { xs: "6.6rem", md: "7.6rem" }, right: { xs: 16, md: 32 }, zIndex: 20, display: "flex", gap: 0.5 }}>
        {(["es", "en"] as const).map((l) => (
          <Box key={l} component="button" onClick={() => setLang(l)} sx={{ border: `1px solid ${fg}`, borderRadius: "999px", padding: "0.2rem 0.65rem", fontSize: "0.72rem", fontWeight: 700, cursor: "pointer", background: lang === l ? fg : "transparent", color: lang === l ? ink : fg }}>
            {l.toUpperCase()}
          </Box>
        ))}
      </Box>

      {/* ——— Titular ——— */}
      <Box sx={{ textAlign: "center", px: 2 }}>
        <Box sx={{ overflow: "hidden" }}>
          <motion.div key={`h-${lang}`} initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.9, ease }}>
            <Box sx={{ fontWeight: 800, fontSize: { xs: "3.4rem", md: "7.5rem" }, lineHeight: 0.95, letterSpacing: "-0.045em" }}>{t.hello}</Box>
          </motion.div>
        </Box>
        <Box sx={{ position: "relative", display: "inline-block", mt: { xs: 1, md: 1.5 } }}>
          {/* Recuadro de selección azul que se dibuja */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7, ease }}
            style={{ position: "absolute", inset: "-4px -14px", background: "rgba(26,107,255,0.28)", border: `2px solid ${blue}`, transformOrigin: "left" }}
          />
          {[
            { left: -22, top: -12 },
            { right: -22, top: -12 },
            { left: -22, bottom: -12 },
            { right: -22, bottom: -12 },
          ].map((pos, i) => (
            <motion.span
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.3 + i * 0.06, type: "spring", stiffness: 420 }}
              style={{ position: "absolute", width: 16, height: 16, background: blue, zIndex: 2, ...pos }}
            />
          ))}
          <Box sx={{ overflow: "hidden", position: "relative" }}>
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.15, ease }}>
              <Box sx={{ fontWeight: 800, fontSize: { xs: "3.4rem", md: "7.5rem" }, lineHeight: 1.02, letterSpacing: "-0.045em", px: { xs: 0.5, md: 1 } }}>Ale Vázquez</Box>
            </motion.div>
          </Box>
          {/* Cursor que llega a la esquina */}
          <motion.div
            initial={{ x: 120, y: 90, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1.5, ease }}
            style={{ position: "absolute", right: -48, bottom: -44, zIndex: 3 }}
          >
            <Cursor size={isDesktop ? 40 : 28} />
          </motion.div>
        </Box>
        <motion.div key={`s-${lang}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.7 }}>
          <Box sx={{ mt: { xs: 2.5, md: 3 }, fontSize: { xs: "1.15rem", md: "1.7rem" }, lineHeight: 1.25 }}>
            {t.sub[0]}
            <br />
            {t.sub[1]}
          </Box>
        </motion.div>
      </Box>

      {/* ——— Composición ——— */}
      <Box
        ref={stageRef}
        sx={{
          position: "relative",
          maxWidth: 1180,
          mx: "auto",
          mt: { xs: 4, md: 5 },
          px: { xs: 2, md: 0 },
          height: { md: 820 },
          display: { xs: "flex", md: "block" },
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        {/* Miniaturas tipo archivo */}
        <Box sx={{ position: { xs: "relative", md: "absolute" }, left: { md: "2%" }, top: { md: 0 }, display: "flex", gap: { xs: 1, md: 1.5 }, zIndex: 5 }}>
          {IMG.thumbs.map((th, i) => (
            <Box
              key={th.name}
              component={motion.div}
              initial={{ opacity: 0, y: -40, rotate: -6 + i * 4 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ type: "spring", stiffness: 160, damping: 16, delay: 1.6 + i * 0.12 }}
            >
              <Box
                component={Link}
                href={`/portafolio?category=modelaje&sub=${encodeURIComponent(th.sub)}`}
                sx={{ display: "block", background: "#f6f6f6", border: "1px solid #d8d8d8", borderRadius: "4px", padding: "6px 6px 8px", boxShadow: "0 8px 18px rgba(0,0,0,0.08)", textDecoration: "none", color: ink, transition: "transform 0.25s", "&:hover": { transform: "translateY(-6px)" } }}
              >
                <Box component="img" src={th.src} alt={th.sub} sx={{ display: "block", width: { xs: 96, md: 118 }, height: { xs: 96, md: 132 }, objectFit: "cover" }} />
                <Box sx={{ fontSize: { xs: "0.6rem", md: "0.7rem" }, mt: 0.8, letterSpacing: "0.04em" }}>{th.name}</Box>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Nota escrita a mano */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, rotate: -14, scale: 0.8 }}
          animate={{ opacity: 1, rotate: -10, scale: 1 }}
          transition={{ delay: 2, type: "spring", stiffness: 150 }}
          sx={{ position: { xs: "relative", md: "absolute" }, left: { md: "60%" }, top: { md: 10 }, zIndex: 5, color: noteBlue }}
        >
          <Box sx={{ position: "relative", padding: "1.4rem 2rem", textAlign: "center", fontFamily: hand, fontSize: { xs: "1.5rem", md: "1.9rem" }, lineHeight: 1.05, fontWeight: 500 }}>
            <svg viewBox="0 0 200 100" preserveAspectRatio="none" aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}>
              <motion.ellipse cx="100" cy="50" rx="98" ry="46" fill="none" stroke={noteBlue} strokeWidth="1.6" vectorEffect="non-scaling-stroke" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 2.1 }} />
            </svg>
            <AnimatePresence mode="wait">
              <motion.div key={lang} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, delay: lang === "es" ? 2.3 : 0 }}>
                {t.note[0]}
                <br />
                {t.note[1]}
              </motion.div>
            </AnimatePresence>
          </Box>
          {/* Flecha dibujada hacia la ventana principal */}
          <Box component="svg" viewBox="0 0 90 60" aria-hidden sx={{ display: { xs: "none", md: "block" }, position: "absolute", left: -70, bottom: -40, width: 90, height: 60, overflow: "visible" }}>
            <motion.path d="M85 5 C 60 10, 30 25, 8 50 M8 50 L 10 36 M8 50 L 22 47" fill="none" stroke={noteBlue} strokeWidth="1.8" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 3 }} />
          </Box>
        </Box>

        {/* Ventana principal */}
        <MacWindow title="ALE.JPG" delay={1.9} drag={isDesktop} constraints={stageRef} sx={{ left: { md: "17%" }, top: { md: 190 }, zIndex: 4, width: { xs: "100%", md: 520 }, maxWidth: { xs: 420, md: "none" } }}>
          <Box sx={{ position: "relative", overflow: "hidden", height: { xs: 380, md: 560 } }}>
            <motion.img
              src={IMG.main}
              alt="Ale Vázquez"
              draggable={false}
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.4, delay: 1.9, ease }}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", display: "block" }}
            />
          </Box>
          {/* Menú contextual */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ position: "absolute", left: isDesktop ? -70 : 12, top: isDesktop ? 90 : 60, zIndex: 10, transformOrigin: "top left" }}
              >
                <Box sx={{ background: "rgba(250,250,250,0.92)", backdropFilter: "blur(14px)", border: "1px solid #ddd", borderRadius: "12px", padding: "6px", width: 220, boxShadow: "0 18px 40px rgba(0,0,0,0.15)", fontSize: "0.92rem" }}>
                  {[
                    { label: toast ? t.copied : t.menu[0], icon: <ContentCopyOutlinedIcon fontSize="small" />, onClick: copyLink },
                    { label: t.menu[1], icon: <IosShareOutlinedIcon fontSize="small" />, onClick: share },
                  ].map((item) => (
                    <Box key={item.label} component="button" onClick={item.onClick} sx={{ display: "flex", alignItems: "center", gap: 1.2, width: "100%", padding: "0.5rem 0.7rem", border: 0, background: "none", borderRadius: "8px", cursor: "pointer", font: "inherit", color: ink, "&:hover": { background: "rgba(0,0,0,0.05)" } }}>
                      {item.icon}
                      {item.label}
                    </Box>
                  ))}
                  <Box component={Link} href="/portafolio" sx={{ display: "flex", alignItems: "center", gap: 1.2, padding: "0.5rem 0.7rem", borderRadius: "8px", background: blue, color: "white", textDecoration: "none", mt: 0.3 }}>
                    <AutoAwesomeOutlinedIcon fontSize="small" />
                    {t.menu[2]}
                  </Box>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
          {/* Cursor animado que va hacia "Ver portafolio" */}
          <motion.div
            initial={{ x: 220, y: 320, opacity: 0 }}
            animate={{ x: isDesktop ? 120 : 160, y: isDesktop ? 200 : 170, opacity: 1 }}
            transition={{ duration: 1.1, delay: 2.4, ease }}
            style={{ position: "absolute", left: 0, top: 0, zIndex: 11, pointerEvents: "none" }}
          >
            <Cursor size={30} />
          </motion.div>
        </MacWindow>

        {/* Carpetas */}
        <Box sx={{ display: { xs: "flex", md: "contents" }, gap: 3, justifyContent: "center" }}>
          <Folder href="/portafolio?category=modelaje" label="MODELAJE" delay={2.3} sx={{ left: { md: "88%" }, top: { md: 170 } }} />
          <Folder href="/portafolio?category=fotografia" label="FOTOGRAFÍA" delay={2.45} sx={{ left: { md: "1%" }, top: { md: 220 } }} />
          <Folder href={`/portafolio?category=${encodeURIComponent("diseño")}`} label="DISEÑO" delay={2.6} sx={{ left: { md: "1%" }, top: { md: 365 } }} />
        </Box>

        {/* Resultado (seleccionado) */}
        <MacWindow title="MODELO.JPG" dots="blue" selected delay={2.2} drag={isDesktop} constraints={stageRef} sx={{ left: { md: "68%" }, top: { md: 150 }, zIndex: 5, width: { xs: 240, md: 220 } }}>
          <Box component="img" src={IMG.result} alt="" draggable={false} sx={{ display: "block", width: "100%", height: { xs: 280, md: 250 }, objectFit: "cover", objectPosition: "center 20%" }} />
        </MacWindow>

        {/* Detalle */}
        <MacWindow title="DETALLE.JPG" dots="blue" delay={2.5} drag={isDesktop} constraints={stageRef} sx={{ left: { md: "2%" }, top: { md: 560 }, zIndex: 5, width: { xs: 240, md: 190 }, display: { xs: "none", md: "block" } }}>
          <Box component="img" src={IMG.detail} alt="" draggable={false} sx={{ display: "block", width: "100%", height: 190, objectFit: "cover" }} />
        </MacWindow>

        {/* Lista con palomitas */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.6, duration: 0.8, ease }}
          sx={{ position: { xs: "relative", md: "absolute" }, left: { md: "66%" }, top: { md: 470 }, zIndex: 5, width: { xs: "100%", md: 300 }, maxWidth: 360 }}
        >
          <Box sx={{ background: "#f4f4f4", color: ink, border: "1px solid #d8d8d8", borderRadius: "8px", padding: "1.1rem 1.2rem", boxShadow: "0 18px 40px rgba(0,0,0,0.1)" }}>
            <AnimatePresence mode="wait">
              <motion.div key={lang} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                <Box sx={{ fontSize: "0.86rem", lineHeight: 1.5, color: "#444", mb: 1.2 }}>{t.statement}</Box>
                {t.checks.map((c, i) => (
                  <Box key={c} sx={{ display: "flex", alignItems: "center", gap: 1.4, py: 0.8 }}>
                    <Box sx={{ width: 26, height: 26, border: `2px solid ${blue}`, borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="16" height="14" viewBox="0 0 16 14" aria-hidden>
                        <motion.path d="M1.5 7.5 L6 12 L14.5 1.5" fill="none" stroke={blue} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 3 + i * 0.25 }} />
                      </svg>
                    </Box>
                    <Box sx={{ fontSize: "0.95rem", lineHeight: 1.25 }}>{c}</Box>
                  </Box>
                ))}
              </motion.div>
            </AnimatePresence>
          </Box>
        </Box>
      </Box>

    </Box>
  );
}
