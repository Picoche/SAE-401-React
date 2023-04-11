import Container from "@mui/material/Container";
import shop1 from "../assets/shop1.svg";
import React from "react";
import "../styles.css";
import { Button, Typography, createTheme, ThemeProvider } from "@mui/material";
import "@fontsource/unbounded";
import { Link } from "react-router-dom";

export default function AccueilNCView() {
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
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        textAlign: "center",
      }}
    >
      <div className="divAccueilNC">
        <img src={shop1} className="imgAccueilNC"></img>
        <div>
          <ThemeProvider theme={titre}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Au plus proche des commerçants
            </Typography>
          </ThemeProvider>
          <Link to="/inscription">
            <Button variant="contained" className="button">
              <Typography>INSCRIPTION</Typography>
            </Button>
          </Link>
        </div>
        <img src={shop1} className="imgAccueilNC"></img>
      </div>
      <div className="blocAccueilNC">
        <ThemeProvider theme={titre}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Qu'est ce que "Panier d'Antan" ?
          </Typography>
        </ThemeProvider>

        <div className="blocAccueilNC">
          <ThemeProvider theme={normal}>
            <Typography>
              Différents des sites e-commerce traditionnels, Panier d’Antan
              permet la revalorisation de nos commerces de villages au travers
              d’un moyen pour ces derniers de se digitaliser, et ainsi de suivre
              la tendance du commerce en ligne, si attrayante auprès des jeunes.
              Créé en 2023 et géré par des professionnels, Panier d’Antan permet
              aux commerçants de gérer facilement leur boutique et leurs
              produits. En bref, Panier d’Antan est un site e-commerce qui
              référence les petits magasins et commerces des villages autour de
              vous !
            </Typography>
          </ThemeProvider>
        </div>
      </div>
      <div className="blocAccueilNC">
        <ThemeProvider theme={titre}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Dans quel but ?
          </Typography>
        </ThemeProvider>

        <div className="blocAccueilNC">
          <ThemeProvider theme={normal}>
            <Typography>
              Avec l’essor des applications de livraisons de repas et de courses
              alimentaires à domicile et l’intérêt que porte la grande
              distribution à ces moyens de vente, les petits commerces n’ayant
              pas pu suivre la tendance se sont retrouvé au second plan et
              éloigné d’une clientèle jeune. En aidant ces commerces à franchir
              le pas, nous espérons remettre au goût du jour les boutiques de
              village auprès d’une démographie favorisant la facilité à
              l’authenticité.
            </Typography>
          </ThemeProvider>
        </div>
      </div>
      <div className="blocAcceuilNC">
        <ThemeProvider theme={titre}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Pouvons nous utiliser le site partout en France ?
          </Typography>
        </ThemeProvider>
        <div className="blocAccueilNC">
          <ThemeProvider theme={normal}>
            <Typography>
              Absolument ! Vous pouvez rechercher les boutiques autour de vous
              en temps réel grâce à la géolocalisation, ou tout simplement en
              saisissant une adresse et une zone de recherche en km à la ronde
              autour de ce point !
            </Typography>
          </ThemeProvider>
        </div>
      </div>
      <div className="blocAcceuilNC">
        <ThemeProvider theme={titre}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Mais Panier d'Antan c'est aussi une application !
          </Typography>
        </ThemeProvider>

        <div className="blocAccueilNC">
          <ThemeProvider theme={normal}>
            <Typography>
              Pour Android et iOS, téléchargez l’application Panier d’Antan dès
              maintenant !
            </Typography>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}
