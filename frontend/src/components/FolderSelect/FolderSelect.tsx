import { Folder } from "../../types";

type Props = {
  folders: Folder[];
  selectedFolder: number;
  onChange: (folderId: number) => void;
};

function FolderSelect({ folders, selectedFolder, onChange }: Props) {
  return (
    <select
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
  );
}

export default FolderSelect;
