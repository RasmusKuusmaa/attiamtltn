import { Folder } from "../../types";
import "./FolderSelect.css";

type Props = {
  label: string;
  folders: Folder[];
  selectedFolder: number;
  onChange: (folderId: number) => void;
};

function FolderSelect({ label, folders, selectedFolder, onChange }: Props) {
  return (
    <div className="folder-select-wrapper">
      <label>{label}</label>
      <select
        className="folder-select"
        value={selectedFolder}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        <option value={0}>Select a folder</option>
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
