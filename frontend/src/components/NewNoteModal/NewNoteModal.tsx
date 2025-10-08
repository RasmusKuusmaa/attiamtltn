import { useState } from "react";
import "./NewNoteModal.css";

type Props = {
  onAdd: (title: string) => void;
  onClose: () => void;
};

export default function NewNoteModal({ onAdd, onClose }: Props) {
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;

    onAdd(title);
    setTitle("");
    onClose();
  };

  return (
    <div className="note-new-modal-overlay">
      <div className="note-new-modal">
        <h3>Add new note</h3>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
        />

        <div className="note-new-modal-actions">
          <button onClick={handleAdd}>Add</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
