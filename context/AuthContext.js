import { createContext, useContext, useState } from "react";
import {
  setAuthToken,
  getAuthToken,
  removeAuthToken,
} from "../utils/authUtils";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const login = (token) => {
    setAuthToken(token, "auth_token");
  };

  const logout = () => {
    removeAuthToken("auth_token");
  };

  const isAuthenticated = () => getAuthToken("auth_token");

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
