import { useEffect, useState } from "react";
import { Note } from "../types";
import { getUserNotes } from "../services/noteService";


export default function useNotes(token: string ){
    const [notes, setNotes] = useState<Note[]>([]);

    const refresh = async () => {
        const updated = await getUserNotes(token);
        setNotes(updated);
    }
    
    useEffect(() => {
        if (token) refresh();
    }, [token]);


    return {notes};
}