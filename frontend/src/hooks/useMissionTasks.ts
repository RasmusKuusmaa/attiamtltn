import { useCallback, useEffect, useState } from "react";
import { MissionTask } from "../types";
import { getMissionTasks, updateMissiontaskStatus } from "../services/missionTaskService";
import { title } from "process";

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

  const updateTaskStatus  =  useCallback(async (taskId: number, newStatus: string) => {
    if (!token)
      return;
    try {
      const update = await updateMissiontaskStatus(token, taskId, newStatus);
      setTasks((prev) => 
      prev.map((task) =>
      task.id === taskId ? {...task, status: newStatus} : task))
    } catch (err){
      console.error("Failed to update task status", err);
    }
  }, [token]); 
  return { tasks, loading, refresh, setTasks, updateTaskStatus };
}
