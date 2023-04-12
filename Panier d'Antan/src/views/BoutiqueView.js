import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import Boutique from "../components/Boutique";

export default function BoutiqueView() {
  const { id } = useParams();
  console.log(id);
  return <Boutique id={id} />;
}
