import * as React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import DrapeauFR from "../assets/france.png";

export default function Footer() {
  function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          Panier d'Antan
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }
  return (
    <div
      style={{
        backgroundColor: "#94DDFC",
        margin: 0,
        padding: 15,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Footer */}
      <Box component="footer" sx={{ margin: 0 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            padding: ".5rem",
            border: "2px solid white",
            borderRadius: "75px",
          }}
        >
          <img style={{ paddingRight: "1rem" }} src={DrapeauFR}></img>
          <Typography>| € (EUR)</Typography>
        </Box>
      </Box>
      <Typography>Cookies</Typography>
      <Typography>Mentions légales</Typography>
      <Typography>Conditions d'utilisation</Typography>
      <Copyright />

      {/* End footer */}
    </div>
  );
}
