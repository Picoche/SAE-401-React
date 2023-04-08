import React, { useState, useEffect, useContext } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useGeolocated } from "react-geolocated";
import { OpenStreetMapProvider } from "leaflet-geosearch";

import UserContext from "../UserContext";

function SetMapView({ position, zoom }) {
  const map = useMap();
  map.setView(position, zoom);
  return null;
}

function MapParams({ position, zoom }) {
  return (
    <MapContainer
      center={position}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ height: 500 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <SetMapView position={position} zoom={zoom} />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <MapMarkers />
    </MapContainer>
  );
}

function MapMarkers() {
  const [markerPosition, setMarkerPosition] = useState([]);
  const [boutiques, setBoutiques] = useState([]);

  const provider = new OpenStreetMapProvider({
    params: {
      email: "hombert.fabien@gmail.com",
    },
  });

  const getBoutiques = () => {
    fetch("http://panier-antan.mmicastres.fr/api/boutiques")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBoutiques(data);
        data.forEach((boutique) => {
          provider
            .search({ query: boutique.adresse_boutique })
            .then((result) => {
              console.log(result);
              setMarkerPosition(
                { id_boutique: boutique.id_boutique },
                { position: [result[0].y, result[0].x] }
              );
            });
        });
      });
  };

  useEffect(() => {
    getBoutiques();
  }, []);

  return markerPosition.map((marker) => {
    return (
      <Marker position={marker.position} key={marker.id_boutique}></Marker>
    );
  });
}

export default function Map() {
  const { userContext } = useContext(UserContext);

  const [position, setPosition] = useState([43.604652, 1.444209]);
  const [zoom, setZoom] = useState(13);

  const provider = new OpenStreetMapProvider({
    params: {
      email: "hombert.fabien@gmail.com",
    },
  });

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      watchPosition: false,
      userDecisionTimeout: 5000,
    });

  useEffect(() => {
    if (coords) {
      provider.search({ query: userContext.adresse }).then((result) => {
        console.log(result);
        setPosition([result[0].y, result[0].x]);
      });
      console.log(coords);
      console.log(position);
    }
  }, [coords]);

  return !isGeolocationAvailable ? (
    <div>Votre navigateur ne supporte pas la géolocalisation</div>
  ) : !isGeolocationEnabled ? (
    <div>Veuillez activer la géolocalisation</div>
  ) : coords ? (
    <MapParams position={position} zoom={zoom} />
  ) : (
    <div>En attente des données de géolocalisation&hellip; </div>
  );
}
