import React, { useState, useEffect, useContext } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useGeolocated } from "react-geolocated";

import UserContext from "../UserContext";

function SetMapView({ position, zoom }) {
  const map = useMap();
  map.setView(position, zoom);
  return null;
}

export default function Map() {
  const { userContext } = useContext(UserContext);

  const [markers, setMarkers] = useState([]);
  const [boutiques, setBoutiques] = useState([]);
  const [position, setPosition] = useState([43.604652, 1.444209]);
  const [zoom, setZoom] = useState(13);

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

  const getBoutiques = () => {
    fetch("http://panier-antan.mmicastres.fr/api/boutiques")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBoutiques(data);
      });
  };

  const getMarkers = () => {
    boutiques.forEach((boutique) => {
      fetch(url + apiKey + boutique.adresse_boutique).then((response) => {
        response.json().then((data) => {
          console.log(data);
          setMarkers([
            ...markers,
            {
              id_boutique: boutique.id_boutique,
              nom_boutique: boutique.nom_boutique,
              position: [data.response.bbox[1], data.response.bbox[0]],
            },
          ]);
        });
      });
    });
    console.log(markers);
  };

  useEffect(() => {
    if (coords) {
      fetch(url + apiKey + userContext.adresse).then((response) => {
        response.json().then((data) => {
          console.log(data);
          setPosition([data.response.bbox[1], data.response.bbox[0]]);
        });
      });
    }
    console.log(position);
  }, [coords]);

  useEffect(() => {
    getBoutiques();
  }, []);

  useEffect(() => {
    getMarkers();
  }, [boutiques]);

  return !isGeolocationAvailable ? (
    <div>Votre navigateur ne supporte pas la géolocalisation</div>
  ) : !isGeolocationEnabled ? (
    <div>Veuillez activer la géolocalisation</div>
  ) : coords ? (
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
      {markers.map((marker, index) => {
        return (
          <Marker position={marker.position} key={index}>
            <Popup>
              <h3>{marker.nom_boutique}</h3>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  ) : (
    <div>En attente des données de géolocalisation&hellip; </div>
  );
}

// function MapParams({ position, zoom }) {
//   return (
//     <MapContainer
//       center={position}
//       zoom={zoom}
//       scrollWheelZoom={true}
//       style={{ height: 500 }}
//     >
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       <SetMapView position={position} zoom={zoom} />
//       <Marker position={position}>
//         <Popup>
//           A pretty CSS3 popup. <br /> Easily customizable.
//         </Popup>
//       </Marker>
//       <MapMarkers />
//     </MapContainer>
//   );
// }

// export default function Map() {
//   const { userContext } = useContext(UserContext);

//   const url = "https://api.geocodify.com/v2/geocode?api_key=";
//   const apiKey = "4cdfd72e4860b817f9279f98e9d41f271fa9793b&q=";

//   const { coords, isGeolocationAvailable, isGeolocationEnabled } =
//     useGeolocated({
//       positionOptions: {
//         enableHighAccuracy: false,
//       },
//       watchPosition: false,
//       userDecisionTimeout: 5000,
//     });

//   useEffect(() => {
//     if (coords) {
//       fetch(url + apiKey + userContext.adresse).then((response) => {
//         response.json().then((data) => {
//           console.log(data);
//           setPosition([data.response.bbox[1], data.response.bbox[0]]);
//         });
//       });
//     }
//     console.log(position);
//   }, [coords]);

//   return !isGeolocationAvailable ? (
//     <div>Votre navigateur ne supporte pas la géolocalisation</div>
//   ) : !isGeolocationEnabled ? (
//     <div>Veuillez activer la géolocalisation</div>
//   ) : coords ? (
//     <MapParams position={position} zoom={zoom} />
//   ) : (
//     <div>En attente des données de géolocalisation&hellip; </div>
//   );
// }
