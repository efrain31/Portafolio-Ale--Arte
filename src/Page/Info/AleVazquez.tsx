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
            href="mailto:alejandra@prueba.com?subject=Interés%20en%20tus%20servicios%20de%20diseño%20y%20audiovisuales&body=Hola%20Alejandra,%0D%0A%0D%0AMe%20gustaría%20ponerme%20en%20contacto%20contigo%20para%20conocer%20más%20sobre%20tu%20trabajo%20como%20artista%20gráfica%20de%20audiovisuales.%0D%0A%0D%0AGracias!%0D%0A"
            sx={{ color: "white", textDecoration: "none" }}
          >
            alejandra@prueba.com
          </Link>


        </Typography>
        <br />
        <Typography>Mex +52 3310252435</Typography>
      </Box>

      {/* Separador opcional */}
      <Box sx={{ my: 2 }} />

      {/* Segundo contacto */}
      <Box>
      </Box>
    </Box>
  );
}
