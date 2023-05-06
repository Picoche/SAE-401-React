import React, { useState, useEffect, useCallback } from "react";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import Favorite from "@mui/icons-material/Favorite";

export default function CarteBoutique({ boutique, handleBoutiqueSelect }) {
  const [photosBoutiques, setPhotosBoutiques] = useState(null);

  const fetchPhotos = useCallback(async () => {
    if (boutique.photos && boutique.photos.length > 0) {
      const photoReference = boutique.photos[0].photo_reference;
      const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=AIzaSyDPpCouT8a5CIliE6YhC3tJ4we32-jy6vY`;
      setPhotosBoutiques(photoUrl);
    }
  }, [boutique, setPhotosBoutiques]);

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
