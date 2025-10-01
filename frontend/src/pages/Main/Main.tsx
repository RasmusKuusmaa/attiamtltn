import { JSX, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { TopBarContext } from "../../context/TopBarcontext";
import { getCurrentUser } from "../../services/userService";
import "./Main.css"

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
  const { folders, selectedFolder, setSelectedFolder } = useFolders(token);

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

  return (
    <div className="mainpage-wrapper">
      <FolderSelect
        folders={folders}
        selectedFolder={selectedFolder}
        onChange={setSelectedFolder}
      />

      <TaskList
        tasks={tasks}
        onDelete={deleteTask}
        onToggle={toggleTask}
        onAdd={() => setTaskModalOpen(true)}
      />

      <DailyList
        dailies={dailies}
        onDelete={deleteDaily}
        onToggle={toggleDaily}
        onAdd={() => setDailyModalOpen(true)}
      />

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
