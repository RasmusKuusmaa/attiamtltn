import { useEffect, useState } from "react";
import { Daily } from "../types/Daily";
import {
  getUserDailies,
  AddnewDaily,
  DeleteDaily,
  TogggleDailyCompletion,
} from "../services/dailyService";

export default function useDailies(token: string) {
  const [dailies, setDailies] = useState<Daily[]>([]);

  const refresh = async () => {
    const updated = await getUserDailies(token);
    setDailies(updated);
  };

  useEffect(() => {
    if (token) refresh();
  }, [token]);

  const addDaily = async (title: string) => {
    await AddnewDaily(token, title);
    await refresh();
  };

  const deleteDaily = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this daily?")) return;
    await DeleteDaily(token, id);
    await refresh();
  };

  const toggleDaily = async (id: number) => {
    await TogggleDailyCompletion(token, id);
    await refresh();
  };

  return { dailies, addDaily, deleteDaily, toggleDaily };
}
