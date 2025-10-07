import { JSX, useContext, useEffect, useState } from "react";
import { TopBarContext } from "../../context/TopBarcontext";
import { Note } from "../../types/Note";
import { NoteList } from "../../components/NoteList/NoteList";
import "./Notes.css";
import useNotes from "../../hooks/useNotes";

function Notes(): JSX.Element {
  const { setContent } = useContext(TopBarContext);

  const token = localStorage.getItem("token") || "";
  const { notes } = useNotes(token);

  const [selectedId, setSelectedId] = useState<number | null>(
    notes[0]?.id || null
  );
  const selectedNote = notes.find((n) => n.id === selectedId);
  const handleSelect = (id: number) => setSelectedId(id);

  useEffect(() => {
    setContent(
      <div>
        <h1>Notes</h1>
      </div>
    );
  }, [setContent]);

  return (
    <div>
      <NoteList notes={notes} selectedId={selectedId} onSelect={handleSelect} />
    </div>
  );
}

export default Notes;
