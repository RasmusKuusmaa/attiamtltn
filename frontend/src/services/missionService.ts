import { resolveProjectReferencePath } from "typescript";

const API_URL = "http://localhost:8080/api/user/missions";

export async function getProjectMissions(token: string, project_id: number) {
  const response = await fetch(`${API_URL}/project/${project_id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("failed to fetch missions");
  }
  return response.json();
}

export async function addProjectMission(
  token: string,
  project_id: number | null,
  title: string
) {
  if (!title) return;

  const Response = await fetch(`${API_URL}/project/${project_id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
  if (!Response.ok) {
    throw new Error("Failed to add a project mission");
  }
  const newMission = await Response.json();
  return newMission;
}

