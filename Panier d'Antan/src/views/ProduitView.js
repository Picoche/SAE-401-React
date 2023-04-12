import Produit from "../components/Produit";
import React from "react";

export default function ProduitView() {
  const { id, id_produit } = useParams();
  return (
    <div>
      <Produit></Produit>
    </div>
  );
}
