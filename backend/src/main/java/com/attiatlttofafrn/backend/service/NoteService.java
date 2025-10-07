package com.attiatlttofafrn.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.attiatlttofafrn.backend.model.Note;
import com.attiatlttofafrn.backend.model.User;
import com.attiatlttofafrn.backend.repository.NoteRepository;

@Service
public class NoteService {

    private final NoteRepository noteRepository;

    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    public List<Note> getNotesForUser(User user) {
        return noteRepository.findByUser(user);
    }

}
