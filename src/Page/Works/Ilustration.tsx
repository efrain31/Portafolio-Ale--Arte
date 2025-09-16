"use client";

import { Box, Typography } from "@mui/material";
import ImageGrid from "@/components/galerias/ImagenGrid";
import { IlustrationImagesData } from "@/data/data";

export default function ILUSTRATIONGallery() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                backgroundColor: "black", // fondo como el submenu
                color: "white",
            }}
        >
            <Box sx={{ flex: 1, maxWidth: 1200, margin: "0 auto", padding: 2 }}>
                {/* Título de la galería */}
                <Typography
                    sx={{
                        fontFamily: "'Inconsolata', monospace",
                        fontWeight: 500,
                        fontSize: "1.2rem",
                        marginBottom: 2,
                        color: "white",
                    }}
                >
                    ART
                </Typography>
                {/* Galería */}
                <ImageGrid images={IlustrationImagesData} />
            </Box>
        </Box>
    );
}
