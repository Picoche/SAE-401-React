import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useGeolocated } from "react-geolocated";

import { UserContext } from "../UserContext";
import getUserLocation from "../ExternalAPICalls";
import BuildMap from "./BuildMap";

export default function Map({ selectedBoutique, setSelectedBoutique }) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [boutiqueCard, showBoutiqueCard] = useState([]);
  const [boutiquesPosition, setBoutiquesPosition] = useState([]);
  const [userPosition, setUserPosition] = useState(null);
  const [zoom, setZoom] = useState(14);

  const handleViewBoutique = useCallback((boutique) => {
    setSelectedBoutique(boutique);
    console.log(boutique);
  }, []);

  const handleBoutiqueSelect = useCallback((boutique) => {
    console.log(boutique);
    navigate(`/boutique/${boutique.id}/produits`, {
      boutique: boutique,
    });
  }, []);

  const url = "https://api.geocodify.com/v2/geocode?api_key=";
  const apiKey = "4cdfd72e4860b817f9279f98e9d41f271fa9793b&q=";

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      watchPosition: false,
      userDecisionTimeout: 5000,
    });

  useEffect(() => {
    const getBoutiques = async () => {
      const response = await fetch(
        "https://panier-antan.mmicastres.fr/public/api/boutiques"
      );
      const data = await response.json();
      setBoutiquesPosition(data);
    };

    getBoutiques();

    if (coords) {
      getUserLocation(user.adresse).then((data) =>
        setUserPosition([
          data.candidates[0].geometry.location.lat,
          data.candidates[0].geometry.location.lng,
        ])
      );
    }
  }, [coords, user.adresse, url, apiKey]);

  return !isGeolocationAvailable ? (
    <div>Votre navigateur ne supporte pas la géolocalisation</div>
  ) : !isGeolocationEnabled ? (
    <div>Veuillez activer la géolocalisation</div>
  ) : userPosition ? (
    <BuildMap
      userPosition={userPosition}
      zoom={zoom}
      boutiquesPosition={boutiquesPosition}
      handleViewBoutique={handleViewBoutique}
      handleBoutiqueSelect={handleBoutiqueSelect}
      selectedBoutique={selectedBoutique}
    />
  ) : (
    <div>En attente des données de géolocalisation&hellip; </div>
  );
}
