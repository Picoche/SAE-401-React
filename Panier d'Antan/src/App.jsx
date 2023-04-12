import "./styles.css";
import "@fontsource/roboto";
import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import ResponsiveAppBar from "./views/ResponsiveAppBar";
import ResponsiveConnectAppBar from "./Views/ResponsiveConnectAppBar";
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
import BoutiqueView from "./views/BoutiqueView";

import Container from "@mui/material/Container";

import UserContext, { UserProvider } from "./UserContext";

export default function App() {
  const [photosBoutiques, setPhotosBoutiques] = useState(null);
  const [selectedBoutique, setSelectedBoutique] = useState([]);
  const { user } = useContext(UserContext);
  return (
    <div className="App">
      <BrowserRouter>
        {user ? <ResponsiveConnectAppBar /> : <ResponsiveAppBar />}
        <Container sx={{ py: 10, minHeight: 500 }} maxWidth="xl">
          <Typography></Typography>
          <UserProvider>
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
              <Route path="/boutique/:id/produits" element={<BoutiqueView photosBoutiques={photosBoutiques} setPhotosBoutiques={setPhotosBoutiques} />} />
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
          </UserProvider>
        </Container>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
