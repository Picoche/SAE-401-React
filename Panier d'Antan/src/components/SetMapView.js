import React, { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function SetMapView({ userPosition, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(userPosition, zoom);
  }, [userPosition, zoom]);
  return null;
}
