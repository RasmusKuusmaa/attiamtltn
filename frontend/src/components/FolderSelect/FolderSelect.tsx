import { useState, useRef, useEffect } from "react";
import { Folder } from "../../types";
import "./FolderSelect.css";

type Props = {
  label: string;
  folders: Folder[];
  selectedFolder: number | "all" | "unassigned";
  onChange: (folderId: number | "all" | "unassigned") => void;
  onAdd: () => void;
  onDelete: (folderId: number) => void;
  totalCount: number;
  unassignedCount: number;
};

function FolderSelect({
  label,
  folders,
  selectedFolder,
  onChange,
  onAdd,
  onDelete,
  totalCount,
  unassignedCount,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDelete = (e: React.MouseEvent, folderId: number, folderTitle: string) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${folderTitle}"?`)) {
      onDelete(folderId);
    }
  };

  const getSelectedLabel = () => {
    if (selectedFolder === "all") return `All (${totalCount ?? 0})`;
    if (selectedFolder === "unassigned") return `Unassigned (${unassignedCount ?? 0})`;
    const folder = folders.find((f) => f.folder_id === selectedFolder);
    return folder ? `${folder.title} (${folder.taskCount ?? 0})` : "";
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="folder-select-wrapper">
      <label>{label}</label>
      <div className="custom-dropdown" ref={dropdownRef}>
        <div className="dropdown-selected" onClick={() => setIsOpen(!isOpen)}>
          {getSelectedLabel()}
          <span className="dropdown-arrow">{isOpen ? "▲" : "▼"}</span>
        </div>
        {isOpen && (
          <div className="dropdown-options">
            <div
              className={`dropdown-option ${selectedFolder === "all" ? "selected" : ""}`}
              onClick={() => {
                onChange("all");
                setIsOpen(false);
              }}
            >
              {`All (${totalCount ?? 0})`}
            </div>
            <div
              className={`dropdown-option ${selectedFolder === "unassigned" ? "selected" : ""}`}
              onClick={() => {
                onChange("unassigned");
                setIsOpen(false);
              }}
            >
              {`Unassigned (${unassignedCount ?? 0})`}
            </div>
            {folders.map((folder) => (
              <div
                key={folder.folder_id}
                className={`dropdown-option ${selectedFolder === folder.folder_id ? "selected" : ""}`}
                onClick={() => {
                  onChange(folder.folder_id);
                  setIsOpen(false);
                }}
              >
                <span className="folder-name">
                  {`${folder.title} (${folder.taskCount ?? 0})`}
                </span>
                <button
                  className="delete-btn"
                  onClick={(e) => handleDelete(e, folder.folder_id, folder.title)}
                  title="Delete folder"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <button onClick={onAdd}>+</button>
    </div>
  );
}

export default FolderSelect;