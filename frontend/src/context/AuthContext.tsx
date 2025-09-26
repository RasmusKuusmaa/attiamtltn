import React, { createContext, useState, ReactNode } from "react";
import { AuthContextType } from "../types";
import { authService } from "../services/authService";

// The default value should match the type, but will be overridden by the provider.
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  token: null,
  login: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      setToken(response.token);
      localStorage.setItem("token", response.token);
    } catch (error) {
      logout();
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  // --- THE FIX IS HERE ---
  // 1. Derive the isAuthenticated status directly from the token state.
  const isAuthenticated = !!token;

  // 2. Include isAuthenticated in the value passed to the provider.
  const value = {
    isAuthenticated,
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}