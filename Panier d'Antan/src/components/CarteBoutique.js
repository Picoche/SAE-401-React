import React, { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";

function CarteBoutique({ boutique }) {
  const [photosBoutiques, setPhotosBoutiques] = useState([]);
  console.log(boutique);

  useEffect(() => {
    const getPhotos = async () => {
      const response = await fetch(
        `http://localhost:4000/boutiques/places/photos?photoreference=${boutique.photos[0].photo_reference}`
      );
      const data = await response.json();
      console.log(data);
      setPhotosBoutiques(data);
    };
    getPhotos();
  }, [photosBoutiques]);

  return (
    <div>
      <h3>{boutique.name}</h3>
    </div>
  );
}
