import { JSX, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { TopBarContext } from "../../context/TopBarcontext";
import { getCurrentUser } from "../../services/userService";
import "./Main.css";
import FolderSelect from "../../components/FolderSelect/FolderSelect";
import useTasks from "../../hooks/useTasks";
import useDailies from "../../hooks/useDailies";
import useFolders from "../../hooks/useFolders";
import TaskList from "../../components/TaskList/TaskList";
import DailyList from "../../components/DailyList/DailyList";
import TaskModal from "../../components/TaskModal/TaskModal";
import DailyModal from "../../components/DailyModal/DailyModal";
import EditTaskModal from "../../components/EditTaskModal/EditTaskModal";
import NewFolderModal from "../../components/NewFolderModal/NewFolderModal";

function Main(): JSX.Element {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { setContent } = useContext(TopBarContext);
  const token = localStorage.getItem("token") || "";

  const { tasks, addTask, deleteTask, toggleTask, changeTaskFolder } = useTasks(token);
  const { dailies, addDaily, deleteDaily, toggleDaily } = useDailies(token);

  const [username, setUsername] = useState("");
  const [isTaskModalOpen, setTaskModalOpen] = useState(false);
  const [isDailyModalOpen, setDailyModalOpen] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);
  const [newFolderType, setNewFolderType] = useState(0);

  useEffect(() => {
    if (!token) return;
    getCurrentUser(token)
      .then((data) => setUsername(data.username))
      .catch(console.error);
  }, [token]);

  useEffect(() => {
    setContent(
      <div className="topbar-content">
        <h1>Hello {username}</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }, [username, setContent]);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  async function handleTaskEdit(id: number) {
    setEditingTaskId(id);
    setIsEditTaskModalOpen(true);
  }

  const {
    foldersByType,
    selectedFolders,
    setSelectedFolders,
    addNewFolder,
    totalCountsByType,
    unassignedCountsByType,
  } = useFolders(token, {
    0: tasks,
    1: dailies,
  });

  async function handleNewFolder(title: string, folderType: number) {
    await addNewFolder(title, folderType);
    setIsNewFolderModalOpen(false);
  }

  return (
    <div className="mainpage-wrapper">
      <div>
        <FolderSelect
          label="Task Folder"
          folders={foldersByType[0] || []}
          selectedFolder={selectedFolders[0] ?? "all"}
          onChange={(value) => setSelectedFolders((prev) => ({ ...prev, 0: value }))}
          onAdd={() => {
            setNewFolderType(0);
            setIsNewFolderModalOpen(true);
          }}
          totalCount={totalCountsByType[0] ?? 0}
          unassignedCount={unassignedCountsByType[0] ?? 0}
        />
        <TaskList
          tasks={
            selectedFolders[0] === "all"
              ? tasks
              : selectedFolders[0] === "unassigned"
              ? tasks.filter((t) => !t.folder_id || t.folder_id === 0)
              : tasks.filter((t) => t.folder_id === selectedFolders[0])
          }
          onDelete={deleteTask}
          onToggle={toggleTask}
          onAdd={() => setTaskModalOpen(true)}
          onEdit={handleTaskEdit}
        />
      </div>

      <div>
        <FolderSelect
          label="Daily Folder"
          folders={foldersByType[1] || []}
          selectedFolder={selectedFolders[1] ?? "all"}
          onChange={(value) => setSelectedFolders((prev) => ({ ...prev, 1: value }))}
          onAdd={() => {
            setNewFolderType(1);
            setIsNewFolderModalOpen(true);
          }}
          totalCount={totalCountsByType[1] ?? 0}
          unassignedCount={unassignedCountsByType[1] ?? 0}
        />
        <DailyList
          dailies={
            selectedFolders[1] === "all"
              ? dailies
              : selectedFolders[1] === "unassigned"
              ? dailies.filter((d) => !d.folder_id || d.folder_id === 0)
              : dailies.filter((d) => d.folder_id === selectedFolders[1])
          }
          onDelete={deleteDaily}
          onToggle={toggleDaily}
          onAdd={() => setDailyModalOpen(true)}
        />
      </div>

      {isTaskModalOpen && (
        <TaskModal onAdd={addTask} onClose={() => setTaskModalOpen(false)} />
      )}

      {isDailyModalOpen && (
        <DailyModal onAdd={addDaily} onClose={() => setDailyModalOpen(false)} />
      )}

      {isEditTaskModalOpen && editingTaskId !== null && (
        <EditTaskModal
          taskId={editingTaskId}
          currentFolderId={tasks.find((t) => t.task_id === editingTaskId)?.folder_id ?? null}
          folders={foldersByType[0] || []}
          onSave={async (id, folderId) => {
            await changeTaskFolder(id, folderId);
            setIsEditTaskModalOpen(false);
          }}
          onClose={() => setIsEditTaskModalOpen(false)}
        />
      )}

      {isNewFolderModalOpen && (
        <NewFolderModal
          onAdd={(title) => handleNewFolder(title, newFolderType)}
          onClose={() => setIsNewFolderModalOpen(false)}
        />
      )}
    </div>
  );
}

export default Main;
