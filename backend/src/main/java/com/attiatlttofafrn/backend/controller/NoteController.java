package com.attiatlttofafrn.backend.controller;

import org.springframework.security.core.Authentication;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.attiatlttofafrn.backend.dto.note.NoteResponse;
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
}
