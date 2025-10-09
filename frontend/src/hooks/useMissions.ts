import { useCallback, useEffect, useState } from "react";
import { Mission } from "../types";
import {
  addProjectMission,
  getProjectMissions,
} from "../services/missionService";
import { title } from "process";
import { addUserNote } from "../services/noteService";
import { addUserProject } from "../services/projectService";

export default function useMissions(token: string, projectId: number | null) {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!token) return;

    if (!projectId) {
      setMissions([]);
      return;
    }

    setLoading(true);
    try {
      const updated = await getProjectMissions(token, projectId);
      setMissions(updated);
    } catch (err) {
      console.error("Failed to fetch project missions: ", err);
    } finally {
      setLoading(false);
    }
  }, [token, projectId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addMission = async (title: string) => {
    const newMission = await addProjectMission(token, projectId, title);
    setMissions((prev) => [...prev, newMission]);
    return newMission;
  };
  return { missions, refresh, loading, addMission };
}
