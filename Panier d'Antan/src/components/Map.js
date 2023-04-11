import React, { useState, useEffect, useContext, useCallback } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useGeolocated } from "react-geolocated";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";

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
  const { userContext } = useContext(UserContext);

  const [boutiquesPosition, setBoutiquesPosition] = useState([]);
  const [userPosition, setUserPosition] = useState([43.604652, 1.444209]);
  const [zoom, setZoom] = useState(14);

  const handleBoutiqueSelect = useCallback((boutique) => {
    setSelectedBoutique(boutique);
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
                  handleBoutiqueSelect(details);
                  isMapSelected(true);
                }}
              >
                Voir la boutique
              </Button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      {mapSelected ? <CarteBoutique boutique={selectedBoutique} /> : null}
    </div>
  );
}

function CarteBoutique({ boutique }) {
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
      }}
    >
      <h3>{boutique.infoSupp.nom_boutique}</h3>
      <img src={photosBoutiques} style={{ marginBottom: "2rem" }}></img>
      <Button
        variant="contained"
        size="small"
        onClick={() => {
          handleBoutiqueSelect(details);
        }}
      >
        Voir la boutique
      </Button>
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

// function CarteBoutique({ boutique }) {
//   const [photosBoutiques, setPhotosBoutiques] = useState("");

//   useEffect(() => {
//     async function fetchPhoto() {
//       try {
//         const response = await fetch(
//           `${BOUTIQUES_PHOTOS_URL}${boutique.photos[0].photo_reference}}`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch photo");
//         }
//         const blob = await response.blob();
//         setPhotosBoutiques(URL.createObjectURL(blob));
//       } catch (error) {
//         console.error(error);
//       }
//     }
//     fetchPhoto();
//   }, [boutique]);

//   return (
//     <div>
//       <h3>{boutique.name}</h3>
//       {photosBoutiques ? (
//         <img src={photosBoutiques} alt={`photo of ${boutique.name}`} />
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }
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
