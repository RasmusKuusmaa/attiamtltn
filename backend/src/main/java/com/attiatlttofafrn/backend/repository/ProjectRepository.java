package com.attiatlttofafrn.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.attiatlttofafrn.backend.model.Project;
import com.attiatlttofafrn.backend.model.User;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findByUser(User user);
}
