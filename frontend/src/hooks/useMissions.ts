import { useCallback, useEffect, useState } from "react";
import { Mission } from "../types";
import { getProjectMissions } from "../services/missionService";

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

  return { missions, refresh, loading };
}
