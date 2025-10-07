package com.attiatlttofafrn.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.attiatlttofafrn.backend.dto.note.NoteUpdateRequest;
import com.attiatlttofafrn.backend.model.Note;
import com.attiatlttofafrn.backend.model.User;
import com.attiatlttofafrn.backend.repository.NoteRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class NoteService {

    private final NoteRepository noteRepository;

    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    public List<Note> getNotesForUser(User user) {
        return noteRepository.findByUser(user);
    }

    public Note createNote(User user, String title) {
        Note note = new Note();
        note.setUser(user);
        note.setTitle(title);
        return noteRepository.save(note);
    }

    public boolean deleteNote(Long id) {
        return noteRepository.findById(id).map(note -> {
            noteRepository.delete(note);
            return true;
        })
                .orElse(false);
    }

    public boolean updateNote(Long noteId, NoteUpdateRequest request) {
        Note note = noteRepository.findById(noteId)
                .orElseThrow(() -> new EntityNotFoundException("Note not found"));

        note.setContent(request.content());
        noteRepository.save(note);
        return true;
    }
}
