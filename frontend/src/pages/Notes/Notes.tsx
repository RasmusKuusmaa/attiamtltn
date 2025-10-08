import { JSX, useContext, useEffect, useState } from "react";
import { TopBarContext } from "../../context/TopBarcontext";
import { NoteList } from "../../components/NoteList/NoteList";
import useNotes from "../../hooks/useNotes";
import "./Notes.css";
import NewNoteModal from "../../components/NewNoteModal/NewNoteModal";

function useDebouncedValue<T>(value: T, delay: number) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

function Notes(): JSX.Element {
  const { setContent } = useContext(TopBarContext);
  const token = localStorage.getItem("token") || "";
  const { notes, updateNoteContent, deleteNote, refresh, addNote } =
    useNotes(token);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedNote = notes.find((n) => n.id === selectedId);

  const [content, setContentValue] = useState(selectedNote?.content || "");
  const debouncedContent = useDebouncedValue(content, 800);

  useEffect(() => {
    setContent(
      <div>
        <h1>Notes</h1>
      </div>
    );
  }, [setContent]);

  useEffect(() => {
    if (selectedNote) setContentValue(selectedNote.content);
  }, [selectedNote]);

  useEffect(() => {
    if (selectedNote && debouncedContent !== selectedNote.content) {
      updateNoteContent(selectedNote.id, debouncedContent);
    }
  }, [debouncedContent]);

  const handleNoteDeletion = async (id: number) => {
    await deleteNote(id);
    await refresh();
  };
  const [isNewNoteModalOpen, setIsNewNoteModalOpen] = useState(false);

  const handleNewNote = async (title: string) => {
    await addNote(title);
    await refresh();
  };
  return (
    <div className="notes-container">
      <NoteList
        notes={notes}
        selectedId={selectedId}
        onSelect={setSelectedId}
        onDelete={handleNoteDeletion}
        onAdd={() => {
          setIsNewNoteModalOpen(true);
        }}
      />
      <div className="note-content-area">
        {selectedNote ? (
          <textarea
            className="note-content-editable"
            value={content}
            onChange={(e) => setContentValue(e.target.value)}
            placeholder="Write your note..."
          />
        ) : (
          <div>Select a note to edit</div>
        )}
      </div>

      {isNewNoteModalOpen && (
        <NewNoteModal
          onAdd={handleNewNote}
          onClose={() => setIsNewNoteModalOpen(false)}
        />
      )}
    </div>
  );
}

export default Notes;
