"use client";

import { Box, Typography } from "@mui/material";
import ImageGrid from "@/components/Galerias/ImagenGrid";
import { modelImagesData } from "@/Data/data";

export default function modelSGallery() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                backgroundColor: "black", 
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
                    MODEL GALLERY
                </Typography>

                {/* Galería */}
                <ImageGrid images={modelImagesData} />
            </Box>
        </Box>
    );
}
