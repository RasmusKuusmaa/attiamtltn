import { resolveNaptr } from "dns";
import { LoginResponse, ErrorResponse } from "../types";
import { data } from "react-router-dom";

const API_URL = "http://localhost:8080/auth";

export const authService = {
    async login(email: string, password: string): Promise<LoginResponse> {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, password}),
        });
        if (!response.ok){
            const errorData: ErrorResponse = await response.json();
            throw new Error(errorData.message || "Failed to log in");
        }

        const data: LoginResponse = await response.json();
        return data;
    },
};