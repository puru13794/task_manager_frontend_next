import { createContext, useContext, useState } from "react";
import {
  setAuthToken,
  getAuthToken,
  removeAuthToken,
} from "../utils/authUtils";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  
  const login = (token) => {
    setAuthToken(token, 'Auth_Token')
  };

  const logout = () => {
    removeAuthToken('Auth_Token')
  };

  const isAuthenticated = () => !!getAuthToken('Auth_Token')

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
