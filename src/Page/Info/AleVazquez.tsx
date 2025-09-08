import { Box, Typography, Link } from "@mui/material";

export default function ContactInfo() {
  return (
    <Box
      sx={{
        textAlign: "center",
        color: "white",
        backgroundColor: "black",
        p: 5,
      }}
    >
      {/* Título */}
      <Typography variant="h4" sx={{ mb: 3 }}>
        CONTACT
      </Typography>

      {/* Primer contacto */}
      <Box sx={{ mb: 4 }}>
        <Typography>
          <Link
            href="mailto:robert@robertclark.com"
            sx={{ color: "white", textDecoration: "none" }}
          >
            alejandra@prueba.com
          </Link>
        </Typography>
        <Typography>+917.957.5340</Typography>
      </Box>

      {/* Separador opcional */}
      <Box sx={{ my: 2 }} />

      {/* Segundo contacto */}
      <Box>
        <Typography>or at Ten Ton Studio:</Typography>
        <Typography>
          <Link
            href="mailto:mail@tentonstudio.com"
            sx={{ color: "white", textDecoration: "none" }}
          >
            mail@tentonstudio.com
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
