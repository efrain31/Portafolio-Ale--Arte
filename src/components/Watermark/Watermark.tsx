"use client";

import { Box, Typography } from "@mui/material";

export default function Watermark() {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 10,
        pointerEvents: "none",
      }}
    >
      <Typography
        sx={{
          fontFamily: "'Inconsolata', monospace",
          fontSize: "0.85rem",
          letterSpacing: "1px",
          color: "rgba(255, 255, 255, 0.2)",
          textTransform: "uppercase",
          textAlign: "right",
        }}
      >
        X LAPLACE<br />
        COMPANY
      </Typography>
    </Box>
  );
}
