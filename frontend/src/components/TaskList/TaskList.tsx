import { useState } from "react";
import * as Task from "../../types/Task";
import "./TaskList.css";

type Props = {
  tasks: Task.Task[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onAdd: () => void;
  onEdit: (id: number) => void;
};

function TaskList({ tasks, onDelete, onToggle, onAdd, onEdit }: Props) {
  const [activeTab, setActiveTab] = useState<"active" | "completed">("active");
  const filteredTasks =
    activeTab === "active"
      ? tasks.filter((t) => !t.completed)
      : tasks.filter((t) => t.completed);
  return (
    <div>
      <button className="new-task-button" onClick={onAdd}>
        Add a task
      </button>

      <div className="task-tabs">
        <button
          onClick={() => setActiveTab("active")}
          className={activeTab === "active" ? "tab active" : "tab"}
        >
          Active
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={activeTab === "completed" ? "tab active" : "tab"}
        >
          Completed
        </button>
      </div>
      <div className="task-container">
        {filteredTasks.map((task) => (
          <div key={task.task_id} className="task-item">
            <div className="task-left">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.task_id)}
              />

              <p>{task.title}</p>
            </div>
            <button onClick={() => onEdit(task.task_id)}>edit</button>
            <button
              className="task-delete-button"
              onClick={() => onDelete(task.task_id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;
