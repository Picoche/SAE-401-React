import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  Image,
} from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
  useNavigate,
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
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Chip from "@mui/joy/Chip";

import { UserContext } from "../UserContext";

export default function Boutique({ id }) {
  const navigate = useNavigate();
  const [favoriteList, setFavoriteList] = useState([]);
  // const { userContext } = useContext(UserContext);
  const [isFavorite, setIsFavorite] = useState(false);

  const ViewProduit = useCallback(
    (e) => {
      navigate(`/boutique/${id}/produits/${e.target.dataset.id}`);
    },
    [id, navigate]
  );

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };
  const titre = createTheme({
    typography: {
      fontFamily: ["Unbounded", "cursive"].join(","),
    },
  });

  const [boutique, setBoutique] = useState([]);
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    const getBoutique = async () => {
      const response = await fetch(
        `https://panier-antan.mmicastres.fr/public/api/boutiques/${id}/produits`
      );
      const data = await response.json();
      console.log(data);
      console.log(data.produits);
      setBoutique(data.boutique);
      setProduits(data.details ? Object.values(data.details) : []);
    };
    getBoutique();
  }, []);

  return (
    <div>
      <div
        style={{
          backgroundColor: "#F5F5F5",
        }}
      >
        <ThemeProvider theme={titre}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {boutique.nom_boutique}
          </Typography>
          <Typography>{boutique.adresse_boutique}</Typography>
        </ThemeProvider>
      </div>
      <Container
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "3rem",
        }}
      >
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
                sx={{
                  position: "absolute",
                  backgroundColor: "#FFA42E",
                  zIndex: 2,
                  borderRadius: "50%",
                  right: "1rem",
                  bottom: 0,
                  transform: "translateY(50%)",
                }}
              >
                <VisibilityIcon
                  data-id={produit.id_produit}
                  onClick={ViewProduit}
                />
              </IconButton>
              <IconButton
                aria-label="Like minimal photography"
                size="md"
                variant="solid"
                color="danger"
                sx={{
                  position: "absolute",
                  zIndex: 2,
                  borderRadius: "50%",
                  left: "1rem",
                  bottom: 0,
                  transform: "translateY(50%)",
                }}
              >
                <FavoriteBorder />
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
                  sx={{ fontWeight: "md", color: "white" }}
                >
                  {produit.details.infos_type.provenance}
                </Typography>
              </Chip>
              <Chip>
                <Typography
                  level="body3"
                  sx={{ fontWeight: "md", color: "white" }}
                >
                  {produit.details.tags[0].tag_produit_boucherie}
                </Typography>
              </Chip>
            </CardOverflow>
          </Card>
        ))}
      </Container>
    </div>
  );
}
