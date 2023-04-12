import React, { useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import UserContext from "../UserContext";

import { Link } from "react-router-dom";

export default function FormLogin() {
  const { setUserContext } = useContext(UserContext);

  const [logInFeedback, setLogInFeedback] = useState([]);
  const [formData, setFormData] = useState({
    mail: "",
    MDP: "",
  });

  const updateFormData = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://panier-antan.herokuapp.com/public/api/connexion",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.status === 1) {
        console.log(data);
        setUserContext(data.user);
      } else {
        // handle login error
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Se connecter
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="mail"
            label="Mail"
            name="mail"
            autoComplete="mail"
            autoFocus
            value={formData.mail}
            onChange={updateFormData}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="MDP"
            label="Mot de passe"
            type="password"
            id="MDP"
            autoComplete="current-password"
            value={formData.MDP}
            onChange={updateFormData}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Se souvenir de moi"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            CONNEXION
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/inscription">{"Pas de compte ? Créer un compte"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
