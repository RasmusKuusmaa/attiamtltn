package com.attiatlttofafrn.backend.controller;

import org.springframework.security.core.Authentication;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.attiatlttofafrn.backend.dto.note.NoteRequest;
import com.attiatlttofafrn.backend.dto.note.NoteResponse;
import com.attiatlttofafrn.backend.dto.note.NoteUpdateRequest;
import com.attiatlttofafrn.backend.model.Note;
import com.attiatlttofafrn.backend.repository.NoteRepository;
import com.attiatlttofafrn.backend.service.NoteService;
import com.attiatlttofafrn.backend.service.UserService;

@RestController
@RequestMapping("api/user/notes")
public class NoteController {

    private final UserService userService;
    private final NoteService noteService;

    public NoteController(UserService userService, NoteService noteService) {
        this.userService = userService;
        this.noteService = noteService;
    }

    @GetMapping("")
    public ResponseEntity<?> getUserNotes(Authentication auth) {
        String email = auth.getName();

        return userService.findByEmail(email)
                .map(user -> ResponseEntity.ok(
                noteService.getNotesForUser(user)
                        .stream()
                        .map(note -> new NoteResponse(
                        note.getId(),
                        note.getTitle(),
                        note.getContent(),
                        note.getCreatedAt(),
                        note.getUpdatedAt()
                )).toList()
        )).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("")
    public ResponseEntity<?> addnote(Authentication auth, @RequestBody NoteRequest request) {
        String email = auth.getName();

        return userService.findByEmail(email)
                .map(user -> {
                    Note note = noteService.createNote(user, request.title());
                    NoteResponse response = new NoteResponse(
                            note.getId(),
                            note.getTitle(),
                            note.getContent(),
                            note.getCreatedAt(),
                            note.getUpdatedAt()
                    );
                    return ResponseEntity.ok(response);
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{noteId}")
    public ResponseEntity<?> deleteNote(@PathVariable Long noteId) {
        if (noteService.deleteNote(noteId)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateNoteContent(
            @PathVariable("id") Long noteId,
            @RequestBody NoteUpdateRequest request) {

        boolean updated = noteService.updateNote(noteId, request);

        if (updated) {
            return ResponseEntity.ok("Note updated successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
