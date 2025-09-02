"use client";

import { Box, Typography } from "@mui/material";

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: "black",
                color: "white",
                py: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                mt: 6,
            }}
        >
            {/* Contenedor principal */}
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "1200px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                }}
            >
                {/* <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            fontSize: "1.5rem",
            fontWeight: 500,
          }}
        >
          © 2025 Ale Vezquez
        </Typography> */}

                <Box sx={{ display: "flex", gap: 3, justifyContent: "center", mt: 3 }}>
                    <a
                        href="https://www.instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: "inline-block" }}
                    >
                        <svg width="50" height="50" fill="white">
                            <use href="#instagram-icon" />
                        </svg>
                    </a>

                    <a
                        href="https://www.twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: "inline-block" }}
                    >
                        <svg width="50" height="50" fill="white">
                            <use href="#twitter-icon" />
                        </svg>
                    </a>
                </Box>

            </Box>
        </Box>
    );
}
