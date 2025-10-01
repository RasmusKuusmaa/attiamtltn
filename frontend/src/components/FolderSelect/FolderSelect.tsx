import { Folder } from "../../types";
import "./FolderSelect.css";

type Props = {
  label: string;
  folders: Folder[];
  selectedFolder: number | "all" | "unassigned";
  onChange: (folderId: number | "all" | "unassigned") => void;
};

function FolderSelect({ label, folders, selectedFolder, onChange }: Props) {
  return (
    <div className="folder-select-wrapper">
      <label>{label}</label>
      <select
        className="folder-select"
        value={selectedFolder}
        onChange={(e) => {
          const value = e.target.value;
          if (value === "all" || value === "unassigned") {
            onChange(value);
          } else {
            onChange(Number(value));
          }
        }}
      >
        <option value="all">All</option>
        <option value="unassigned">Unassigned</option>
        {folders.map((folder) => (
          <option key={folder.folder_id} value={folder.folder_id}>
            {folder.title}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FolderSelect;
