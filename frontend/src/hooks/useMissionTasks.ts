import { useCallback, useEffect, useState } from "react";
import { MissionTask } from "../types";
import { getMissionTasks } from "../services/missionTaskService";

export default function useMissionTasks(token: string, missionId: number | null) {
  const [tasks, setTasks] = useState<MissionTask[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!token || !missionId) return;

    setLoading(true);
    try {
      const data = await getMissionTasks(token, missionId);
      setTasks(data);
    } catch (err) {
      console.error("Failed to fetch mission tasks:", err);
    } finally {
      setLoading(false);
    }
  }, [token, missionId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { tasks, loading, refresh, setTasks };
}
