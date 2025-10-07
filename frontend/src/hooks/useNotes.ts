import { useEffect, useState, useCallback } from "react";
import { Note } from "../types";
import { getUserNotes, updateUserNoteContent } from "../services/noteService";

export default function useNotes(token: string) {
  const [notes, setNotes] = useState<Note[]>([]);

  const refresh = useCallback(async () => {
    if (!token) return;
    try {
      const updated = await getUserNotes(token);
      setNotes(updated);
    } catch (err) {
      console.error("Failed to fetch user notes:", err);
    }
  }, [token]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const updateNoteContent = async (id: number, content: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, content } : n))
    );

    try {
      await updateUserNoteContent(token, id, content);
    } catch (err) {
      console.error("Failed to update note:", err);
    }
  };

  return { notes, updateNoteContent, refresh };
}
