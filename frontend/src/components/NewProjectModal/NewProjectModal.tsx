import { useState } from "react";
import "./NewProjectModal.css";

type Props = {
    onAdd: (title: string) => void;
    onClose: () => void;
}
export default function NewProjectModal({onAdd, onClose}: Props) {
    const [title, setTitle] = useState("");

    const handleAdd = () => {
        if (!title.trim()) return;

        onAdd(title);
        setTitle("");
        onClose();
    }

    return (
        <div className="project-new-modal-overlay">
            <div className="project-new-modal">
                <h3>Add new Project</h3>
                <input 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Project title"
                />

                <div className="project-new-modal-actions">
                    <button onClick={handleAdd}>Add</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>

    );
}