import React, { useState, useEffect } from "react";
import Map from "../components/Map";
import { Button, Typography, createTheme, ThemeProvider } from "@mui/material";

export default function MapView({ selectedBoutique, setSelectedBoutique }) {
  useEffect(() => {
    console.log(selectedBoutique);
  }, [selectedBoutique]);

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
    <div>
      <div style={{
        margin: "0px 0px 15px 0px"
      }}>
      <ThemeProvider theme={titre}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Découvrez dès maintenant les Boutiques proche de chez vous
        </Typography>
      </ThemeProvider>
      </div>
      <Map
        selectedBoutique={selectedBoutique}
        setSelectedBoutique={setSelectedBoutique}
      />
    </div>
  );
}
