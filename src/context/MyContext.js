import React, { createContext, useState } from "react";

export const UserContext = createContext();
export const MyContext = ({ children }) => {
  const [token, setToken] =useState(() => {
    const storedUser = localStorage.getItem('token');
    return storedUser;
});
  
  const value = {
    token,
    setToken,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
