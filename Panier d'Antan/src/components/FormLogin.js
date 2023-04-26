import React, { useState, useEffect, useContext, useCallback } from "react";
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

import { Link, useNavigate } from "react-router-dom";

import { UserContext } from "../UserContext";

export default function SignIn() {
  const navigate = useNavigate();
  const { user, logIn } = useContext(UserContext);

  const [data, setData] = useState({});
  const [logInFeedback, setLogInFeedback] = useState(null);

  const logInSuccess = useCallback((data) => {
    logIn(data.user);
    navigate("/cartes");
  }, []);

  const updateData = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(data);
    fetch("https://panier-antan.mmicastres.fr/public/api/connexion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === 1) {
          logInSuccess(data);
        } else {
          setLogInFeedback(
            "Votre email ou votre mot de passe est incorrect, veuillez réessayer."
          );
        }
      });
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <Container component="main" maxWidth="xs">
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
            onChange={updateData}
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
            onChange={updateData}
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
        {logInFeedback ? logInFeedback : ""}
      </Box>
    </Container>
  );
}
