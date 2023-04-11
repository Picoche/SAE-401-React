import "./styles.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import ResponsiveAppBar from "./views/ResponsiveAppBar";
import AccueilNCView from "./views/AccueilNCView";
import InscView from "./views/InscView";
import Footer from "./components/Footer";
import ConnectView from "./views/ConnectView";
import InfoComView from "./views/InfoComView";
//-------------------------------------------------------------------
import ProduitView from "./views/ProduitView";
import DispoView from "./views/DispoView";
import ProfileView from "./views/ProfileView";
import AccountView from "./views/AccountView";
import MapView from "./views/MapView";
import LogoutView from "./views/LogoutView";
import Typography from "@mui/material/Typography";

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
    return (
      <Route
        {...rest}
        element={
          user && user.id_user ? (
            <Component />
          ) : (
            <Navigate to="/login" replace />
          )
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
        <ResponsiveAppBar></ResponsiveAppBar>
        <Container sx={{ py: 10, minHeight: 500 }} maxWidth="xl">
          <Typography></Typography>
          <UserContext.Provider value={{ userContext, setUserContext }}>
            <Routes>
              <Route path="/" element={<AccueilNCView />} />
              <Route path="/inscription" element={<InscView />} />
              <Route path="/login" element={<ConnectView />} />
              <Route
                path="/devcommercant"
                element={<PrivateRoute element={<InfoComView />} />}
              />

              {/* //--------------------------- ------------------------------------------*/}

              <PrivateRoute path="/dispo" element={<DispoView />} />
              <PrivateRoute path="/produit" element={<ProduitView />} />
              <PrivateRoute path="/profil" element={<ProfileView />} />
              <PrivateRoute path="/account" element={<AccountView />} />
              <PrivateRoute path="/boutiques" element={<MapView />} />
              <PrivateRoute path="/logout" element={<LogoutView />} />
            </Routes>
          </UserContext.Provider>
        </Container>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
