import { useState } from "react";
import "./NewFolderModal.css";

type Props = {
  onAdd: (title: string) => void;
  onClose: () => void;
};

export default function NewFolderModal({ onAdd, onClose }: Props) {
  
    const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;
    onAdd(title);
    setTitle("");
    onClose();
  };

  return (
    <div className="folder-new-modal-overlay">
      <div className="folder-new-modal">
        <h3>Add new folder</h3>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Folder title"
        />
      <div className="folder-new-modal-actions">
        <button onClick={handleAdd}>Add</button>
        <button onClick={onClose}>Cancel</button>
      </div>
      </div>
    </div>
  );
}

