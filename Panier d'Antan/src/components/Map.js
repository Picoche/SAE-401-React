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
    </MapContainer>
  );
}

export default function Map() {
  const { userContext } = useContext(UserContext);

  const [position, setPosition] = useState([43.604652, 1.444209]);
  const [zoom, setZoom] = useState(13);

  const provider = new OpenStreetMapProvider();

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
    <div>Your browser does not support Geolocation</div>
  ) : !isGeolocationEnabled ? (
    <div>Geolocation is not enabled</div>
  ) : coords ? (
    <MapParams position={position} zoom={zoom} />
  ) : (
    <div>Getting the location data&hellip; </div>
  );
}
