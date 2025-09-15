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
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=alejandra@prueba2.com&su=Interés%20en%20tus%20servicios%20de%20diseño%20y%20audiovisuales&body=Hola%20Alejandra,%0D%0A%0D%0AMe%20gustaría%20ponerme%20en%20contacto%20contigo%20para%20conocer%20más%20sobre%20tu%20trabajo%20como%20artista%20gráfica%20de%20audiovisuales.%0D%0A%0D%0AGracias!"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "white", textDecoration: "none" }}
          >
            alejandra@prueba2.com
          </a>
        </Typography>

        <br />
        <Link
          href="https://wa.me/523310252435?text=Hola%20quiero%20más%20información"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Typography sx={{ color: "white", cursor: "pointer" }}>
            Mex +52 3310252435
          </Typography>
        </Link>     
         </Box>

      {/* Separador opcional */}
      <Box sx={{ my: 2 }} />

      {/* Segundo contacto */}
      <Box>
      </Box>
    </Box>
  );
}
