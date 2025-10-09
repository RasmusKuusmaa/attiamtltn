import "./NewMissionModal.css";
import { useState } from "react";
type Props = {
  onAdd: (Title: string) => void;
  onClose: () => void;
};

export default function NewMissionModal({ onAdd, onClose }: Props) {
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;

    onAdd(title);
    setTitle("");
    onClose();
  };

  return (
    <div className="mission-new-modal-overlay">
      <div className="mission-new-modal">
        <h3>Add new Mission</h3>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Mission title"
        />

        <div className="mission-new-modal-actions">
          <button onClick={handleAdd}>Add</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
