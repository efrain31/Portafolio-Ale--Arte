"use client";

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { navRoutes as routesData, normalizeSlug } from "@/data/navRoutes";

export default function NavLinks() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: "2rem" }}>
      {routesData.map((route, index) => (
        <Box
          key={route.basePath}
          onMouseEnter={() => setOpenIndex(index)}
          onMouseLeave={() => setOpenIndex(null)}
          sx={{ position: "relative" }}
        >
          <Typography
            sx={{
              fontFamily: "'Inconsolata', monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255, 255, 255, 0.7)",
              cursor: "default",
              transition: "color 0.3s",
              "&:hover": { color: "white" },
            }}
          >
            {route.label}
          </Typography>

          {openIndex === index && (
            <Box
              sx={{
                position: "absolute",
                top: "100%",
                left: 0,
                // Espaciado visual como padding (no margin): así el panel
                // queda pegado al trigger sin dejar una zona muerta entre
                // ambos que dispare mouseleave antes de poder hacer clic.
                paddingTop: "0.75rem",
                zIndex: 200,
              }}
            >
              <Box
                sx={{
                  background: "rgba(0, 0, 0, 0.95)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  minWidth: 170,
                  paddingY: "0.5rem",
                }}
              >
                {route.items.map((item) => {
                  const slug = normalizeSlug(item);
                  return (
                    <Link
                      key={item}
                      href={`/${route.basePath}/${slug}`}
                      style={{ textDecoration: "none", display: "block" }}
                      onClick={() => setOpenIndex(null)}
                    >
                      <Typography
                        sx={{
                          fontFamily: "'Inconsolata', monospace",
                          fontSize: "0.7rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "rgba(255, 255, 255, 0.6)",
                          padding: "0.5rem 1.2rem",
                          transition: "color 0.2s, padding-left 0.2s",
                          "&:hover": {
                            color: "white",
                            paddingLeft: "1.6rem",
                          },
                        }}
                      >
                        {item}
                      </Typography>
                    </Link>
                  );
                })}
              </Box>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}
