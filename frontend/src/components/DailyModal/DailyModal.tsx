import { useState } from "react";
import "./DailyModal.css";

type Props = {
  onAdd: (title: string) => void;
  onClose: () => void;
};

function DailyModal({ onAdd, onClose }: Props) {
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;
    onAdd(title);
    setTitle("");
    onClose();
  };

  return (
    <div className="daily-new-modal-overlay">
      <div className="daily-new-modal">
        <h3>Add New Daily</h3>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Daily title"
        />
        <div className="daily-new-modal-buttons">
          <button onClick={handleAdd}>Add</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default DailyModal;
