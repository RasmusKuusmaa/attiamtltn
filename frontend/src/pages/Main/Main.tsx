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

function Main(): JSX.Element {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { setContent } = useContext(TopBarContext);
  const token = localStorage.getItem("token") || "";

  const { tasks, addTask, deleteTask, toggleTask } = useTasks(token);
  const { dailies, addDaily, deleteDaily, toggleDaily } = useDailies(token);

  const [username, setUsername] = useState("");
  const [isTaskModalOpen, setTaskModalOpen] = useState(false);
  const [isDailyModalOpen, setDailyModalOpen] = useState(false);

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
            selectedTaskFolder === 0
              ? tasks
              : tasks.filter((t) => t.task_id === selectedTaskFolder)
          }
          onDelete={deleteTask}
          onToggle={toggleTask}
          onAdd={() => setTaskModalOpen(true)}
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
            selectedDailyFolder === 0
              ? dailies
              : dailies.filter((d) => d.daily_id === selectedDailyFolder)
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
    </div>
  );
}

export default Main;
