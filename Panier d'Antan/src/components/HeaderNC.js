import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo_Le_panier_dantan.png";
import Support from "../assets/support.png";

export default function HeaderNC() {
  const normal = createTheme({
    typography: {
      fontFamily: ["Roboto", "cursive"].join(","),
    },
  });
  const titre = createTheme({
    typography: {
      fontFamily: ["Unbounded", "cursive"].join(","),
    },
  });

  return (
    <div
      style={{
        backgroundColor: "#94DDFC",
        margin: 0,
        padding: 15,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "black",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "start",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box component="header" sx={{ margin: 0 }}>
            <Link to="/">
              <Box>
                <img style={{ width: 50, height: 50 }} src={Logo}></img>
              </Box>
            </Link>
          </Box>
          <ThemeProvider theme={titre}>
            <Link to="/">
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Panier d'Antan
              </Typography>
            </Link>
          </ThemeProvider>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "end",
          alignItems: "left",
          gap: "2rem",
          color: "black",
        }}
      >
        <ThemeProvider theme={titre}>
          <Link to="/devcommercant">
            <Typography variant="h8">Devenir commerçant </Typography>
          </Link>
          <Link to="/login">
            <Typography variant="h8">Connexion</Typography>
          </Link>
        </ThemeProvider>
        <Box component="header" sx={{ margin: 0 }}>
          <Box>
            <img style={{ width: 20, height: 20 }} src={Support}></img>
          </Box>
        </Box>
      </div>
    </div>
  );
}
