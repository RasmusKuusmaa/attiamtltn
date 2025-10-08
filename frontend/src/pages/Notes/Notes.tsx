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
  const { notes, updateNoteContent, deleteNote, addNote } = useNotes(token);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedNote = notes.find((n) => n.id === selectedId);

  const [content, setContentValue] = useState("");
  const debouncedContent = useDebouncedValue(content, 800);

  const [isNewNoteModalOpen, setIsNewNoteModalOpen] = useState(false);

  useEffect(() => {
    setContent(<div><h1>Notes</h1></div>);
  }, [setContent]);

  useEffect(() => {
    if (selectedNote) {
      setContentValue(selectedNote.content ?? "");
    } else {
      setContentValue("");
    }
  }, [selectedNote?.id]);

  useEffect(() => {
    if (selectedNote && debouncedContent !== (selectedNote.content ?? "")) {
      updateNoteContent(selectedNote.id, debouncedContent);
    }
  }, [debouncedContent]);

  const handleNoteDeletion = async (id: number) => {
    await deleteNote(id);
    if (selectedId === id) {
      setSelectedId(null);
      setContentValue("");
    }
  };

  const handleNewNote = async (title: string) => {
    const newNote = await addNote(title);
    setSelectedId(newNote.id);
    setContentValue("");
  };

  return (
    <div className="notes-container">
      <NoteList
        notes={notes}
        selectedId={selectedId}
        onSelect={setSelectedId}
        onDelete={handleNoteDeletion}
        onAdd={() => setIsNewNoteModalOpen(true)}
      />
      <div className="note-content-area">
        <textarea
          className="note-content-editable"
          value={selectedNote ? content : ""}
          onChange={(e) => setContentValue(e.target.value)}
          placeholder={selectedNote ? "Write your note..." : "Select a note to edit"}
          disabled={!selectedNote}
        />
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
