"use client";

import { useEffect, useRef, useState } from "react";

// Traduce la posición del elemento respecto al centro del viewport en un
// desplazamiento vertical (translateY) para simular el efecto parallax que
// usa ysl.com en algunas imágenes de sus grids: la imagen se mueve un poco
// más lento/rápido que el scroll de la página.
export function useParallax(strength = 40) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const range = window.innerHeight / 2 + rect.height / 2;
      const progress = range > 0 ? (viewportCenter - elementCenter) / range : 0;
      setOffset(Math.max(-1, Math.min(1, progress)) * strength);
    };

    const onScrollOrResize = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [strength]);

  return { ref, offset };
}
