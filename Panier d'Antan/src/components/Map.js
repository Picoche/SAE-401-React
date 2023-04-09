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
        setBoutiques(data);
      });
  };

  useEffect(() => {
    if (coords) {
      fetch(url + apiKey + userContext.adresse).then((response) => {
        response.json().then((data) => {
          setPosition([data.response.bbox[1], data.response.bbox[0]]);
        });
      });
    }
    console.log(position);
  }, [coords]);

  useEffect(() => {
    getBoutiques();
  }, []);

  return !isGeolocationAvailable ? (
    <div>Votre navigateur ne supporte pas la géolocalisation</div>
  ) : !isGeolocationEnabled ? (
    <div>Veuillez activer la géolocalisation</div>
  ) : coords ? (
    <BuildMap position={position} zoom={zoom} boutiques={boutiques} />
  ) : (
    <div>En attente des données de géolocalisation&hellip; </div>
  );
}

function BuildMap({ position, zoom, boutiques }) {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const getMarkers = async () => {
      const newMarkers = await Promise.all(
        boutiques.map(async (boutique) => {
          const response = await fetch(
            `http://localhost:4000/boutiques/places?input=${boutique.adresse_boutique}`
          );
          const data = await response.json();
          console.log(data);
          return {
            info: {
              boutique,
              rating: data.rating,
              place_id: data.candidates[0].place_id,
            },
            position: [
              data.candidates[0].geometry.location.lat,
              data.candidates[0].geometry.location.lng,
            ],
          };
        })
      );
      setMarkers(newMarkers);
    };
    getMarkers();
  }, [boutiques]);

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
      {markers.map((marker, index) => (
        <Marker position={marker.position} key={index}>
          <Popup>
            <h3>{marker.info.place_id}</h3>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
// useEffect(() => {
//   const getMarkers = () => {
//     boutiques.forEach((boutique) => {
//       const address = encodeURIComponent(boutique.adresse_boutique);
//       const apiKey = "AIzaSyDPpCouT8a5CIliE6YhC3tJ4we32-jy6vY";
//       // const proxyurl = "https://cors-anywhere.herokuapp.com/";

//       const url = `http://localhost:5173/places?input=${boutique.adresse_boutique}`;

//       // const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${address}&inputtype=textquery&fields=formatted_address,name,rating,place_id,geometry&key=${apiKey}&libraries=places&language=fr`;
//       fetch(url, { mode: "cors" }).then((response) => {
//         response.json().then((data) => {
//           console.log(data);
//           setMarkers((prevMarkers) => [
//             ...prevMarkers,
//             {
//               info: {
//                 boutique,
//               },
//               position: [
//                 data.candidates[0].geometry.location.lat,
//                 data.candidates[0].geometry.location.lng,
//               ],
//               noteGlobale: data.candidates[0].rating,
//             },
//           ]);
//         });
//       });
//     });
//   };

//   getMarkers();
// }, [boutiques]);

// function Markers({ boutiques }) {
//   const [markers, setMarkers] = useState([]);

//   const url = "https://api.geocodify.com/v2/geocode?api_key=";
//   const apiKey = "4cdfd72e4860b817f9279f98e9d41f271fa9793b&q=";

//   const getMarkers = () => {
//     boutiques.forEach((boutique) => {
//       fetch(url + apiKey + boutique.adresse_boutique).then((response) => {
//         response.json().then((data) => {
//           console.log(data);
//           setMarkers([
//             ...markers,
//             {
//               info: {
//                 boutique,
//               },
//               position: [data.response.bbox[1], data.response.bbox[0]],
//             },
//           ]);
//         });
//       });
//     });
//   };

//   useEffect(() => {
//     getMarkers();
//   }, [boutiques]);

//   return markers.map((marker, index) => {
//     return (
//       <Marker position={marker.position} key={index}>
//         <Popup>
//           <h3>{marker.info.boutique.nom_boutique}</h3>
//         </Popup>
//       </Marker>
//     );
//   });
// }

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
