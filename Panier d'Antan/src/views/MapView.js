import React, { useState, useEffect } from "react";
import Map from "../components/Map";

export default function DashboardView() {
  return (
    <div>
      <h3>Carte interactive</h3>
      <Map />
    </div>
  );
}
