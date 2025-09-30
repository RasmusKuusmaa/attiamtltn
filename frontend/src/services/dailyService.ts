import { json } from "stream/consumers";

const API_URL = "http://localhost:8080/api/user/dailies";

export async function getUserDailies(token: string) {
  const response = await fetch(`${API_URL}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch user Dailies");
  }
  return response.json();
}

export async function DeleteDaily(token: string, id: number) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete daily");
  }
}

export async function TogggleDailyCompletion(token: string, id: number) {
  const response = await fetch(`${API_URL}/${id}/complete`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to complete daily");
  }
}

export async function AddnewDaily(token: string, title: string) {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
  if (!response.ok) {
    throw new Error("Failed to add daily");
  }
}
