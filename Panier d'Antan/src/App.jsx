import "./styles.css";
import "@fontsource/roboto";
import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

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
import ProduitView from "./views/ProduitView";
import DispoView from "./views/DispoView";
import ProfileView from "./views/ProfileView";
import AccountView from "./views/AccountView";
import LogoutView from "./views/LogoutView";
import BoutiqueView from "./views/BoutiqueView";

import UserContext from "./UserContext";

import Container from "@mui/material/Container";

export default function App() {
  const [selectedBoutique, setSelectedBoutique] = useState([]);
  const [user, setUser] = useState({
    MDP: "",
    administrateur: 0,
    adresse: "",
    commercant: 0,
    date_insc: "",
    id_user: 0,
    image_profil: null,
    mail: "",
    nom_user: "",
    prenom_user: "",
    pseudo: "",
  });

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    console.log(user);
  }, [user]);

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser({
      MDP: "",
      administrateur: 0,
      adresse: "",
      commercant: 0,
      date_insc: "",
      id_user: 0,
      image_profil: null,
      mail: "",
      nom_user: "",
      prenom_user: "",
      pseudo: "",
    });
  };

  return (
    <div className="App">
      <BrowserRouter>
        <ResponsiveAppBar user={user} logout={logout} />
        <Container sx={{ py: 10, minHeight: 500 }} maxWidth="xl">
          <Typography></Typography>
          <UserContext.Provider value={{ user, login }}>
            <Routes>
              <Route path="/" element={<AccueilNCView />} />
              <Route path="/inscription" element={<InscView />} />
              <Route path="/login" element={<ConnectView />} />
              <Route path="/devcommercant" element={<InfoComView />} />
              <Route
                path="/boutiques"
                element={
                  <MapView
                    selectedBoutique={selectedBoutique}
                    setSelectedBoutique={setSelectedBoutique}
                  />
                }
              />
              <Route path="/boutique/:id/produits" element={<BoutiqueView />} />
              <Route path="/boutique/:id/produits" element={<BoutiqueView />} />
              <Route
                path="/boutique/:id/produits/:id_produit"
                element={<ProduitView />}
              />

              {/* //---------------------------------------------------------------------*/}

              <Route path="/dispo" element={<DispoView />} />
              <Route path="/produit" element={<ProduitView />} />
              <Route path="/profil" element={<ProfileView />} />
              <Route path="/account" element={<AccountView />} />
              <Route path="/logout" element={<LogoutView />} />
              <Route path="/boucherie" element={<BoucherieAddProd />} />
              <Route path="/boulangerie" element={<BoulangerieAddProd />} />
              <Route path="/epicerie" element={<EpicerieAddProd />} />
              <Route path="/poissonerie" element={<PoissonerieAddProd />} />
              <Route path="/vetement" element={<VetementAddProd />} />
            </Routes>
          </UserContext.Provider>
        </Container>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
