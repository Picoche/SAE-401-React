import "./styles.css";
import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import ResponsiveAppBar from "./views/ResponsiveAppBar";
// import Header from "./components/Header";
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

  const PrivateRoute = ({ element: Component, ...rest }) => {
    const { userContext } = useContext(UserContext);
    return (
      <Route
        {...rest}
        element={
          userContext && userContext.id_user
            ? Component
            : () => <Navigate to="/login" replace />
        }
      />
    );
  };

  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div className="App">
      <BrowserRouter>
      {/* <Header></Header> */}
        <ResponsiveAppBar></ResponsiveAppBar>
        <Container sx={{ py: 10, minHeight: 500 }} maxWidth="xl">
          <Typography></Typography>
          <UserContext.Provider value={{ userContext, setUserContext }}>
            <Routes>
              <Route path="/" element={<AccueilNCView />} />
              <Route path="/inscription" element={<InscView />} />
              <Route path="/login" element={<ConnectView />} />
              <Route path="/devcommercant" element={<InfoComView />} />

              {/* //--------------------------- ------------------------------------------*/}

              <Route path="/dispo" element={<DispoView />} />
              <Route path="/produit" element={<ProduitView />} />
              <Route path="/profil" element={<ProfileView />} />
              <Route path="/account" element={<AccountView />} />
              <Route path="/boutiques" element={<MapView />} />
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
