import Produit from "../components/Produit";
import React from "react";
import { useParams } from "react-router-dom";

export default function ProduitView() {
  const { id, id_produit } = useParams();
  return (
    <div>
      <Produit id_boutique={id} id_produit={id_produit} />
    </div>
  );
}
