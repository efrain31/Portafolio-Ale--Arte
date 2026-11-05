"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Box } from "@mui/material";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
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
          top: { xs: 64, md: 0 },
          borderRadius: { md: "10px 10px 0 0" },
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



// Íconos de app estilo iOS dibujados en SVG (100×100, a sangre)
const AppIcon = {
  finder: (
    <svg viewBox="0 0 100 100" aria-hidden>
      <defs>
        <linearGradient id="fdL" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8fd8ff" /><stop offset="1" stopColor="#2b9bf4" /></linearGradient>
        <linearGradient id="fdR" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f2f6fb" /><stop offset="1" stopColor="#c9d6e6" /></linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#fdR)" />
      <path d="M0 0 H56 Q46 30 52 50 Q46 72 54 100 H0 Z" fill="url(#fdL)" />
      <rect x="30" y="30" width="5" height="14" rx="2.5" fill="#1b2a3a" />
      <rect x="66" y="30" width="5" height="14" rx="2.5" fill="#1b2a3a" />
      <path d="M24 66 Q50 84 78 66" fill="none" stroke="#1b2a3a" strokeWidth="4.5" strokeLinecap="round" />
    </svg>
  ),
  launchpad: (
    <svg viewBox="0 0 100 100" aria-hidden>
      <defs><linearGradient id="lpBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f4f4f7" /><stop offset="1" stopColor="#c8c8ce" /></linearGradient></defs>
      <rect width="100" height="100" fill="url(#lpBg)" />
      {[["#ff5e57", "#ffb340", "#ffd60a"], ["#34c759", "#30b0c7", "#0a84ff"], ["#5e5ce6", "#bf5af2", "#ff375f"]].map((row, r) =>
        row.map((c, k) => <rect key={`${r}${k}`} x={20 + k * 22} y={20 + r * 22} width="16" height="16" rx="4.5" fill={c} />)
      )}
    </svg>
  ),
  safari: (
    <svg viewBox="0 0 100 100" aria-hidden>
      <defs>
        <linearGradient id="sfBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#e3e7ee" /></linearGradient>
        <linearGradient id="sfDial" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4cc4ff" /><stop offset="1" stopColor="#1665e8" /></linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#sfBg)" />
      <circle cx="50" cy="50" r="38" fill="url(#sfDial)" />
      {Array.from({ length: 36 }).map((_, i) => {
        const a = (i * 10 * Math.PI) / 180;
        const r1 = i % 3 === 0 ? 30 : 33;
        // Redondeado: Node y el navegador difieren en el último decimal de
        // cos/sin, y eso rompía la hidratación (atributos distintos)
        const pt = (r: number, f: (x: number) => number) => (50 + f(a) * r).toFixed(2);
        return <line key={i} x1={pt(r1, Math.cos)} y1={pt(r1, Math.sin)} x2={pt(36, Math.cos)} y2={pt(36, Math.sin)} stroke="white" strokeWidth={i % 3 === 0 ? 1.6 : 0.9} opacity="0.85" />;
      })}
      <polygon points="50,50 72,28 55,55" fill="#ff3b30" />
      <polygon points="50,50 28,72 45,45" fill="#ffffff" />
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 100 100" aria-hidden>
      <defs>
        <linearGradient id="stBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#b9b9be" /><stop offset="1" stopColor="#6e6e74" /></linearGradient>
        <radialGradient id="stGear" cx="0.5" cy="0.4" r="0.6"><stop offset="0" stopColor="#d9d9de" /><stop offset="1" stopColor="#8a8a90" /></radialGradient>
      </defs>
      <rect width="100" height="100" fill="url(#stBg)" />
      <g transform="translate(50 50)">
        {Array.from({ length: 12 }).map((_, i) => <rect key={i} x="-4.5" y="-37" width="9" height="12" rx="2" fill="#3f3f44" transform={`rotate(${i * 30})`} />)}
        <circle r="28" fill="#3f3f44" />
        <circle r="24" fill="url(#stGear)" />
        <circle r="14" fill="#55555b" />
        <circle r="8" fill="#9a9aa0" />
      </g>
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 100 100" aria-hidden>
      <defs>
        <radialGradient id="igBg" cx="0.3" cy="1.05" r="1.2"><stop offset="0" stopColor="#ffd776" /><stop offset="0.25" stopColor="#f3a150" /><stop offset="0.5" stopColor="#e1306c" /><stop offset="0.8" stopColor="#a334c4" /><stop offset="1" stopColor="#5851db" /></radialGradient>
      </defs>
      <rect width="100" height="100" fill="url(#igBg)" />
      <rect x="22" y="22" width="56" height="56" rx="17" fill="none" stroke="white" strokeWidth="6" />
      <circle cx="50" cy="50" r="13" fill="none" stroke="white" strokeWidth="6" />
      <circle cx="66.5" cy="33.5" r="4" fill="white" />
    </svg>
  ),
  camera: (
    <svg viewBox="0 0 100 100" aria-hidden>
      <defs>
        <linearGradient id="cmBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ff6b5e" /><stop offset="1" stopColor="#c4271d" /></linearGradient>
        <radialGradient id="cmLens" cx="0.4" cy="0.35" r="0.7"><stop offset="0" stopColor="#6b7a96" /><stop offset="0.5" stopColor="#1d2433" /><stop offset="1" stopColor="#05070c" /></radialGradient>
      </defs>
      <rect width="100" height="100" fill="url(#cmBg)" />
      <rect x="16" y="32" width="68" height="44" rx="9" fill="#f2f2f4" />
      <rect x="38" y="24" width="24" height="12" rx="4" fill="#f2f2f4" />
      <circle cx="50" cy="54" r="16" fill="#cfcfd4" />
      <circle cx="50" cy="54" r="12" fill="url(#cmLens)" />
      <circle cx="46" cy="50" r="3" fill="white" opacity="0.7" />
      <circle cx="73" cy="40" r="3" fill="#ffcc00" />
    </svg>
  ),
  trash: (
    <svg viewBox="0 0 100 100" aria-hidden>
      <defs>
        <linearGradient id="trBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="rgba(255,255,255,0.55)" /><stop offset="1" stopColor="rgba(255,255,255,0.15)" /></linearGradient>
        <linearGradient id="trBin" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#d7dbe2" /><stop offset="0.5" stopColor="#ffffff" /><stop offset="1" stopColor="#b9bec8" /></linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#trBg)" />
      <path d="M28 26 H72 L67 84 Q66 88 62 88 H38 Q34 88 33 84 Z" fill="url(#trBin)" opacity="0.92" />
      <ellipse cx="50" cy="26" rx="23" ry="5" fill="#eef1f5" stroke="#aab0bb" strokeWidth="1" />
      {[38, 44, 50, 56, 62].map((x) => <line key={x} x1={x} y1="33" x2={x + (x - 50) * 0.08} y2="82" stroke="#a7adb8" strokeWidth="1.4" />)}
    </svg>
  ),
};

// Dock estilo macOS con efecto lupa (íconos con enlaces reales)
function DockIcon({ mouseX, base, label, href, external, active, bg, color = "white", children }: { mouseX: MotionValue<number>; base: number; label: string; href?: string; external?: boolean; active?: boolean; bg: string; color?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const distance = useTransform(mouseX, (x) => {
    const r = ref.current?.getBoundingClientRect();
    return r ? x - (r.left + r.width / 2) : 9999;
  });
  const size = useSpring(useTransform(distance, [-130, 0, 130], [base, base * 1.55, base]), { stiffness: 260, damping: 20 });
  const [hover, setHover] = useState(false);
  const tile = (
    <Box sx={{ position: "relative", width: "100%", height: "100%", borderRadius: "22.5%", overflow: "hidden", background: bg, color, boxShadow: "0 5px 12px rgba(0,0,0,0.4)", "& > svg": { display: "block", width: "100%", height: "100%" } }}>
      {children}
      {/* Brillo superior estilo iOS */}
      <Box aria-hidden sx={{ position: "absolute", inset: 0, borderRadius: "inherit", background: "linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 45%)", boxShadow: "inset 0 0 0 0.5px rgba(255,255,255,0.35)", pointerEvents: "none" }} />
    </Box>
  );
  return (
    <Box sx={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <AnimatePresence>
        {hover && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} style={{ position: "absolute", bottom: "calc(100% + 12px)", whiteSpace: "nowrap", fontSize: "0.72rem", color: "white", background: "rgba(30,30,32,0.9)", padding: "0.25rem 0.6rem", borderRadius: "6px", pointerEvents: "none" }}>
            {label}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div ref={ref} style={{ width: size, height: size }}>
        {href ? (
          <Box component="a" href={href} aria-label={label} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} sx={{ display: "block", width: "100%", height: "100%" }}>{tile}</Box>
        ) : (
          <Box aria-label={label} sx={{ width: "100%", height: "100%" }}>{tile}</Box>
        )}
      </motion.div>
      <Box sx={{ width: 4, height: 4, borderRadius: "50%", background: active ? "rgba(255,255,255,0.85)" : "transparent", mt: "4px" }} />
    </Box>
  );
}

function MacDock({ isDesktop }: { isDesktop: boolean }) {
  const mouseX = useMotionValue(Infinity);
  const base = isDesktop ? 50 : 38;
  const sep = <Box sx={{ width: "1px", alignSelf: "stretch", my: "6px", mb: "14px", background: "rgba(255,255,255,0.3)" }} />;
  return (
    <Box
      component={motion.div}
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.5, ease }}
      sx={{ position: { xs: "relative", md: "absolute" }, left: 0, right: 0, bottom: { md: 16 }, mt: { xs: 4, md: 0 }, zIndex: 30, display: "flex", justifyContent: "center", pointerEvents: "none" }}
    >
      <Box
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        sx={{
          pointerEvents: "auto",
          display: "flex",
          alignItems: "flex-end",
          gap: { xs: 0.9, md: 1.3 },
          padding: "8px 10px 2px",
          borderRadius: "20px",
          background: "rgba(210,195,175,0.28)",
          backdropFilter: "blur(24px) saturate(160%)",
          WebkitBackdropFilter: "blur(24px) saturate(160%)",
          border: "1px solid rgba(255,255,255,0.22)",
          boxShadow: "0 18px 40px rgba(0,0,0,0.45)",
          maxWidth: "calc(100vw - 24px)",
        }}
      >
        <DockIcon mouseX={mouseX} base={base} label="Inicio" href="/" bg="transparent">{AppIcon.finder}</DockIcon>
        <DockIcon mouseX={mouseX} base={base} label="Portafolio" href="/portafolio" bg="transparent">{AppIcon.launchpad}</DockIcon>
        <DockIcon mouseX={mouseX} base={base} label="Galería" href="/galeria" bg="transparent">{AppIcon.safari}</DockIcon>
        <DockIcon mouseX={mouseX} base={base} label="Contacto" href="/info/contact" bg="transparent">{AppIcon.settings}</DockIcon>
        {sep}
        <DockIcon mouseX={mouseX} base={base} label="Instagram" href="https://www.instagram.com" external bg="transparent">{AppIcon.instagram}</DockIcon>
        <DockIcon mouseX={mouseX} base={base} label="Sobre mí" href="/info/about" active bg="transparent">{AppIcon.camera}</DockIcon>
        {sep}
        <DockIcon mouseX={mouseX} base={base} label="Papelera" bg="transparent">{AppIcon.trash}</DockIcon>
      </Box>
    </Box>
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
        paddingTop: { xs: "8rem", md: "6.5rem" },
        paddingBottom: { xs: "3rem", md: "5rem" },
      }}
    >
      {/* ——— Laptop (sólo escritorio): marco con notch, pantalla y base ——— */}
      <Box sx={{ position: { xs: "static", md: "relative" }, maxWidth: { md: 1260 }, mx: "auto", px: { md: 3 } }}>
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease }}
        sx={{
          position: { xs: "static", md: "relative" },
          background: { md: "linear-gradient(180deg, #2b2b2e, #161618)" },
          borderRadius: { md: "28px 28px 12px 12px" },
          padding: { md: "16px" },
          boxShadow: { md: "0 0 0 1px rgba(255,255,255,0.08), 0 40px 140px rgba(26,107,255,0.14)" },
        }}
      >
        {/* Notch con cámara */}
        <Box aria-hidden sx={{ display: { xs: "none", md: "flex" }, position: "absolute", top: 16, left: "50%", transform: "translateX(-50%)", width: 170, height: 26, background: "#161618", borderRadius: "0 0 12px 12px", zIndex: 35, alignItems: "center", justifyContent: "center" }}>
          <Box sx={{ width: 8, height: 8, borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, #3a4a66, #0b0f18)" }} />
        </Box>
        {/* Pantalla (overflow visible: algunas piezas "salen" de ella) */}
        <Box
          sx={{
            position: { xs: "static", md: "relative" },
            borderRadius: { md: "10px" },
            background: { md: "radial-gradient(ellipse at 50% 15%, #1d1d20 0%, #0d0d0f 60%, #060607 100%)" },
            paddingTop: { md: "5.5rem" },
            paddingBottom: { md: "7.5rem" },
          }}
        >
        {/* Encendido de pantalla */}
        <Box component={motion.div} aria-hidden initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.9, delay: 0.5 }} sx={{ display: { xs: "none", md: "block" }, position: "absolute", inset: 0, background: "#000", borderRadius: "10px", zIndex: 60, pointerEvents: "none" }} />

      {/* Barra de menú estilo Mac */}
      <MacMenuBar />

      {/* Selector de idioma */}
      <Box sx={{ position: "absolute", top: { xs: "6.6rem", md: "3rem" }, right: { xs: 16, md: 24 }, zIndex: 20, display: "flex", gap: 0.5 }}>
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
        <Box sx={{ position: { xs: "relative", md: "absolute" }, left: { md: "-5%" }, top: { md: 0 }, display: "flex", gap: { xs: 1, md: 1.5 }, zIndex: 5 }}>
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
          <Folder href="/portafolio?category=modelaje" label="MODELAJE" delay={2.3} sx={{ left: { md: "70%" }, top: { md: 175 } }} />
          <Folder href="/portafolio?category=fotografia" label="FOTOGRAFÍA" delay={2.45} sx={{ left: { md: "1%" }, top: { md: 220 } }} />
          <Folder href={`/portafolio?category=${encodeURIComponent("diseño")}`} label="DISEÑO" delay={2.6} sx={{ left: { md: "1%" }, top: { md: 365 } }} />
        </Box>

        {/* Resultado (seleccionado) */}
        <MacWindow title="MODELO.JPG" dots="blue" selected delay={2.2} drag={isDesktop} constraints={stageRef} sx={{ left: { md: "84%" }, top: { md: 120 }, zIndex: 8, width: { xs: 240, md: 220 } }}>
          <Box component="img" src={IMG.result} alt="" draggable={false} sx={{ display: "block", width: "100%", height: { xs: 280, md: 250 }, objectFit: "cover", objectPosition: "center 20%" }} />
        </MacWindow>

        {/* Detalle */}
        <MacWindow title="DETALLE.JPG" dots="blue" delay={2.5} drag={isDesktop} constraints={stageRef} sx={{ left: { md: "-6%" }, top: { md: 560 }, zIndex: 8, width: { xs: 240, md: 190 }, display: { xs: "none", md: "block" } }}>
          <Box component="img" src={IMG.detail} alt="" draggable={false} sx={{ display: "block", width: "100%", height: 190, objectFit: "cover" }} />
        </MacWindow>

        {/* Lista con palomitas */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.6, duration: 0.8, ease }}
          sx={{ position: { xs: "relative", md: "absolute" }, left: { md: "74%" }, top: { md: 470 }, zIndex: 8, width: { xs: "100%", md: 300 }, maxWidth: 360 }}
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

        {/* Dock */}
        <MacDock isDesktop={isDesktop} />
        </Box>
      </Box>
      {/* Base de la laptop */}
      <Box aria-hidden sx={{ display: { xs: "none", md: "block" }, position: "relative", height: 20, mx: "-3%", background: "linear-gradient(180deg, #e4e4e7, #97979d)", borderRadius: "2px 2px 24px 24px", boxShadow: "0 30px 60px rgba(0,0,0,0.7)" }}>
        <Box sx={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 170, height: 7, background: "#7b7b81", borderRadius: "0 0 10px 10px" }} />
      </Box>
      </Box>
    </Box>
  );
}
