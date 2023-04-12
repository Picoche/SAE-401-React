import React, { useState, useEffect, useContext, useCallback } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { useGeolocated } from "react-geolocated";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Favorite from '@mui/icons-material/Favorite';

import UserContext from "../UserContext";
import { map } from "leaflet";

const GET_LOCATION_URL = "http://localhost:4000/boutiques/places?input=";
const BOUTIQUES_DETAILS_URL =
  "http://localhost:4000/boutiques/places/details?place_id=";
const BOUTIQUE_PHOTOS_URL =
  "http://localhost:4000/boutiques/places/photo?photoreference=";

function SetMapView({ userPosition, zoom }) {
  const map = useMap();
  map.setView(userPosition, zoom);
  return null;
}

export default function Map({ selectedBoutique, setSelectedBoutique }) {
  const navigate = useNavigate();
  const { userContext } = useContext(UserContext);
  const [boutiqueCard, showBoutiqueCard] = useState([]);
  const [boutiquesPosition, setBoutiquesPosition] = useState([]);
  const [userPosition, setUserPosition] = useState([43.604652, 1.444209]);
  const [zoom, setZoom] = useState(14);

  const handleViewBoutique = useCallback((boutique) => {
    setSelectedBoutique(boutique);
    console.log(boutique);
  }, []);

  const handleBoutiqueSelect = useCallback((boutique) => {
    navigate(`/boutique/${boutique.infoSupp.id_boutique}/produits`);
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
      fetch("https://panier-antan.herokuapp.com/public/api/boutiques")
        .then((response) => response.json())
        .then((data) => {
          setBoutiquesPosition(data);
        });
    };
    getBoutiques();
  }, []);

  useEffect(() => {
    if (coords) {
      fetch(`${GET_LOCATION_URL}${userContext.adresse}`).then((response) => {
        response.json().then((data) => {
          console.log(data.candidates);
          setUserPosition([
            data.candidates[0].geometry.location.lat,
            data.candidates[0].geometry.location.lng,
          ]);
          console.log(userPosition);
        });
      });
    }
  }, [coords, userContext.adresse, url, apiKey]);

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
      const newPlacesId = await Promise.allSettled(
        boutiquesPosition.map(async (boutique) => {
          const response = await fetch(
            `${GET_LOCATION_URL}${boutique.adresse_boutique}+${boutique.nom_boutique}`
          );
          const data = await response.json();
          if (data.candidates) {
            return {
              place_id: data.candidates[0].place_id,
              info: boutique,
            };
          } else {
            return null;
          }
        })
      );
      // Filter out any null values returned by the Promise.allSettled function
      const filteredPlacesId = newPlacesId
        .filter((place) => place.status === "fulfilled")
        .map((place) => place.value);
      setDetailsBoutiques([]);
      // Only call getDetailsBoutiques if there are places to get details for
      if (filteredPlacesId.length > 0) {
        getDetailsBoutiques(filteredPlacesId);
      }
    };
    getPlacesId();
  }, [boutiquesPosition]);

  const getDetailsBoutiques = async (placesid) => {
    const newDetailsBoutiques = await Promise.allSettled(
      placesid.map(async (place) => {
        const response = await fetch(
          `${BOUTIQUES_DETAILS_URL}${place.place_id}`
        );
        const data = await response.json();
        if (data.result) {
          return {
            position: [
              data.result.geometry.location.lat,
              data.result.geometry.location.lng,
            ],
            rating: data.result.rating,
            ratingNumber: data.result.user_ratings_total,
            hours: data.result.opening_hours,
            reviews: data.result.reviews,
            address: data.result.address_components,
            photos: data.result.photos,
            infoSupp: place.info,
          };
        } else {
          return null;
        }
      })
    );

    const filteredDetailsBoutiques = newDetailsBoutiques
      .filter((detail) => detail.status === "fulfilled")
      .map((detail) => detail.value);
    setDetailsBoutiques(filteredDetailsBoutiques);
  };

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
              <h3>{details.infoSupp.nom_boutique}</h3>
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: "5px",
        borderColor: " yellow"

      }}
    >
      <h3>{boutique.infoSupp.nom_boutique}</h3>
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
    </div>,



<div style={{
  marginTop: "35px",
  display: "flex",
  justifyContent: "center",
}}>
    <Card variant="outlined" sx={{ width: 400, }}>
      <CardOverflow>
        <AspectRatio ratio="2">
          <img
            src={photosBoutiques} style={{ marginBottom: "2rem" }}
          />
        </AspectRatio>
        <IconButton
          aria-label="Like minimal photography"
          size="md"
          variant="solid"
          color="danger"
          sx={{
            position: 'absolute',
            zIndex: 2,
            borderRadius: '50%',
            right: '1rem',
            bottom: 0,
            transform: 'translateY(50%)',
          }}
        >
          <Favorite />
        </IconButton>
      </CardOverflow>
      <Typography level="h2" sx={{ fontSize: 'md', mt: 2 }}>
        {boutique.infoSupp.nom_boutique}
      </Typography>
      <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
        {boutique.address[0].long_name} {boutique.address[1].long_name}
      </Typography>
      <div style={{
        display: "flex",
        flexDirection :"row",
        justifyContent: "center",
       textAlign:"center"
      }}>
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
      <div style={{
        margin:"0px 0px 15px 0px"
      }}>
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
          display: 'flex',
          gap: 1.5,
          py: 1.5,
          px: 'var(--Card-padding)',
          bgcolor: 'background.level1',
        }}
      >
        <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
          {boutique.hours.weekday_text[0]} 
        </Typography>
        <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
          {boutique.hours.weekday_text[1]} 
        </Typography>
        <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
          {boutique.hours.weekday_text[2]} 
        </Typography>
        <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
          {boutique.hours.weekday_text[4]} 
        </Typography>
        <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
          {boutique.hours.weekday_text[5]} 
        </Typography>
       
      </CardOverflow>
    </Card>
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
