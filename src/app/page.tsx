"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HeroPage() {
  return (
    <div
      className="hero-full"
      style={{
        position: "relative",
        width: "100%",
        height: "calc(100vh - 88px)",
        minHeight: 480,
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        paddingBottom: "6vh",
      }}
    >
      {/* Imagen de fondo */}
      <Image
        src="/images/aleabout.jpg"
        alt="Ale Vazquez"
        fill
        style={{ objectFit: "cover", objectPosition: "center top" }}
        priority
      />

      {/* Degradado — negro sólido en la parte superior, siempre visible */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.75) 12%, rgba(0,0,0,0) 38%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.95) 100%)",
          zIndex: 1,
        }}
      />

      {/* Contenido centrado */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        {/* Nombre */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            margin: 0,
            lineHeight: 0.95,
            color: "white",
            fontSize: "clamp(3.5rem, 11vw, 10rem)",
            fontWeight: "normal",
            letterSpacing: "-0.01em",
            textTransform: "none",
          }}
        >
          <em
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 300,
            }}
          >
            Ale{" "}
          </em>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "normal",
              fontWeight: 600,
            }}
          >
            Vázquez
          </span>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.75, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: "easeOut" }}
          style={{
            margin: 0,
            fontFamily: "'Inconsolata', monospace",
            fontSize: "clamp(0.7rem, 1.5vw, 0.95rem)",
            letterSpacing: "0.45em",
            color: "white",
            textTransform: "uppercase",
          }}
        >
          Artista Visual
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          style={{ marginTop: "1.8rem" }}
        >
          <Link
            href="/portafolio"
            style={{
              fontFamily: "'Inconsolata', monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.3em",
              color: "white",
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.5)",
              padding: "0.6rem 1.8rem",
              textTransform: "uppercase",
              transition: "border-color 0.3s, background 0.3s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "white";
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.5)";
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
            }}
          >
            Ver portafolio
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
