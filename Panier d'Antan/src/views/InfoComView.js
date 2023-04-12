import { Button, Typography, createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import "@fontsource/unbounded";
import { Link } from "react-router-dom";
import "../styles.css";
import shop1 from "../assets/shop1.svg";
import shop2 from "../assets/shop_bandeau.svg";
import shop3 from "../assets/question1.svg";
import shop4 from "../assets/support2.svg";
import shop5 from "../assets/commerce3.svg";



export default function InfoComView() {
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
    <div style={{
      backgroundColor: "#FFFF",
      textAlign: "center",
      alignItems: "center",
    }}>
      <div style={{
        display: "flex",
        flexDirection: "collumn"
      }}>
        <div className="divAccueilNC">
          <img src={shop2} className="imgAccueilNC"></img>
        </div>
        <div style={{
          display: "flex",
          flexDirection: "column"
        }}>
          <ThemeProvider theme={titre}>
            <Typography variant="h5" sx={{ fontWeight: "bold", margin: "20px 15px" }}>
              Vous êtes commerçant et voulez vous inscrire en tant que tel ? C'est ici !
            </Typography>
          </ThemeProvider>
          <Link>
            <Button variant="contained" className="button" style={{
              borderRadius: "30%",
              margin: "20px 15px",
            }}>
              <Typography>COMMERCANT</Typography>
            </Button>
          </Link>
        </div>
        <div>
        </div>
        <img src={shop1} className="imgAccueilNC"></img>
      </div>

      <div style={{
         backgroundColor: "#F5F5F5",
         display: "flex",
         flexDirection: "row"
      }}>
       
        <div>
        <ThemeProvider theme={titre}>
        <Typography variant="h5" sx={{ fontWeight: "bold", margin: "20px 15px", color:"#FF9914" }}>
        Comment ca marche ?
            </Typography>
        </ThemeProvider>

          <div className="blocDevComNC">
          <Typography>
                          En vous inscrivant en tant que commerçant, vous aurez la possibilité
              de référencer votre (ou vos) boutique(s) sur notre application !
              Pour ce faire, il vous suffit de remplir le formulaire situé en pied
              de page. Une fois envoyé, notre équipe se chargera des derniers
              détails, et vous enverra un email de confirmation de création de
              compte commerçant vous indiquant les identifiants qui vous
              permettront de gérer votre (ou vos) boutique(s).
            </Typography>
            </div>
        </div>
        <img src={shop3} className="imgAccueilNC"></img>
      </div>

      {/*  */}
      <div className="h2DevComNC">
      <img src={shop4} className="imgAccueilNC"></img>

      <ThemeProvider theme={titre}>
        <Typography variant="h5" sx={{ fontWeight: "bold", margin: "20px 15px", color:"#FF9914" }}>
        D'accord, mais concrètement, qu'est ce que j'y gagne ?
        </Typography>
        </ThemeProvider>
        <div className="blocDevComNC">
          <p>
            Comme vous l’avez peut-être lu sur notre page d’accueil, le but de
            cette initiative est d’accompagner la transition numérique des
            commerces de villages afin de les familiariser à une cible plus
            jeune et toujours plus moderne. En clair, en vous aidant à vous
            glisser dans la poche des jeunes, nous vous permettons d’augmenter
            de manière potentiellement significative votre chiffre d’affaires,
            tout en proposant à ces derniers une façon simple et rapide de
            renouer des liens avec des commerces de qualité.
          </p>
        </div>

      </div>
      <div className="h2DevComNC">
        <h3>Je ne suis pas très à l'aise avec ce type d'outils ?</h3>
        <div className="blocDevComNC">
          <p>
            Aucun problème ! Notre application a été pensée pour vous offrir une
            interface aussi complète que simple d’utilisation ! Au travers
            d’icônes facilement identifiables et d’un guide d’utilisation pensé
            pour vous, nous sommes confiant dans le court temps d’adaptation
            nécessaire à sa pleine utilisation. Bien sûr, si vous rencontrez
            tout de même des difficultés vis-à-vis de son utilisation, vous avez
            à votre disposition l’espace FAQ-Support, accessible en cliquant sur
            l’icône ?, en haut à droite de la page. Si les réponses déjà
            présentes ne résolvent pas votre problème, vous pourrez toujours
            envoyer un mail à notre équipe de support via le formulaire situé au
            pied de cette page FAQ-Support, laquelle reviendra alors vers vous
            aussi rapidement que possible afin d’éclairer les zones d’ombres.
          </p>
        </div>
      </div>
      <div className="h2DevComNC">
        <h3>
          Convaincus ? Alors n'attendez plus, créez votre compte commerçant dès
          maintenant !
        </h3>
        <Button variant="contained" className="button">
          COMMERCANT
        </Button>
        <div className="blocDevComNC"></div>
      </div>
    </div >

  );
}
