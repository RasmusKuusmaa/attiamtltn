import { tokenToString } from "typescript";

const API_URL = "http://localhost:8080/api/user/notes";

export async function getUserNotes(token: string) {
    const response = await fetch(`${API_URL}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok){
        throw new Error("Failed to fetch user notes");
    }
    return response.json();
}