import { JSX, useContext, useEffect, useMemo } from "react";
import { TopBarContext } from "../../context/TopBarcontext";
import UserStats from "../../components/UserStats/UserStats";
import useTasks from "../../hooks/useTasks";
import useFolders from "../../hooks/useFolders";

function Stats(): JSX.Element {
  const { setContent } = useContext(TopBarContext);
  const token = localStorage.getItem("token") || "";

  const { tasks } = useTasks(token);
  const { foldersByType } = useFolders(token, { 0: tasks });
  const folders = useMemo(() => Object.values(foldersByType).flat(), [foldersByType]);

  const folderDistribution = useMemo(() => {
    const dist = folders.map((folder) => ({
      folderTitle: folder.title,
      taskCount: tasks.filter((t) => t.folder_id === folder.folder_id).length,
    }));

    const unassignedCount = tasks.filter((t) => !t.folder_id || t.folder_id === 0).length;
    if (unassignedCount > 0) {
      dist.push({ folderTitle: "Unassigned", taskCount: unassignedCount });
    }

    return dist;
  }, [folders, tasks]);

  useEffect(() => {
    setContent(
      <div>
        <h2>Stats Page</h2>
      </div>
    );
  }, [setContent]);

  return (
    <div>
      <h1>Folder Distribution</h1>
      <UserStats folderDistribution={folderDistribution} />
    </div>
  );
}

export default Stats;
