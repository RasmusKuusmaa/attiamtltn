import { useCallback, useEffect, useState } from "react";
import { Project } from "../types/Project";
import { getUserProjects } from "../services/projectService";

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

  return { projects, refresh };
}
