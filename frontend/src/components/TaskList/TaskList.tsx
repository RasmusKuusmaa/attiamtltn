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
  return (
    <div>
      <button className="new-task-button" onClick={onAdd}>
        Add a task
      </button>

      <div className="task-container">
        {tasks.map((task) => (
          <div key={task.task_id} className="task-item">
            <div className="task-left">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.task_id)}
              />
              
              <p>{task.title}</p>
              
            </div>
            <button onClick={() => onEdit(task.task_id)}>
              edit
            </button>
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