import "./styles.css";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

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
import DashboardView from "./views/DashboardView";
import LogoutView from "./views/LogoutView";

import Container from "@mui/material/Container";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ResponsiveAppBar></ResponsiveAppBar>
        <Container sx={{ py: 10, minHeight: 500 }} maxWidth="xl">
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
            <Route path="/dashboard" element={<DashboardView />} />
            <Route path="/logout" element={<LogoutView />} />
          </Routes>
        </Container>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
