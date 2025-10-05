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

function Main(): JSX.Element {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { setContent } = useContext(TopBarContext);
  const token = localStorage.getItem("token") || "";

  const { tasks, addTask, deleteTask, toggleTask, changeTaskFolder  } = useTasks(token);
  const { dailies, addDaily, deleteDaily, toggleDaily } = useDailies(token);

  const [username, setUsername] = useState("");
  const [isTaskModalOpen, setTaskModalOpen] = useState(false);
  const [isDailyModalOpen, setDailyModalOpen] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
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
  async function handleTaskEdit (id: number){
    setEditingTaskId(id);
    setIsEditTaskModalOpen(true);
  }

  const {
    taskFolders,
    dailyFolders,
    selectedTaskFolder,
    setSelectedTaskFolder,
    selectedDailyFolder,
    setSelectedDailyFolder,
  } = useFolders(token);

  return (
    <div className="mainpage-wrapper">
      {/* Task Section */}
      <div>
        <FolderSelect
          label="Task Folder"
          folders={taskFolders}
          selectedFolder={selectedTaskFolder}
          onChange={setSelectedTaskFolder}
        />

        <TaskList
          tasks={
            selectedTaskFolder === "all"
              ? tasks
              : selectedTaskFolder === "unassigned"
              ? tasks.filter((t) => !t.folder_id || t.folder_id === 0)
              : tasks.filter((t) => t.folder_id === selectedTaskFolder)
          }
          onDelete={deleteTask}
          onToggle={toggleTask}
          onAdd={() => setTaskModalOpen(true)}
          onEdit={handleTaskEdit}
        />
      </div>

      {/* Daily Section */}
      <div>
        <FolderSelect
          label="Daily Folder"
          folders={dailyFolders}
          selectedFolder={selectedDailyFolder}
          onChange={setSelectedDailyFolder}
        />
        <DailyList
          dailies={
            selectedDailyFolder === "all"
              ? dailies
              : selectedDailyFolder === "unassigned"
              ? dailies.filter((d) => !d.folder_id || d.folder_id === 0)
              : dailies.filter((d) => d.folder_id === selectedDailyFolder)
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
        currentFolderId={tasks.find(t => t.task_id === editingTaskId)?.folder_id ?? null}
        folders={taskFolders}
        onSave={async (id, folderId) => {
          await changeTaskFolder(id, folderId);
          setIsEditTaskModalOpen(false);
        }}
        onClose={() => setIsEditTaskModalOpen(false)}
      />
      )}
      
    </div>
  );
}

export default Main;
