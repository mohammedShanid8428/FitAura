import React, { createContext, useState } from "react";

// ✅ Correctly create and export the context
export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authStatus, setAuthStatus] = useState(false);

  return (
    <authContext.Provider value={{ authStatus, setAuthStatus }}>
      {children}
    </authContext.Provider>
  );
};
