import { resolveNaptr } from "dns";
import { LoginResponse, ErrorResponse, RegisterReguest } from "../types";
import { data, Register } from "react-router-dom";
import { error } from "console";

const API_URL = "http://localhost:8080/auth";

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const errorData: ErrorResponse = await response.json();
      throw new Error(errorData.message || "Failed to log in");
    }

    const data: LoginResponse = await response.json();
    return data;
  },

  async register(userData: RegisterReguest): Promise<string> {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const raw = await response.text();
    if (!response.ok) {
      let errorMessage = "Failed to register user";
      try {
        const errorData = JSON.parse(raw);
        errorMessage = errorData.message || errorMessage;
      } catch {
        errorMessage = raw || errorMessage;
      }
      throw new Error(errorMessage);
    }

    return raw;
  },
};
