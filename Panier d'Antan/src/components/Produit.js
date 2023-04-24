import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  Button,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import Chip from "@mui/joy/Chip";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(4),
  },
  productImage: {
    width: "100%",
    height: "auto",
    maxWidth: "500px",
  },
  productName: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
  productOrigin: {
    fontStyle: "italic",
    marginBottom: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  productTags: {
    marginBottom: theme.spacing(2),
  },
  tag: {
    margin: theme.spacing(0.5),
  },
  productDescription: {
    whiteSpace: "pre-line",
  },
  accordion: {
    marginTop: theme.spacing(2),
  },
  accordionSummary: {
    fontWeight: 700,
  },
  accordionDetails: {
    whiteSpace: "pre-line",
  },
  price: {
    fontWeight: 700,
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
  },
}));

export default function Produit({ id_boutique, id_produit }) {
  const [produit, setProduit] = React.useState([]);

  useEffect(() => {
    const getProduit = async () => {
      const response = await fetch(
        `https://panier-antan.mmicastres.fr/public/api/boutiques/${id_boutique}/produits/${id_produit}`
      );
      const data = await response.json();
      console.log(data);
      console.log(data.produit);
      setProduit(data.produit);
    };
    getProduit();
  }, []);

  useEffect(() => {
    console.log(produit);
  }, [produit]);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <img
            src={produit.image_produit}
            alt={produit.nom_produit}
            className={classes.productImage}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h3" className={classes.productName}>
            {produit.nom_produit}
          </Typography>
          <Typography variant="body1" className={classes.productOrigin}>
            Élevé à {produit.details?.infos_type?.provenance}
          </Typography>
          <div className={classes.productTags}>
            <Chip className={classes.tag} color="primary">
              {produit.details?.tags[0]?.tag_produit_boucherie}
            </Chip>
          </div>
          <Typography variant="body1" className={classes.price}>
            {produit.prix_produit} €
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<AddShoppingCartIcon />}
          >
            Ajouter au panier
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Accordion className={classes.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="additional-information-content"
              id="additional-information-header"
              className={classes.accordionSummary}
            >
              Informations supplémentaires
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              {produit.infos_additionnelles}
            </AccordionDetails>
          </Accordion>
          <Accordion className={classes.accordion}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="description-content"
              id="description-header"
              className={classes.accordionSummary}
            >
              Description
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              {produit.description_produit}
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </div>
  );
}
