import { useEffect, useState } from "react";
import { Folder } from "../types";
import { getUserFolders } from "../services/folderService";

export default function useFolders(token: string) {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<number>(0);

  useEffect(() => {
    if (!token) return;
    getUserFolders(token)
      .then((data) => setFolders(data))
      .catch(console.error);
  }, [token]);

  return { folders, selectedFolder, setSelectedFolder };
}
