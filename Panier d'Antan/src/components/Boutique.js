import React, { useState, useEffect, Image } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import {
  Button,
  Typography,
  createTheme,
  ThemeProvider,
  Container,
} from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import Favorite from "@mui/icons-material/Favorite";
import Chip from "@mui/joy/Chip";

export default function Boutique({ id }) {
  const titre = createTheme({
    typography: {
      fontFamily: ["Unbounded", "cursive"].join(","),
    },
  });

  const [boutique, setBoutique] = useState([]);
  const [produits, setProduits] = useState([]);
  const [detailsCat, setDetailsCat] = useState([]);

  useEffect(() => {
    const getBoutique = async () => {
      const response = await fetch(
        `https://panier-antan.mmicastres.fr/public/api/boutiques/${id}/produits`
      );
      const data = await response.json();
      console.log(data.produits);
      console.log(data.boutique.nom_boutique);
      console.log(data);
      console.log(data.produits);
      console.log(data.details[1]);
      setBoutique(data.boutique);
      setProduits(data.produits ? Object.values(data.produits) : []);
      setDetailsCat(data.details ? Object.values(data.details) : []);
    };
    getBoutique();
  }, []);

  return (
    <div>
      <ThemeProvider theme={titre}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {boutique.nom_boutique}
        </Typography>
      </ThemeProvider>
      <Container>
        {produits?.map((produit, index) => (
          <Card variant="outlined" sx={{ width: 320 }} key={index}>
            <CardOverflow>
              <AspectRatio ratio="2">
                <img
                  src={produit.image_produit}
                  loading="lazy"
                  alt={produit.description_produit}
                />
              </AspectRatio>
              <IconButton
                aria-label="Like minimal photography"
                size="md"
                variant="solid"
                color="danger"
                sx={{
                  position: "absolute",
                  zIndex: 2,
                  borderRadius: "50%",
                  right: "1rem",
                  bottom: 0,
                  transform: "translateY(50%)",
                }}
              >
                <Favorite />
              </IconButton>
            </CardOverflow>
            <Typography level="h2" fontSize="md" fontWeight="bold" mt={2}>
              {produit.nom_produit}
            </Typography>
            <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
              {produit.description_produit}
            </Typography>
            <Divider inset="context" />
            <CardOverflow
              variant="soft"
              sx={{
                display: "flex",
                gap: 1.5,
                py: 1.5,
                px: "var(--Card-padding)",
                bgcolor: "background.level1",
              }}
            >
              <Typography
                level="body3"
                sx={{ fontWeight: "md", color: "text.primary" }}
              >
                {produit.prix_produit} €
              </Typography>
              <Divider orientation="vertical" />
              <Chip>
                <Typography
                  level="body3"
                  sx={{ fontWeight: "md", color: "text.secondary" }}
                >
                  {/* {detailsCat["1"].info_type.provenance} */}
                </Typography>
              </Chip>
            </CardOverflow>
          </Card>
        ))}
      </Container>
    </div>
  );
}
