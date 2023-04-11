import React, { useState, useEffect, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import UserContext from "../UserContext";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Panier d'Antan
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function FormBoulangerie() {
  const { userContext } = useContext(UserContext);
  console.log(userContext);

  const [user, setUser] = useState({});

  const updateData = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };


//--------------------------------- A REVOIR -------------------------------------------------------------------------------------

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(user);
    if (user.MDP === user.confmdp) {
      fetch("https://panier-antan.mmicastres.fr/api/boucherie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    } else {
      alert("Les mots de passe ne correspondent pas");
    }
  };

// ----------------------------------------------------------------------------------------------------------------------------------


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          
          <Typography component="h1" variant="h5">
            Ajouter un produit
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="nom_produit"
                  required
                  fullWidth
                  id="nom_produit"
                  label="Nom du produit"
                  autoFocus
                  onChange={updateData}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  id="prix_produit"
                  label="Prix"
                  name="prix_produit"
                  autoComplete="family-name"
                  onChange={updateData}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="tag_produit_boulangerie"
                  fullWidth
                  id="tag_produit_boulangerie"
                  label="Tags"
                  autoFocus
                  onChange={updateData}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="type_produit"
                  label="Type de pains et de vienoiseries"
                  name="type_produit"
                  autoComplete="family-name"
                  onChange={updateData}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="description_produit"
                  label="Description du produit"
                  name="description_produit"
                  autoComplete="description"
                  onChange={updateData}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="info_additionnelles"
                  label="Infos additionnelles"
                  type="info_additionnelles"
                  id="info_additionnelles"
                  autoComplete="new-password"
                  onChange={updateData}
                />
              </Grid>
              {/* <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid> */}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                AJOUT DU PRODUIT
              </Button>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
