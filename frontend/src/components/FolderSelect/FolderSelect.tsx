import { Folder } from "../../types";
import "./FolderSelect.css";

type Props = {
  label: string;
  folders: Folder[];
  selectedFolder: number | "all" | "unassigned";
  onChange: (folderId: number | "all" | "unassigned") => void;
  onAdd: () => void;
  totalCount: number;
  unassignedCount: number;
};

function FolderSelect({
  label,
  folders,
  selectedFolder,
  onChange,
  onAdd,
  totalCount,
  unassignedCount,
}: Props) {
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
        <option value="all">{`All (${totalCount ?? 0})`}</option>
        <option value="unassigned">{`Unassigned (${unassignedCount ?? 0})`}</option>
        {folders.map((folder) => (
          <option key={folder.folder_id} value={folder.folder_id}>
            {`${folder.title} (${folder.taskCount ?? 0})`}
          </option>
        ))}
      </select>
      <button onClick={onAdd}>+</button>
    </div>
  );
}

export default FolderSelect;
