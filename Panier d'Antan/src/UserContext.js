import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext({
  userContext: null,
  setUserContext: () => {},
});

const UserProvider = ({ children }) => {
  const [userContext, setUserContext] = useState(
    JSON.parse(localStorage.getItem("userContext")) || null
  );

  useEffect(() => {
    localStorage.setItem("userContext", JSON.stringify(userContext));
  }, [userContext]);

  return (
    <UserContext.Provider value={{ userContext, setUserContext }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
export { UserProvider };
