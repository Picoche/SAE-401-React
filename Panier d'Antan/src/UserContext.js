import { createContext } from "react";

// const UserContext = createContext({
//   userContext: {},
//   setUserContext: () => {},
// });

const UserContext = createContext({
  userContext: {
    MDP: "99211794b7f9b20ea56632d3c7da44a6",
    administrateur: 1,
    adresse: "18 rue Croix de Fournès, 81100 Castres",
    commercant: 1,
    date_insc: "2023-03-14",
    id_user: 1729764896,
    image_profil: null,
    mail: "hombert.fabien@gmail.com",
    nom_user: "Hombert",
    prenom_user: "Fabien",
    pseudo: "Picoche",
  },
  setUserContext: () => {},
});

export default UserContext;
