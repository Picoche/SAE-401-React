import React, { useState, useEffect, useContext, handleChange } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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

export default function FormVetement() {
    const { userContext } = useContext(UserContext);
    console.log(userContext);

    const [user, setUser] = useState({});

    const [age, setAge] = React.useState('');

    const updateData = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value,
        });
    };


    //--------------------------------- A REVOIR -------------------------------------------------------------------------------------

    const handleSubmit = (event) => {
        event.preventDefault();
        setAge(event.target.value);
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
                                <FormControl fullWidth >
                                    <InputLabel id="demo-simple-select-label">Tags</InputLabel>
                                    <Select
                                        labelId="tag_vetement"
                                        id="tag_vetement"
                                        value={age}
                                        label="Tags"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth >
                                    <InputLabel id="demo-simple-select-label">Type de vêtement</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={age}
                                        label="Type de vêtement"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth >
                                    <InputLabel id="demo-simple-select-label">Matières du produit</InputLabel>
                                    <Select
                                        labelId="composition_vetement"
                                        id="composition_vetement"
                                        value={age}
                                        label="Matières du produit"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth >
                                    <InputLabel id="demo-simple-select-label">Types de manches</InputLabel>
                                    <Select
                                        labelId="nom_longueur_manche"
                                        id="nom_longueur_manche"
                                        value={age}
                                        label="Types de manches"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth >
                                    <InputLabel id="demo-simple-select-label">Type de col</InputLabel>
                                    <Select
                                        labelId="nom_col_vetement"
                                        id="nom_col_vetement"
                                        value={age}
                                        label="Types de col"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                          

                            <Grid item xs={12}>
                                <FormControl fullWidth >
                                    <InputLabel id="demo-simple-select-label">Type de coupe</InputLabel>
                                    <Select
                                        labelId="nom_coupe_vetement"
                                        id="nom_coupe_vetement"
                                        value={age}
                                        label="Types de coupe"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl fullWidth >
                                    <InputLabel id="demo-simple-select-label">Longueur des manches</InputLabel>
                                    <Select
                                        labelId="nom_longueur_manche"
                                        id="nom_longueur_manche"
                                        value={age}
                                        label="Longueur des manches"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
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
                            {/* ----------------------------------------J'EN SUIS A ICI--------------------------------- */}



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
