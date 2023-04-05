import Container from "@mui/material/Container";
import shop1 from "../assets/shop1.svg";
import React from "react";
import "../styles.css";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function AccueilNCView() {
  return (
    <div>
      <div className="divAccueilNC">
        <img src={shop1} className="imgAccueilNC"></img>
        <div>
          <h2 id="h2AccueilNC">Au plus proche des commerçants</h2>
          <Link to="/inscription">
            <Button variant="contained" className="button">
              <Typography>INSCRIPTION</Typography>
            </Button>
          </Link>
        </div>
        <img src={shop1} className="imgAccueilNC"></img>
      </div>
      <div className="blocAccueilNC">
        <h3>Qu'est ce que "Panier d'Antan" ?</h3>
        <div className="blocAccueilNC">
          <p>
            Différents des sites e-commerce traditionnels, Panier d’Antan permet
            la revalorisation de nos commerces de villages au travers d’un moyen
            pour ces derniers de se digitaliser, et ainsi de suivre la tendance
            du commerce en ligne, si attrayante auprès des jeunes. Créé en 2023
            et géré par des professionnels, Panier d’Antan permet aux
            commerçants de gérer facilement leur boutique et leurs produits. En
            bref, Panier d’Antan est un site e-commerce qui référence les petits
            magasins et commerces des villages autour de vous !
          </p>
        </div>
      </div>
      <div className="blocAcceuilNC">
        <h3>Dans quel but ?</h3>
        <div className="blocAccueilNC">
          <p>
            Avec l’essor des applications de livraisons de repas et de courses
            alimentaires à domicile et l’intérêt que porte la grande
            distribution à ces moyens de vente, les petits commerces n’ayant pas
            pu suivre la tendance se sont retrouvé au second plan et éloigné
            d’une clientèle jeune. En aidant ces commerces à franchir le pas,
            nous espérons remettre au goût du jour les boutiques de village
            auprès d’une démographie favorisant la facilité à l’authenticité.
          </p>
        </div>
      </div>
      <div className="blocAcceuilNC">
        <h3>Pouvons nous utiliser le site partout en France ?</h3>
        <div className="blocAccueilNC">
          <p>
            Absolument ! Vous pouvez rechercher les boutiques autour de vous en
            temps réel grâce à la géolocalisation, ou tout simplement en
            saisissant une adresse et une zone de recherche en km à la ronde
            autour de ce point !
          </p>
        </div>
      </div>
      <div className="blocAcceuilNC">
        <h3>Mais Panier d'Antan c'est aussi une application !</h3>
        <div className="blocAccueilNC">
          <p>
            Pour Android et iOS, téléchargez l’application Panier d’Antan dès
            maintenant !
          </p>
        </div>
      </div>
    </div>
  );
}
