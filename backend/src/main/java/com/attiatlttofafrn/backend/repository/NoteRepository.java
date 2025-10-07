package com.attiatlttofafrn.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.attiatlttofafrn.backend.model.Note;
import com.attiatlttofafrn.backend.model.User;

public interface NoteRepository extends JpaRepository<Note, Long> {

    List<Note> findByUser(User user);
}
