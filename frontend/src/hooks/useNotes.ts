import { useEffect, useState, useCallback } from "react";
import { Note } from "../types";
import {
  addUserNote,
  deleteUserNote,
  getUserNotes,
  updateUserNoteContent,
} from "../services/noteService";

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
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, content } : n)));

    try {
      await updateUserNoteContent(token, id, content);
    } catch (err) {
      console.error("Failed to update note:", err);
    }
  };
  const deleteNote = async (id: number) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    try {
      await deleteUserNote(token, id);
    } catch (err) {
      console.error("Failed to delete note", err);
    }
  };

  const addNote = async (title:string) => {
    try {
      await addUserNote(token, title);
    } catch (err){
      console.error("Failed to add note");
    }
  }

  return { notes, updateNoteContent, refresh, deleteNote, addNote };
}
