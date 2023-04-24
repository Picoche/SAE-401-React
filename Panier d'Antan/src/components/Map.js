import React, { useState, useEffect, useContext, useCallback } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { useGeolocated } from "react-geolocated";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import Favorite from "@mui/icons-material/Favorite";

import { UserContext } from "../UserContext";
import getShopInfo, { getUserLocation } from "../ExternalAPICalls";

function SetMapView({ userPosition, zoom }) {
  const map = useMap();
  map.setView(userPosition, zoom);
  return null;
}

export default function Map({ selectedBoutique, setSelectedBoutique }) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [boutiqueCard, showBoutiqueCard] = useState([]);
  const [boutiquesPosition, setBoutiquesPosition] = useState([]);
  const [userPosition, setUserPosition] = useState([43.604652, 1.444209]);
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
    const getBoutiques = () => {
      fetch("https://panier-antan.mmicastres.fr/public/api/boutiques")
        .then((response) => response.json())
        .then((data) => {
          setBoutiquesPosition(data);
        });
    };
    getBoutiques();
  }, []);

  useEffect(() => {
    if (coords) {
      getUserLocation(user.adresse).then((data) =>
        setUserPosition([
          data.candidates[0].geometry.location.lat,
          data.candidates[0].geometry.location.lng,
        ])
      );
      // console.log(userPosition);
    }
  }, [coords, user.adresse, url, apiKey]);

  return !isGeolocationAvailable ? (
    <div>Votre navigateur ne supporte pas la géolocalisation</div>
  ) : !isGeolocationEnabled ? (
    <div>Veuillez activer la géolocalisation</div>
  ) : coords ? (
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

function BuildMap({
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
    getPlacesId();
  }, [boutiquesPosition]);

  useEffect(() => {
    console.log(detailsBoutiques);
  }, [detailsBoutiques]);

  return (
    <div>
      <MapContainer
        center={userPosition}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: 500 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SetMapView userPosition={userPosition} zoom={zoom} />
        {detailsBoutiques.map((details, index) => (
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
        ))}
      </MapContainer>
      {mapSelected ? (
        <CarteBoutique
          boutique={selectedBoutique}
          handleBoutiqueSelect={handleBoutiqueSelect}
        />
      ) : null}
    </div>
  );
}

function CarteBoutique({ boutique, handleBoutiqueSelect }) {
  const [photosBoutiques, setPhotosBoutiques] = useState(null);

  const fetchPhotos = useCallback(async () => {
    if (boutique.photos && boutique.photos.length > 0) {
      const photoReference = boutique.photos[0].photo_reference;
      const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=AIzaSyDPpCouT8a5CIliE6YhC3tJ4we32-jy6vY`;
      setPhotosBoutiques(photoUrl);
    }
  }, [boutique, setPhotosBoutiques]);

  // "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" +
  //   boutique.photos[0].photo_reference +
  //   "&key=AIzaSyDPpCouT8a5CIliE6YhC3tJ4we32-jy6vY";

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  return (
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderWidth: "5px",
          borderColor: " yellow",
        }}
      >
        <h3>{boutique.name}</h3>
        <img src={photosBoutiques} style={{ marginBottom: "2rem" }}></img>
        <Button
          variant="contained"
          size="small"
          onClick={() => {
            handleBoutiqueSelect(boutique);
          }}
        >
          Voir la boutique
        </Button>
      </div>
    ),
    (
      <div
        style={{
          marginTop: "35px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card variant="outlined" sx={{ width: 400 }}>
          <CardOverflow>
            <AspectRatio ratio="2">
              <img src={photosBoutiques} style={{ marginBottom: "2rem" }} />
            </AspectRatio>
            <IconButton
              aria-label="Like minimal photography"
              size="md"
              variant="solid"
              color="danger"
              sx={{
                position: "absolute",
                zIndex: 2,
                borderRadius: "50%",
                right: "1rem",
                bottom: 0,
                transform: "translateY(50%)",
              }}
            >
              <Favorite />
            </IconButton>
          </CardOverflow>
          <Typography level="h2" sx={{ fontSize: "md", mt: 2 }}>
            {boutique.name}
          </Typography>
          <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
            {boutique.address[0].long_name} {boutique.address[1].long_name}
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Rating
              name="read-only"
              value={boutique.rating}
              precision={0.5}
              readOnly
            />

            <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
              ({boutique.ratingNumber})
            </Typography>
          </div>
          <div
            style={{
              margin: "0px 0px 15px 0px",
            }}
          >
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                handleBoutiqueSelect(boutique);
              }}
            >
              Voir la boutique
            </Button>
          </div>
          <Divider inset="context" />
          <CardOverflow
            variant="soft"
            sx={{
              display: "flex",
              gap: 1.5,
              py: 1.5,
              px: "var(--Card-padding)",
              bgcolor: "background.level1",
            }}
          >
            {boutique.hours.weekday_text.map((day, index) => (
              <Typography
                key={index}
                level="body3"
                sx={{ fontWeight: "md", color: "text.secondary" }}
              >
                {day}
              </Typography>
            ))}
          </CardOverflow>
        </Card>
      </div>
    )
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
