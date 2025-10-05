import { useEffect, useState } from "react";
import { Folder } from "../types";
import { getUserFolders, addNewFolder as addNewFolderService } from "../services/folderService";

export default function useFolders(token: string) {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedTaskFolder, setSelectedTaskFolder] = useState<number | "all" | "unassigned">("all");
  const [selectedDailyFolder, setSelectedDailyFolder] = useState<number | "all" | "unassigned">("all");

  useEffect(() => {
    if (!token) return;
    getUserFolders(token)
      .then((data) => setFolders(data))
      .catch(console.error);
  }, [token]);

  const taskFolders = folders.filter((f) => f.folderType === 0);
  const dailyFolders = folders.filter((f) => f.folderType === 1);

  const addNewFolder = async (title: string, folderType: number) => {
    await addNewFolderService(token, title, folderType);
    const updated = await getUserFolders(token);
    setFolders(updated);
  };

  return {
    taskFolders,
    dailyFolders,
    selectedTaskFolder,
    setSelectedTaskFolder,
    selectedDailyFolder,
    setSelectedDailyFolder,
    addNewFolder,
  };
}
