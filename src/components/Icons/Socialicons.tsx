import { Box } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";

export default function SocialIcons() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 4 }}>
      <InstagramIcon sx={{ color: "white", fontSize: 40, cursor: "pointer" }} />
      <EmailIcon sx={{ color: "white", fontSize: 40, cursor: "pointer" }} />
    </Box>
  );
}
