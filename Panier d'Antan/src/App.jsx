import "./styles.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import ResponsiveAppBar from "./views/ResponsiveAppBar";
import AccueilNCView from "./views/AccueilNCView";
import InscView from "./views/InscView";
import Footer from "./components/Footer";
import ConnectView from "./views/ConnectView";
import InfoComView from "./views/InfoComView";
import Typography from "@mui/material/Typography";
import BoucherieAddProd from "./views/BoucherieAddProdView";
import BoulangerieAddProd from "./views/BoulangerieAddView";
import MapView from "./views/MapView";
import EpicerieAddProd from "./views/EpicerieAddProdView";
import PoissonerieAddProd from "./views/PoissonerieAddProdView";
import VetementAddProd from "./views/VetementAddProdView";

//-------------------------------------------------------------------
import ProduitView from "./views/ProduitView";
import DispoView from "./views/DispoView";
import ProfileView from "./views/ProfileView";
import AccountView from "./views/AccountView";
import LogoutView from "./views/LogoutView";



import UserContext from "./UserContext";

import Container from "@mui/material/Container";

export default function App() {
  const [userContext, setUserContext] = useState({
    MDP: "99211794b7f9b20ea56632d3c7da44a6",
    administrateur: 1,
    adresse: "18 rue Croix de Fournès, 81100 Castres",
    commercant: 1,
    date_insc: "2023-03-14",
    id_user: 1729764896,
    image_profil: null,
    mail: "hombert.fabien@gmail.com",
    nom_user: "Hombert",
    prenom_user: "Fabien",
    pseudo: "Picoche",
  });
  const user = { userContext, setUserContext };

  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div className="App">
      <BrowserRouter>
        <ResponsiveAppBar></ResponsiveAppBar>
        <Container sx={{ py: 10, minHeight: 500 }} maxWidth="xl">
          <UserContext.Provider value={user}>
            <Typography></Typography>
            <Routes>
              <Route path="/" element={<AccueilNCView />} />
              <Route path="/inscription" element={<InscView />} />
              <Route path="/login" element={<ConnectView />} />
              <Route path="/devcommercant" element={<InfoComView />} />
              <Route path="/boutiques" element={<MapView />} />
              <Route path="/boucherie" element={<BoucherieAddProd/>}/>
              <Route path="/boulangerie" element={<BoulangerieAddProd/>}/>
              <Route path="/epicerie" element={<EpicerieAddProd/>}/>
              <Route path="/poissonerie" element={<PoissonerieAddProd/>}/>
              <Route path="/vetement" element={<VetementAddProd/>}/>

              {/* //--------------------------- ------------------------------------------*/}

              <Route path="/dispo" element={<DispoView />} />
              <Route path="/produit" element={<ProduitView />} />
              <Route path="/profil" element={<ProfileView />} />
              <Route path="/account" element={<AccountView />} />
              <Route path="/logout" element={<LogoutView />} />
              
            </Routes>
          </UserContext.Provider>
        </Container>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
