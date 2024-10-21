import React, { createContext, useState } from "react";

export const UserContext = createContext();
export const MyContext = ({ children }) => {
  const [token, setToken] = useState(() => {
    const storedUser = localStorage.getItem("token");
    return storedUser;
  });

  const [mUser, setmUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser?JSON.parse(storedUser):null;
    } catch (e) {
      return null;
    }
  });

  const value = {
    token,
    setToken,
    mUser,
    setmUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
