const API_URL = "http://localhost:8080/api/user/mission-tasks";

export async function getMissionTasks(token: string, mission_id: number) {
  const response = await fetch(`${API_URL}/mission/${mission_id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch mission tasks");
  }
  return response.json();
}

export async function updateMissiontaskStatus(
  token: string,
  task_id: number,
  status: string
) {
  const response = await fetch(`${API_URL}/${task_id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) {
    throw new Error("failed to update mission status");
  }
}
