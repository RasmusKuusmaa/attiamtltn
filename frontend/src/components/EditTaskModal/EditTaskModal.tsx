import { useState } from "react";
import { Folder } from "../../types";
import "./EditTaskModal.css";

type Props = {
  taskId: number;
  currentFolderId: number | null;
  folders: Folder[];
  onSave: (taskId: number, folderId: number | null) => void;
  onClose: () => void;
};

function EditTaskModal({
  taskId,
  currentFolderId,
  folders,
  onSave,
  onClose
}: Props) {
  const [selectedFolder, setSelectedFolder] = useState<number | null>(
    currentFolderId
  );
  const handleSave = () => {
    onSave(taskId, selectedFolder);
    onClose();
  };
  return (
    <div className="task-edit-modal-overlay">
      <div className="task-edit-modal">
        <h3>Edit Task</h3>
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
        <div className="modal-actions">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
export default EditTaskModal;