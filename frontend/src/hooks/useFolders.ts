import { useEffect, useState } from "react";
import { Folder } from "../types";
import { getUserFolders, addNewFolder as addNewFolderService } from "../services/folderService";

type FolderItemsMap = {
  [folderType: number]: { folder_id?: number | null }[];
};

export default function useFolders(token: string, folderItemsMap: FolderItemsMap) {
  const [folders, setFolders] = useState<Folder[]>([]);

  const initialSelections = Object.keys(folderItemsMap).reduce((acc, type) => {
    acc[Number(type)] = "all";
    return acc;
  }, {} as Record<number, number | "all" | "unassigned">);

  const [selectedFolders, setSelectedFolders] = useState<Record<number, number | "all" | "unassigned">>(initialSelections);

  useEffect(() => {
    if (!token) return;
    getUserFolders(token)
      .then((data) => setFolders(data))
      .catch(console.error);
  }, [token]);

  const foldersWithCounts = folders.map((folder) => {
    const relatedItems = folderItemsMap[folder.folderType] ?? [];
    const count = relatedItems.filter((item) => item.folder_id === folder.folder_id).length;
    return { ...folder, taskCount: count };
  });

  const foldersByType: Record<number, Folder[]> = {};
  foldersWithCounts.forEach((f) => {
    if (!foldersByType[f.folderType]) foldersByType[f.folderType] = [];
    foldersByType[f.folderType].push(f);
  });

  const totalCountsByType: Record<number, number> = {};
  const unassignedCountsByType: Record<number, number> = {};

  Object.entries(folderItemsMap).forEach(([typeStr, items]) => {
    const type = Number(typeStr);
    totalCountsByType[type] = items.length;
    unassignedCountsByType[type] = items.filter((i) => !i.folder_id || i.folder_id === 0).length;
  });

  const addNewFolder = async (title: string, folderType: number) => {
    await addNewFolderService(token, title, folderType);
    const updated = await getUserFolders(token);
    setFolders(updated);
  };

  return {
    foldersByType,
    selectedFolders,
    setSelectedFolders,
    addNewFolder,
    totalCountsByType,
    unassignedCountsByType,
  };
}
