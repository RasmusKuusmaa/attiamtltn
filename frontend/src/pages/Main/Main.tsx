import { JSX, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  AddNewTask,
  DeleteTask,
  getUserTasks,
  ToggleTaskCompletion,
} from "../../services/taskService";
import { Task } from "../../types/Task";
import { TopBarContext } from "../../context/TopBarcontext";
import "./Main.css";
import { getCurrentUser } from "../../services/userService";

function Main(): JSX.Element {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const { setContent } = useContext(TopBarContext);
  const token = localStorage.getItem("token") || "";
  useEffect(() => {
    if (!token) return;

    //get username
    getCurrentUser(token)
      .then((data) => setUsername(data.username))
      .catch((err) => console.error(err));

    // get user tasks
    getUserTasks(token)
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  }, []);
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

  const RefreshTasks = async () => {
    const updatedTasks = await getUserTasks(token);
    setTasks(updatedTasks);
  };
  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task"
    );
    if (!confirmed) return;
    await DeleteTask(token, id);
    await RefreshTasks();
  };
  const handleToggle = async (id: number) => {
    await ToggleTaskCompletion(token, id);
    await RefreshTasks();
  };

  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleAddTask = async () => {
    await AddNewTask(token, newTaskTitle);
    await RefreshTasks();
    setNewTaskTitle("");
    setIsNewTaskModalOpen(false);
  };
  return (
    <>
      <button
        className="new-task-button"
        onClick={() => setIsNewTaskModalOpen(true)}
      >
        Add a task
      </button>

      <div className="task-container">
        {tasks.map((task, index) => (
          <div key={index} className="task-item">
            <div className="task-left">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggle(task.task_id)}
              />
              <p>{task.title}</p>
            </div>
            <button
              className="task-delete-button"
              onClick={() => handleDelete(task.task_id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {isNewTaskModalOpen && (
        <div className="task-new-modal-overlay">
          <div className="task-new-modal">
            <h3>Add New Task</h3>
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Task title"
            />
            <div className="task-new-modal-buttons">
              <button onClick={handleAddTask}>Add</button>
              <button onClick={() => setIsNewTaskModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Main;
