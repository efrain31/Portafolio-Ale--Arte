"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Box } from "@mui/material";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import Link from "next/link";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import VerifiedIcon from "@mui/icons-material/Verified";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import BackLink from "@/components/common/BackLink";

// Contacto con estilo de "paneles de vidrio" flotando en 3D (referencia:
// interfaz espacial de un reproductor de música): panel izquierdo de
// navegación, panel central con nombre y formas de contacto, panel derecho
// con retrato y descargas, y una barra de control flotante abajo.
// Animaciones: entrada escalonada desde la profundidad, flotación suave en
// reposo e inclinación de los paneles siguiendo el cursor (escritorio).

const sans = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const mono = "'Inconsolata', monospace";

const EMAIL_TEXT = "ale.vr28@hotmail.com";
const EMAIL_HREF =
  "https://mail.google.com/mail/?view=cm&fs=1&to=alejandra@prueba2.com&su=Interés%20en%20tus%20servicios%20de%20diseño%20y%20audiovisuales&body=Hola%20Alejandra,%0D%0A%0D%0AMe%20gustaría%20ponerme%20en%20contacto%20contigo%20para%20conocer%20más%20sobre%20tu%20trabajo%20como%20artista%20gráfica%20de%20audiovisuales.%0D%0A%0D%0AGracias!";
const WHATSAPP_TEXT = "+52 33 1025 2435";
const WHATSAPP_HREF = "https://wa.me/523310252435?text=Hola%20quiero%20más%20información";
const INSTAGRAM_HREF = "https://www.instagram.com";

const IMG = {
  background: "/images/aleabout.jpg",
  hero: "/images/dataale/SOBREMI/SHOOTINGS/MARUATHA/3.jpg",
  portrait: "/images/dataale/SOBREMI/SHOOTINGS/STUDIO7/STUDIO1.jpg",
};

const glass = {
  background: "rgba(28,28,30,0.55)",
  backdropFilter: "blur(30px) saturate(150%)",
  WebkitBackdropFilter: "blur(30px) saturate(150%)",
  border: "1px solid rgba(255,255,255,0.14)",
  borderRadius: "26px",
  boxShadow: "0 40px 80px rgba(0,0,0,0.45)",
} as const;

// Panel con entrada desde la profundidad + flotación + inclinación con el cursor
function Panel({
  children,
  baseRotate,
  delay,
  floatDuration,
  mx,
  my,
  tilt,
  sx,
}: {
  children: ReactNode;
  baseRotate: number;
  delay: number;
  floatDuration: number;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  tilt: boolean;
  sx?: object;
}) {
  const rotateY = useTransform(mx, (v) => (tilt ? baseRotate + v * 6 : 0));
  const rotateX = useTransform(my, (v) => (tilt ? -v * 4 : 0));
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      sx={{ perspective: "1600px", ...sx }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: floatDuration, repeat: Infinity, ease: "easeInOut", delay: delay + 1.1 }}
        style={{ height: "100%" }}
      >
        <motion.div style={{ rotateY, rotateX, transformPerspective: 1200, height: "100%" }}>
          <Box sx={{ ...glass, height: "100%", overflow: "hidden", position: "relative" }}>{children}</Box>
        </motion.div>
      </motion.div>
    </Box>
  );
}

// Filas que entran una tras otra
function Rows({ children, delay }: { children: ReactNode[]; delay: number }) {
  return (
    <>
      {children.map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: delay + i * 0.08 }}
        >
          {child}
        </motion.div>
      ))}
    </>
  );
}

const rowSx = {
  display: "flex",
  alignItems: "center",
  gap: "0.9rem",
  padding: "0.55rem 0.7rem",
  borderRadius: "12px",
  color: "white",
  textDecoration: "none",
  transition: "background 0.2s",
  "&:hover": { background: "rgba(255,255,255,0.08)" },
} as const;

function IconTile({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ width: 40, height: 40, borderRadius: "10px", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      {children}
    </Box>
  );
}

export default function ContactInfo() {
  const [tilt, setTilt] = useState(false);
  const mxRaw = useMotionValue(0);
  const myRaw = useMotionValue(0);
  const mx = useSpring(mxRaw, { stiffness: 80, damping: 20 });
  const my = useSpring(myRaw, { stiffness: 80, damping: 20 });

  // Inclinación sólo en escritorio con cursor (no en táctil)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1100px) and (hover: hover)");
    const update = () => setTilt(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const onMove = (e: React.MouseEvent) => {
    if (!tilt) return;
    mxRaw.set((e.clientX / window.innerWidth) * 2 - 1);
    myRaw.set((e.clientY / window.innerHeight) * 2 - 1);
  };

  const contactRows = [
    { n: 1, icon: <EmailOutlinedIcon fontSize="small" />, title: "Correo", detail: EMAIL_TEXT, action: "Escribir", href: EMAIL_HREF },
    { n: 2, icon: <WhatsAppIcon fontSize="small" />, title: "WhatsApp", detail: WHATSAPP_TEXT, action: "Mensaje", href: WHATSAPP_HREF },
    { n: 3, icon: <InstagramIcon fontSize="small" />, title: "Instagram", detail: "Trabajo reciente y procesos", action: "Ver perfil", href: INSTAGRAM_HREF },
  ];
  const services = [
    { tag: "CA", title: "Campañas", detail: "Modelaje · marca" },
    { tag: "ED", title: "Editoriales", detail: "Moda · retrato" },
    { tag: "FO", title: "Fotografía", detail: "Producto · food" },
    { tag: "DI", title: "Diseño", detail: "Ilustración · ads" },
  ];
  const downloads = [
    { title: "CV", detail: "PDF · Ale Vázquez", href: "/docs/cv.pdf", file: "Ale-Vazquez-CV.pdf" },
    { title: "Book", detail: "PDF · Portafolio", href: "/docs/book.pdf", file: "Ale-Vazquez-Book.pdf" },
  ];

  return (
    <Box
      onMouseMove={onMove}
      sx={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        backgroundColor: "#000",
        color: "white",
        letterSpacing: 0,
        textTransform: "none",
        fontFamily: sans,
        paddingTop: { xs: "5.5rem", md: "6.5rem" },
        paddingBottom: "3rem",
      }}
    >
      {/* Fondo: foto con zoom lento, desenfocada y oscurecida */}
      <motion.div
        initial={{ scale: 1.2 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 6, ease: "easeOut" }}
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url('${IMG.background}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(6px) brightness(0.45)",
        }}
      />
      <Box sx={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)" }} />

      <Box sx={{ position: "relative", zIndex: 2, px: { xs: 2, md: 4 } }}>
        <BackLink href="/portafolio" label="Volver al portafolio" />
      </Box>

      {/* Paneles */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          alignItems: { xs: "stretch", lg: "center" },
          justifyContent: "center",
          gap: { xs: 2, lg: 3 },
          px: { xs: 2, md: 4 },
          mt: { xs: 2, md: 3 },
          maxWidth: 1400,
          mx: "auto",
        }}
      >
        {/* Izquierdo: navegación */}
        <Panel baseRotate={14} delay={0.25} floatDuration={6.5} mx={mx} my={my} tilt={tilt} sx={{ width: { lg: 270 }, height: { lg: 560 }, order: { xs: 3, lg: 0 } }}>
          <Box sx={{ p: 2.5 }}>
            <Rows delay={0.9}>
              {[
                <Box key="h" component={Link} href="/" sx={rowSx}><HomeOutlinedIcon fontSize="small" /> Inicio</Box>,
                <Box key="p" component={Link} href="/portafolio" sx={rowSx}><CollectionsOutlinedIcon fontSize="small" /> Portafolio</Box>,
              ]}
            </Rows>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", my: 2 }}>
              {[
                ["Modelaje", "modelaje"],
                ["Fotografía", "fotografia"],
                ["Diseño", "diseño"],
              ].map(([label, id]) => (
                <Box
                  key={id}
                  component={Link}
                  href={`/portafolio?category=${encodeURIComponent(id)}`}
                  sx={{ fontSize: "0.78rem", color: "white", textDecoration: "none", padding: "0.35rem 0.8rem", borderRadius: "999px", background: "rgba(255,255,255,0.1)", "&:hover": { background: "rgba(255,255,255,0.2)" } }}
                >
                  {label}
                </Box>
              ))}
            </Box>
            <Rows delay={1.1}>
              {[
                { img: "/images/dataale/SOBREMI/SHOOTINGS/CANTADRINK/1.jpg", t: "Canta Drink", s: "Modelaje · Serie" },
                { img: "/images/dataale/SOBREMI/SHOOTINGS/MARUATHA/1.jpg", t: "Maruatha", s: "Modelaje · Serie" },
                { img: "/images/dataale/SOBREMI/SHOOTINGS/SOLUNA/Estrella-1.jpg", t: "Sol & Luna", s: "Modelaje · Serie" },
                { img: "/images/dataale/SOBREMI/SHOOTINGS/PROYECTOCATRINA/1.jpg", t: "Proyecto Catrina", s: "Modelaje · Serie" },
                { img: "/images/dataale/SOBREMI/SHOOTINGS/STUDIO7/STUDIO5.jpg", t: "Studio 7", s: "Modelaje · Serie" },
              ].map((r) => (
                <Box key={r.t} component={Link} href={`/portafolio?category=modelaje&sub=${encodeURIComponent(r.t)}`} sx={rowSx}>
                  <Box component="img" src={r.img} alt="" sx={{ width: 40, height: 40, borderRadius: "8px", objectFit: "cover" }} />
                  <Box sx={{ minWidth: 0 }}>
                    <Box sx={{ fontSize: "0.88rem" }}>{r.t}</Box>
                    <Box sx={{ fontSize: "0.74rem", color: "rgba(255,255,255,0.55)" }}>{r.s}</Box>
                  </Box>
                </Box>
              ))}
            </Rows>
          </Box>
        </Panel>

        {/* Central: nombre + contacto */}
        <Panel baseRotate={0} delay={0} floatDuration={7.5} mx={mx} my={my} tilt={tilt} sx={{ flex: { lg: "0 1 680px" }, order: { xs: 1, lg: 0 } }}>
          {/* Encabezado con foto */}
          <Box sx={{ position: "relative", height: { xs: 260, md: 290 }, overflow: "hidden" }}>
            <motion.img
              src={IMG.hero}
              alt="Ale Vázquez"
              initial={{ scale: 1.15, x: 30 }}
              animate={{ scale: 1, x: 0 }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: "absolute", right: 0, top: 0, height: "100%", width: "60%", objectFit: "cover", objectPosition: "center 25%", filter: "grayscale(1) contrast(1.1)", maskImage: "linear-gradient(to right, transparent 0%, black 45%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 45%)" }}
            />
            <Box sx={{ position: "absolute", left: { xs: 20, md: 28 }, bottom: { xs: 22, md: 28 }, right: 20 }}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, fontSize: "0.8rem", color: "rgba(255,255,255,0.8)", mb: 1 }}>
                  <VerifiedIcon sx={{ fontSize: 16, color: "#6db3ff" }} /> Artista visual
                </Box>
              </motion.div>
              <Box sx={{ overflow: "hidden" }}>
                <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                  <Box sx={{ fontWeight: 800, fontSize: { xs: "2.6rem", md: "3.6rem" }, lineHeight: 1, letterSpacing: "-0.03em" }}>Ale Vázquez</Box>
                </motion.div>
              </Box>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                <Box sx={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.65)", mt: 1 }}>Diseñadora gráfica · Modelo · Fotógrafa</Box>
              </motion.div>
            </Box>
          </Box>

          {/* Acciones */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, px: { xs: 2.5, md: 3.5 }, py: 2 }}>
            <Box
              component={motion.a}
              href={EMAIL_HREF}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Escribir correo"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              sx={{ width: 52, height: 52, borderRadius: "50%", background: "white", color: "black", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <SendRoundedIcon />
            </Box>
            <Box component="a" href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" sx={{ fontSize: "0.8rem", color: "white", textDecoration: "none", border: "1px solid rgba(255,255,255,0.35)", borderRadius: "999px", padding: "0.4rem 1rem", "&:hover": { background: "rgba(255,255,255,0.12)" } }}>
              WhatsApp
            </Box>
            <Box sx={{ color: "rgba(255,255,255,0.6)", fontSize: "1.2rem", letterSpacing: "0.1em" }}>···</Box>
          </Box>

          {/* Contacto + disponible para */}
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.5fr 1fr" }, gap: { xs: 2, md: 3 }, px: { xs: 2, md: 3 }, pb: 3 }}>
            <Box>
              <Box sx={{ fontWeight: 700, fontSize: "1.1rem", mb: 1, px: 0.7 }}>Contacto</Box>
              <Rows delay={1.2}>
                {contactRows.map((r) => (
                  <Box key={r.n} component="a" href={r.href} target="_blank" rel="noopener noreferrer" sx={rowSx}>
                    <Box sx={{ width: 14, fontSize: "0.85rem", color: "rgba(255,255,255,0.55)" }}>{r.n}</Box>
                    <IconTile>{r.icon}</IconTile>
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                      <Box sx={{ fontSize: "0.9rem" }}>{r.title}</Box>
                      <Box sx={{ fontSize: "0.76rem", color: "rgba(255,255,255,0.6)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.detail}</Box>
                    </Box>
                    <Box sx={{ fontSize: "0.74rem", color: "rgba(255,255,255,0.6)", display: { xs: "none", sm: "block" } }}>{r.action}</Box>
                  </Box>
                ))}
              </Rows>
            </Box>
            <Box>
              <Box sx={{ fontWeight: 700, fontSize: "1.1rem", mb: 1, px: 0.7 }}>Disponible para</Box>
              <Rows delay={1.4}>
                {services.map((s) => (
                  <Box key={s.tag} sx={{ ...rowSx, "&:hover": {} }}>
                    <Box sx={{ width: 40, height: 40, borderRadius: "10px", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontSize: "0.75rem", flexShrink: 0 }}>{s.tag}</Box>
                    <Box>
                      <Box sx={{ fontSize: "0.88rem" }}>{s.title}</Box>
                      <Box sx={{ fontSize: "0.74rem", color: "rgba(255,255,255,0.55)" }}>{s.detail}</Box>
                    </Box>
                  </Box>
                ))}
              </Rows>
            </Box>
          </Box>
        </Panel>

        {/* Derecho: retrato + descargas */}
        <Panel baseRotate={-14} delay={0.4} floatDuration={7} mx={mx} my={my} tilt={tilt} sx={{ width: { lg: 290 }, height: { lg: 560 }, order: { xs: 2, lg: 0 } }}>
          <Box sx={{ position: "relative", height: { xs: 280, lg: 250 }, overflow: "hidden" }}>
            <motion.img
              src={IMG.portrait}
              alt=""
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }}
            />
            <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(28,28,30,0.9), transparent 55%)" }} />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
              style={{ position: "absolute", right: 16, bottom: 16, textAlign: "right" }}
            >
              <Box sx={{ fontWeight: 800, fontSize: "1.6rem", lineHeight: 1 }}>AV</Box>
              <Box sx={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.75)" }}>Portafolio 2026</Box>
            </motion.div>
          </Box>
          <Box sx={{ p: 2.2 }}>
            <Box sx={{ fontWeight: 700, fontSize: "1.1rem", mb: 1.2, px: 0.7 }}>Descargas</Box>
            <Rows delay={1.5}>
              {downloads.map((d) => (
                <Box key={d.title} component="a" href={d.href} download={d.file} sx={rowSx}>
                  <IconTile>
                    <FileDownloadOutlinedIcon fontSize="small" />
                  </IconTile>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ fontSize: "0.9rem" }}>{d.title}</Box>
                    <Box sx={{ fontSize: "0.74rem", color: "rgba(255,255,255,0.55)" }}>{d.detail}</Box>
                  </Box>
                  <NorthEastIcon sx={{ fontSize: 16, color: "rgba(255,255,255,0.6)" }} />
                </Box>
              ))}
            </Rows>
            <Box component={Link} href="/info/about" sx={{ ...rowSx, mt: 1 }}>
              <Box sx={{ flex: 1, fontSize: "0.85rem", color: "rgba(255,255,255,0.75)" }}>Conoce más sobre mí</Box>
              <NorthEastIcon sx={{ fontSize: 16, color: "rgba(255,255,255,0.6)" }} />
            </Box>
          </Box>
        </Panel>
      </Box>

      {/* Barra de control flotante */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        style={{ position: "relative", zIndex: 3, display: "flex", justifyContent: "center", marginTop: 28 }}
      >
        <Box sx={{ ...glass, borderRadius: "999px", display: "flex", alignItems: "center", gap: { xs: 1.5, md: 2.5 }, padding: "0.5rem 1rem" }}>
          {[
            { href: INSTAGRAM_HREF, label: "Instagram", icon: <InstagramIcon fontSize="small" /> },
            { href: WHATSAPP_HREF, label: "WhatsApp", icon: <WhatsAppIcon fontSize="small" /> },
          ].map((b) => (
            <Box key={b.label} component="a" href={b.href} target="_blank" rel="noopener noreferrer" aria-label={b.label} sx={{ color: "rgba(255,255,255,0.85)", display: "flex", "&:hover": { color: "white" } }}>
              {b.icon}
            </Box>
          ))}
          <Box
            component={motion.a}
            href={EMAIL_HREF}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Escribir correo"
            whileHover={{ scale: 1.1 }}
            sx={{ width: 40, height: 40, borderRadius: "50%", background: "white", color: "black", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <EmailOutlinedIcon fontSize="small" />
          </Box>
          {downloads.map((d) => (
            <Box key={d.title} component="a" href={d.href} download={d.file} aria-label={`Descargar ${d.title}`} sx={{ color: "rgba(255,255,255,0.85)", display: "flex", alignItems: "center", gap: 0.4, fontFamily: mono, fontSize: "0.68rem", letterSpacing: "0.15em", textDecoration: "none", "&:hover": { color: "white" } }}>
              <FileDownloadOutlinedIcon fontSize="small" />
              {d.title.toUpperCase()}
            </Box>
          ))}
        </Box>
      </motion.div>
    </Box>
  );
}
