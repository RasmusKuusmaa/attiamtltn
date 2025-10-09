import { useCallback, useEffect, useState } from "react";
import { Project } from "../types/Project";
import { addUserProject, deleteUserProject, getUserProjects } from "../services/projectService";

export default function useProjects(token: string) {
  const [projects, setProjects] = useState<Project[]>([]);

  const refresh = useCallback(async () => {
    if (!token) return;
    try {
      const updated = await getUserProjects(token);
      setProjects(updated);
    } catch (err) {
      console.error("Failed to fetch user projects:", err);
    }
  }, [token]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addProjects = async (title: string): Promise<Project> => {
    const newProjet = await addUserProject(token, title);
    setProjects((prev) => [...prev, newProjet]);
    return newProjet;
  };

  const deleteProject = async (id: number) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    try {
      
      await deleteUserProject(token, id);
    } catch (err) {
      console.error("Failed to delete project", err);
    };
  }
  return { projects, refresh, addProjects, deleteProject };
}
