import { useEffect, useState } from "react";
import { Task } from "../types/Task";
import {
  getUserTasks,
  AddNewTask,
  DeleteTask,
  ToggleTaskCompletion,
  UpdateTaskFolder,
} from "../services/taskService";

export default function useTasks(token: string) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const refresh = async () => {
    const updated = await getUserTasks(token);
    setTasks(updated);
  };

  useEffect(() => {
    if (token) refresh();
  }, [token]);

  const addTask = async (title: string) => {
    await AddNewTask(token, title);
    await refresh();
  };

  const deleteTask = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    await DeleteTask(token, id);
    await refresh();
  };

  const toggleTask = async (id: number) => {
    await ToggleTaskCompletion(token, id);
    await refresh();
  };

const changeTaskFolder = async (id: number, folderId: number | null) => {
    const updated = await UpdateTaskFolder(token, id, folderId);
    if (updated) await refresh();
  };
  return { tasks, addTask, deleteTask, toggleTask, changeTaskFolder};
}
