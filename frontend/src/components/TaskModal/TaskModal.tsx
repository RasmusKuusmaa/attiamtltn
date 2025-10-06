import { useState } from "react";
import "./TaskModal.css";
import { Folder } from "../../types";

type Props = {
  onAdd: (title: string, folderId: number | null) => void;
  onClose: () => void;
  folders: Folder[];
};

function TaskModal({ onAdd, onClose, folders }: Props) {
  const [title, setTitle] = useState("");
  const [selectedFolder, setSelectedFolder] = useState<number | null>(0);

  const handleAdd = () => {
    if (!title.trim()) return;
    onAdd(title, selectedFolder);
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
        <select
          value={selectedFolder ?? ""}
          onChange={(e) => {
            const value = e.target.value;
            setSelectedFolder(value === "" ? null : Number(value));
          }}
        >
          <option value="">UnAssigned</option>
          {folders.map((folder) => (
            <option key={folder.folder_id} value={folder.folder_id}>
              {folder.title}
            </option>
          ))}
        </select>
        <div className="task-new-modal-buttons">
          <button onClick={handleAdd}>Add</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;
