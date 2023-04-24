import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userContext")) || null
  );

  const logIn = (user) => {
    setUser(user);
    localStorage.setItem("userContext", JSON.stringify(user));
    setLoggedIn(true);
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem("userContext");
    setLoggedIn(false);
  };

  // Load user data from localStorage if available
  if (!loggedIn) {
    const storedUser = localStorage.getItem("userContext");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoggedIn(true);
    }
  }

  const value = {
    loggedIn,
    user,
    logIn,
    logOut,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
