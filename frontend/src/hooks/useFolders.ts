import { useEffect, useState } from "react";
import { Folder } from "../types";
import { getUserFolders } from "../services/folderService";

export default function useFolders(token: string) {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedTaskFolder, setSelectedTaskFolder] = useState<
    number | "all" | "unassigned"
  >("all");

  const [selectedDailyFolder, setSelectedDailyFolder] = useState<
    number | "all" | "unassigned"
  >("all");

  useEffect(() => {
    if (!token) return;
    getUserFolders(token)
      .then((data) => setFolders(data))
      .catch(console.error);
  }, [token]);

  const taskFolders = folders.filter((f) => f.folderType === 0);
  const dailyFolders = folders.filter((f) => f.folderType === 1);

  return {
    taskFolders,
    dailyFolders,
    selectedTaskFolder,
    setSelectedTaskFolder,
    selectedDailyFolder,
    setSelectedDailyFolder,
  };
}
