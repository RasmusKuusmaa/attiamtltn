package com.attiatlttofafrn.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.attiatlttofafrn.backend.model.Folder;
import com.attiatlttofafrn.backend.model.User;

public interface FolderRepository extends JpaRepository<Folder, Long> {

    List<Folder> findByUser(User user);
}
