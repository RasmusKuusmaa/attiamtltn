import { error } from "console";
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

export async function updateUserNoteContent(token: string, id: number, content: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    throw new Error("Failed to update note");
  }

  return response.json();
}