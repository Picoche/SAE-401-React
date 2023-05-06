import React, { useState, useEffect, useMemo, lazy, Suspense } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";

import SetMapView from "./SetMapView";
const CarteBoutique = lazy(() => import("./CarteBoutique"));

export default function BuildMap({
  userPosition,
  zoom,
  boutiquesPosition,
  handleViewBoutique,
  handleBoutiqueSelect,
  selectedBoutique,
}) {
  const [detailsBoutiques, setDetailsBoutiques] = useState([]);
  const [mapSelected, isMapSelected] = useState(false);

  useEffect(() => {
    const getPlacesId = async () => {
      const list = await Promise.allSettled(
        boutiquesPosition.map(async (boutique) => {
          const data = await getShopInfo(boutique);
          return data;
        })
      );
      const dataList = list
        .filter((result) => result.status === "fulfilled")
        .map((result) => result.value);
      setDetailsBoutiques(dataList);
    };
    if (boutiquesPosition.length > 0) {
      getPlacesId();
    }
  }, [boutiquesPosition]);

  const markers = useMemo(() => {
    return detailsBoutiques.map((details, index) => (
      <Marker position={details.position} key={index}>
        <Popup>
          <h3>{details.name}</h3>
          <div style={styles.popupRating}>
            <Rating
              name="read-only"
              value={details.rating}
              precision={0.5}
              readOnly
            />
            <span>({details.ratingNumber})</span>
          </div>
          <Button
            style={styles.voirBoutiqueBtn}
            variant="contained"
            size="small"
            onClick={() => {
              handleViewBoutique(details);
              isMapSelected(true);
            }}
          >
            Voir la boutique
          </Button>
        </Popup>
      </Marker>
    ));
  }, [detailsBoutiques, handleViewBoutique]);

  return (
    <div>
      <MapContainer
        center={userPosition}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: 500 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SetMapView userPosition={userPosition} zoom={zoom} />
        {markers}
      </MapContainer>
      {mapSelected ? (
        <Suspense fallback={<div>Loading...</div>}>
          <CarteBoutique
            boutique={selectedBoutique}
            handleBoutiqueSelect={handleBoutiqueSelect}
          />
        </Suspense>
      ) : null}
    </div>
  );
}

const styles = {
  voirBoutiqueBtn: {
    display: "flex",
    justifyContent: "center",
    marginTop: 10,
  },
  popupRating: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
  },
};
