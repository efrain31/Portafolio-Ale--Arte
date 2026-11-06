"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Box } from "@mui/material";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

// "Sobre mí" editorial (referencia: página "About me" de revista): frase
// pequeña y espaciada arriba, "SOBRE MÍ" gigante en tipografía condensada a
// sangre, foto que se monta sobre las letras y texto justificado a un lado.
// Entradas: la frase se "cierra" (el espaciado se reduce), las letras suben
// una por una, la foto se revela como cortina y los párrafos aparecen en
// cascada. Al hacer scroll, las letras y la foto se mueven a distinto ritmo.

const condensed = "'Anton', 'Bebas Neue', Impact, sans-serif";
const sans = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const mono = "'Inconsolata', monospace";
const bone = "#efeae0";
const ease = [0.22, 1, 0.36, 1] as const;

const TEXT = {
  es: {
    tagline: "Capturando y transmitiendo emociones a través del arte",
    tools: "HERRAMIENTAS",
    title: "SOBRE MÍ",
    paragraphs: [
      "¡Hola! Soy Ale Vázquez, artista visual, diseñadora gráfica, modelo y fotógrafa.",
      "El arte es producto de la espiritualidad. A través de él, es como nos conectamos con las demás personas y con nosotros mismos.",
      "Los dos principales diferenciadores en mis productos artísticos son capturar y transmitir emociones, y la observación por el detalle.",
    ],
    signature: "ALE VÁZQUEZ — ARTISTA VISUAL",
  },
  en: {
    tagline: "Capturing and conveying emotions through art",
    tools: "TOOLS",
    title: "ABOUT ME",
    paragraphs: [
      "Hi! I'm Ale Vázquez, a visual artist, graphic designer, model and photographer.",
      "Art is a product of spirituality. Through it, we connect with others and with ourselves.",
      "The two main differentiators in my artistic work are capturing and conveying emotions, and attention to detail.",
    ],
    signature: "ALE VÁZQUEZ — VISUAL ARTIST",
  },
};


// Herramientas (íconos estilo Adobe: cuadro oscuro con siglas de color)
type Tool = { code: string; name: string; bg: string; fg: string; glyph?: ReactNode };

const TOOLS: Tool[] = [
  { code: "Ps", name: "Photoshop", bg: "#001e36", fg: "#31a8ff" },
  { code: "Ai", name: "Illustrator", bg: "#330000", fg: "#ff9a00" },
  { code: "Ae", name: "After Effects", bg: "#00005b", fg: "#9999ff" },
  { code: "Pr", name: "Premiere Pro", bg: "#2a0634", fg: "#ea77ff" },
  { code: "Id", name: "InDesign", bg: "#49021f", fg: "#ff3366" },
  { code: "Lr", name: "Lightroom", bg: "#001e36", fg: "#31a8ff" },
  // IA: íconos genéricos (no son los logotipos oficiales)
  {
    code: "Claude",
    name: "Claude",
    bg: "#d97757",
    fg: "#f5d9c8",
    glyph: (
      <svg viewBox="0 0 40 40" width="62%" height="62%" aria-hidden>
        {Array.from({ length: 10 }).map((_, i) => (
          <rect key={i} x="18.6" y="3" width="2.8" height="15" rx="1.4" fill="#fff6ef" transform={`rotate(${i * 36} 20 20)`} />
        ))}
      </svg>
    ),
  },
  {
    code: "GPT",
    name: "ChatGPT",
    bg: "#111111",
    fg: "#e8e8e8",
    glyph: (
      <svg viewBox="0 0 40 40" width="64%" height="64%" aria-hidden>
        {Array.from({ length: 6 }).map((_, i) => (
          <rect key={i} x="13" y="6" width="14" height="22" rx="7" fill="none" stroke="#f2f2f2" strokeWidth="2.4" transform={`rotate(${i * 60} 20 20)`} />
        ))}
      </svg>
    ),
  },
  {
    code: "Gemini",
    name: "Gemini",
    bg: "#0d1117",
    fg: "#8ab4f8",
    glyph: (
      <svg viewBox="0 0 40 40" width="66%" height="66%" aria-hidden>
        <defs>
          <linearGradient id="gemGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#4f8df7" />
            <stop offset="0.55" stopColor="#9b72f2" />
            <stop offset="1" stopColor="#d96570" />
          </linearGradient>
        </defs>
        <path d="M20 2 C21.5 12 28 18.5 38 20 C28 21.5 21.5 28 20 38 C18.5 28 12 21.5 2 20 C12 18.5 18.5 12 20 2 Z" fill="url(#gemGrad)" />
      </svg>
    ),
  },
];


// "Patio de juegos" de herramientas: cada ícono es un cuerpo con gravedad,
// rebote contra paredes y choques entre ellos. Se pueden agarrar y aventar,
// y cada tanto alguno brinca para que sigan jugando. Las posiciones se
// calculan sólo en el navegador (el HTML del servidor las deja ocultas).
function ToolsPlayground({ tools }: { tools: Tool[] }) {
  const areaRef = useRef<HTMLDivElement>(null);
  const elRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const area = areaRef.current;
    if (!area) return;
    const R = 31; // radio de choque (ícono de 60px)
    const LABEL = 16; // espacio del nombre debajo del ícono
    const G = 1500;
    const E = 0.62; // rebote
    let W = area.clientWidth;
    let H = area.clientHeight;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Empiezan arriba, escalonados, y caen
    const bodies = tools.map((_, i) => ({
      x: R + ((W - 2 * R) * ((i * 0.37) % 1)),
      y: -R - i * 55,
      vx: (i % 2 ? 1 : -1) * (60 + i * 12),
      vy: 0,
      a: 0,
      drag: false,
    }));
    setReady(true);

    const onResize = () => {
      W = area.clientWidth;
      H = area.clientHeight;
    };
    window.addEventListener("resize", onResize);

    // Arrastrar y aventar
    let dragIdx = -1;
    let last = { x: 0, y: 0, t: 0 };
    const toLocal = (e: PointerEvent) => {
      const r = area.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const downHandlers = tools.map((_, i) => (e: PointerEvent) => {
      dragIdx = i;
      bodies[i].drag = true;
      const p = toLocal(e);
      last = { ...p, t: performance.now() };
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
      e.preventDefault();
    });
    const onMove = (e: PointerEvent) => {
      if (dragIdx < 0) return;
      const p = toLocal(e);
      const now = performance.now();
      const dt = Math.max((now - last.t) / 1000, 0.008);
      const b = bodies[dragIdx];
      b.vx = (p.x - last.x) / dt;
      b.vy = (p.y - last.y) / dt;
      b.x = Math.min(Math.max(p.x, R), W - R);
      b.y = Math.min(Math.max(p.y, R), H - R - LABEL);
      last = { ...p, t: now };
    };
    const onUp = () => {
      if (dragIdx < 0) return;
      const b = bodies[dragIdx];
      b.drag = false;
      b.vx = Math.max(Math.min(b.vx, 1800), -1800);
      b.vy = Math.max(Math.min(b.vy, 1800), -1800);
      dragIdx = -1;
    };
    elRefs.current.forEach((el, i) => el?.addEventListener("pointerdown", downHandlers[i]));
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    // Brincos ocasionales para que "jueguen" entre ellas
    const kick = reduce
      ? undefined
      : setInterval(() => {
          const b = bodies[Math.floor(Math.random() * bodies.length)];
          if (b.drag) return;
          b.vy -= 520 + Math.random() * 380;
          b.vx += (Math.random() - 0.5) * 520;
        }, 1800);

    // Pausar cuando no se ve
    let visible = true;
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting));
    io.observe(area);

    let raf = 0;
    let prev = performance.now();
    const step = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 1 / 30);
      prev = now;
      if (visible) {
        const floor = H - R - LABEL;
        for (const b of bodies) {
          if (b.drag) continue;
          b.vy += G * dt;
          b.x += b.vx * dt;
          b.y += b.vy * dt;
          if (b.x < R) { b.x = R; b.vx = Math.abs(b.vx) * E; }
          if (b.x > W - R) { b.x = W - R; b.vx = -Math.abs(b.vx) * E; }
          if (b.y > floor) {
            b.y = floor;
            b.vy = -Math.abs(b.vy) * E;
            if (Math.abs(b.vy) < 40) b.vy = 0;
            b.vx *= 0.985; // fricción del piso
          }
          if (b.y < R && b.vy < 0 && b.y > -400) { b.y = Math.max(b.y, R); b.vy = Math.abs(b.vy) * E; }
          b.a += (b.vx * dt) / R; // rueda al moverse
          // Quieto en el piso: se endereza poco a poco (al giro "derecho" más cercano)
          if (b.y >= floor - 0.5 && Math.abs(b.vx) < 60) {
            const target = Math.round(b.a / (Math.PI * 2)) * Math.PI * 2;
            b.a += (target - b.a) * Math.min(1, dt * 6);
          }
        }
        // Choques entre íconos
        for (let i = 0; i < bodies.length; i++) {
          for (let j = i + 1; j < bodies.length; j++) {
            const A = bodies[i];
            const B = bodies[j];
            const dx = B.x - A.x;
            const dy = B.y - A.y;
            const d = Math.hypot(dx, dy) || 0.01;
            if (d < 2 * R) {
              const nx = dx / d;
              const ny = dy / d;
              const overlap = 2 * R - d;
              const wa = A.drag ? 0 : B.drag ? 1 : 0.5;
              const wb = 1 - wa;
              A.x -= nx * overlap * wa;
              A.y -= ny * overlap * wa;
              B.x += nx * overlap * wb;
              B.y += ny * overlap * wb;
              const vn = (B.vx - A.vx) * nx + (B.vy - A.vy) * ny;
              if (vn < 0) {
                const jImp = (-(1 + E) * vn) / 2;
                if (!A.drag) { A.vx -= jImp * nx; A.vy -= jImp * ny; }
                if (!B.drag) { B.vx += jImp * nx; B.vy += jImp * ny; }
              }
            }
          }
        }
        // Tras los choques, ningún ícono puede quedar fuera del área
        for (const b of bodies) {
          if (b.y > -R) {
            b.x = Math.min(Math.max(b.x, R), W - R);
            b.y = Math.min(b.y, floor);
          }
        }
        bodies.forEach((b, i) => {
          const el = elRefs.current[i];
          if (el) el.style.transform = `translate(${(b.x - R).toFixed(1)}px, ${(b.y - R).toFixed(1)}px)`;
          const tile = tileRefs.current[i];
          if (tile) tile.style.transform = `rotate(${b.a.toFixed(3)}rad)`;
        });
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      if (kick) clearInterval(kick);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      elRefs.current.forEach((el, i) => el?.removeEventListener("pointerdown", downHandlers[i]));
    };
  }, [tools]);

  return (
    <Box
      ref={areaRef}
      sx={{
        position: "relative",
        height: { xs: 300, md: 270 },
        maxWidth: 520,
        borderBottom: "1px solid rgba(239,234,224,0.25)",
        overflow: "hidden",
      }}
    >
      {tools.map((tool, i) => (
        <Box
          key={tool.name}
          ref={(el: HTMLDivElement | null) => {
            elRefs.current[i] = el;
          }}
          title={tool.name}
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 62,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "3px",
            cursor: "grab",
            touchAction: "none",
            userSelect: "none",
            visibility: ready ? "visible" : "hidden",
            "&:active": { cursor: "grabbing" },
          }}
          style={{ transform: "translate(0px, -200px)" }}
        >
          <Box
            ref={(el: HTMLDivElement | null) => {
              tileRefs.current[i] = el;
            }}
            sx={{
              width: 60,
              height: 60,
              borderRadius: "14px",
              background: tool.bg,
              border: `2px solid ${tool.fg}`,
              color: tool.fg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: sans,
              fontWeight: 700,
              fontSize: "1.6rem",
              letterSpacing: "-0.02em",
              boxShadow: "0 10px 22px rgba(0,0,0,0.45)",
            }}
          >
            {tool.glyph ?? tool.code}
          </Box>
          <Box sx={{ fontFamily: mono, fontSize: "0.6rem", color: "rgba(239,234,224,0.6)", whiteSpace: "nowrap", pointerEvents: "none" }}>{tool.name}</Box>
        </Box>
      ))}
    </Box>
  );
}

export default function AboutMeHero() {
  const [lang, setLang] = useState<"es" | "en">("es");
  const t = TEXT[lang];
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Parallax suave: las letras se van a la izquierda, la foto sube un poco
  const titleX = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <Box
      ref={ref}
      sx={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#000",
        color: bone,
        letterSpacing: 0,
        textTransform: "none",
        paddingTop: { xs: "6.5rem", md: "7.5rem" },
        paddingBottom: { xs: "4rem", md: "6rem" },
        minHeight: "100vh",
      }}
    >
      {/* Idioma */}
      <Box sx={{ position: "absolute", top: { xs: "5.2rem", md: "6rem" }, right: { xs: 16, md: 32 }, zIndex: 5, display: "flex", gap: 0.5 }}>
        {(["es", "en"] as const).map((l) => (
          <Box
            key={l}
            component="button"
            onClick={() => setLang(l)}
            sx={{ border: `1px solid ${bone}`, borderRadius: "999px", padding: "0.15rem 0.6rem", fontFamily: mono, fontSize: "0.7rem", cursor: "pointer", background: lang === l ? bone : "transparent", color: lang === l ? "#000" : bone }}
          >
            {l.toUpperCase()}
          </Box>
        ))}
      </Box>

      <AnimatePresence mode="wait">
        <motion.div key={lang} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
          {/* Frase superior: el espaciado se "cierra" al entrar */}
          <Box sx={{ textAlign: "center", px: 2, mt: { xs: 1.5, md: 1 } }}>
            <motion.div
              initial={{ opacity: 0, letterSpacing: "0.9em" }}
              animate={{ opacity: 1, letterSpacing: "0.32em" }}
              transition={{ duration: 1.6, ease }}
              style={{ fontFamily: sans, fontSize: "clamp(0.62rem, 1.15vw, 0.95rem)", textTransform: "uppercase", lineHeight: 1.6 }}
            >
              {t.tagline}
            </motion.div>
          </Box>

          {/* Título gigante a sangre: cada letra sube desde abajo */}
          <motion.div style={{ x: titleX }}>
            <Box
              aria-label={t.title}
              sx={{
                display: "flex",
                justifyContent: "center",
                whiteSpace: "nowrap",
                overflow: "hidden",
                fontFamily: condensed,
                fontSize: { xs: "29vw", md: "29vw" },
                lineHeight: 0.86,
                letterSpacing: "0.005em",
                marginLeft: "-3vw",
                marginRight: "-3vw",
                mt: { xs: 0.5, md: 0.5 },
                // Espacio para el acento de la "Í" (el recorte es para la entrada)
                paddingTop: "0.14em",
              }}
            >
              {Array.from(t.title).map((ch, i) => (
                <motion.span
                  key={`${ch}-${i}`}
                  aria-hidden
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, delay: 0.25 + i * 0.07, ease }}
                  style={{ display: "inline-block", minWidth: ch === " " ? "0.22em" : undefined }}
                >
                  {ch}
                </motion.span>
              ))}
            </Box>
          </motion.div>

          {/* Foto (montada sobre las letras) + texto */}
          <Box
            sx={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "40% 1fr" },
              columnGap: { md: "6%" },
              rowGap: 4,
              alignItems: "start",
              maxWidth: 1200,
              mx: "auto",
              px: { xs: 3, md: 6 },
              mt: { xs: "-2vw", md: "-11.5vw" },
            }}
          >
            <motion.div style={{ y: photoY }}>
              <motion.div
                initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                transition={{ duration: 1.3, delay: 0.9, ease: [0.76, 0, 0.24, 1] }}
                style={{ position: "relative", overflow: "hidden", boxShadow: "0 30px 60px rgba(0,0,0,0.6)" }}
              >
                <motion.img
                  src="/images/aleabout.jpg"
                  alt="Ale Vázquez"
                  initial={{ scale: 1.25 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 2, delay: 0.9, ease }}
                  style={{ display: "block", width: "100%", aspectRatio: "2 / 3", objectFit: "cover", objectPosition: "center 30%" }}
                />
                {/* Grano de película muy sutil */}
                <Box
                  aria-hidden
                  sx={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    opacity: 0.18,
                    mixBlendMode: "overlay",
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                  }}
                />
              </motion.div>
            </motion.div>

            <Box sx={{ pt: { md: "14vw" }, maxWidth: { md: 520 } }}>
              {t.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 1.5 + i * 0.2, ease }}
                  style={{ fontFamily: sans, fontSize: "clamp(1rem, 1.35vw, 1.2rem)", lineHeight: 1.55, textAlign: "justify", hyphens: "auto", margin: i ? "1.4em 0 0" : 0 }}
                >
                  {p}
                </motion.p>
              ))}
              {/* Herramientas */}
              <Box sx={{ mt: { xs: 5, md: 6 } }}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 2.1, ease }}
                  style={{ fontFamily: condensed, fontSize: "clamp(1.8rem, 3vw, 2.6rem)", lineHeight: 1, letterSpacing: "0.01em", marginBottom: "1.1rem" }}
                >
                  {t.tools}
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 2.2 }}>
                  <ToolsPlayground tools={TOOLS} />
                </motion.div>
              </Box>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2.3 }}
                style={{ marginTop: "3.5rem", textAlign: "right", fontFamily: sans, fontSize: "0.78rem", letterSpacing: "0.18em", color: "rgba(239,234,224,0.45)" }}
              >
                {t.signature}
              </motion.div>
            </Box>
          </Box>
        </motion.div>
      </AnimatePresence>

    </Box>
  );
}
