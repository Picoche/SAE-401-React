import React, { useState, useEffect } from "react";
import Map from "../components/Map";

export default function MapView({ selectedBoutique, setSelectedBoutique }) {
  useEffect(() => {
    console.log(selectedBoutique);
  }, [selectedBoutique]);

  return (
    <div>
      <h3>Carte interactive</h3>
      <Map
        selectedBoutique={selectedBoutique}
        setSelectedBoutique={setSelectedBoutique}
      />
    </div>
  );
}
