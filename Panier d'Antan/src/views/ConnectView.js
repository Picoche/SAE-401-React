import FormLogin from "../components/FormLogin";
import React, { useState, useContext } from "react";
import UserContext from "../UserContext";
import Typography from "@mui/material/Typography";

export default function LoginView() {
  const [userContext, setUserContext] = useState("hello");
  console.log(userContext);
  return (
    <UserContext.Provider value={{ userContext, setUserContext }}>
      <FormLogin></FormLogin>
      <Typography>{(userContext.id_user, userContext.nom_user)}</Typography>
    </UserContext.Provider>
  );
}
