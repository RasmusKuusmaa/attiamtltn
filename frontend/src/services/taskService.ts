const API_URL = "http://localhost:8080/api/user/tasks";

export async function getUserTasks(token: string) {
  const response = await fetch(`${API_URL}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failet to fetch user Tasks");
  }
  return response.json();
}

export async function AddNewTask(token: string, title: string) {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
  if (!response.ok) {
    throw new Error("Failed to add task");
  }
}

export async function DeleteTask(token: string, id: number) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
}

export async function ToggleTaskCompletion(token: string, id: number) {
  const response = await fetch(`${API_URL}/${id}/complete`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to edit task completion status");
  }
}

export async function UpdateTaskFolder(
  token: string,
  id: number,
  folderId: number | null
) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ folderid: folderId }),
  });
  if (response.status === 200) return true;
  else return false;
}
