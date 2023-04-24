import React, { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import HeaderNC from "../components/HeaderNC";
import HeaderC from "../components/HeaderC";

export default function ResponsiveAppBar() {
  // store UserContext in a variable and use it to display the correct header
  const { loggedIn } = useContext(UserContext);
  return <div>{loggedIn ? <HeaderC /> : <HeaderNC />}</div>;
}
