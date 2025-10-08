import React from "react";
import { Note } from "../../types/Note";
import "./NoteList.css";

interface NoteListProps {
  notes: Note[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  onDelete: (id: number) => void;
  onAdd: () => void;
}

export const NoteList: React.FC<NoteListProps> = ({
  notes,
  selectedId,
  onSelect,
  onDelete,
  onAdd,
}) => {
  const selectedNote = notes.find((note) => note.id === selectedId);
  return (
    <aside className="note-sidebar">
      <h2>{selectedNote?.title} </h2>
      <button onClick={onAdd}>
        <h1>+</h1>
      </button>
      <ul className="note-sidebar-list">
        {notes.length === 0 && <li className="note-empty">No notes yet</li>}
        {notes.map((note) => (
          <li
            key={note.id}
            className={`note-item ${note.id === selectedId ? "selected" : ""}`}
            onClick={() => onSelect(note.id)}

          >
            {note.title || "Untitled"}
            <button onClick={(e) => {
              e.stopPropagation();
              onDelete(note.id);
            }}>
              X
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};
