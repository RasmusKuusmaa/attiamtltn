import { useState } from "react";
import "./TaskModal.css";

type Props = {
  onAdd: (title: string) => void;
  onClose: () => void;
};

function TaskModal({ onAdd, onClose }: Props) {
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;
    onAdd(title);
    setTitle("");
    onClose();
  };

  return (
    <div className="task-new-modal-overlay">
      <div className="task-new-modal">
        <h3>Add New Task</h3>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
        />
        <div className="task-new-modal-buttons">
          <button onClick={handleAdd}>Add</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;
