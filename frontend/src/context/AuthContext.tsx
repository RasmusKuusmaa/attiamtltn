import React, { createContext, useState, ReactNode } from "react";
import { AuthContextType } from "../types";
import { authService } from "../services/authService";

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  token: null,
  login: async (_email: string, _password: string) => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

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

  const isAuthenticated = !!token;
  const value = {
    isAuthenticated,
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
