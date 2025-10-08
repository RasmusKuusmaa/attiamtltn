package com.attiatlttofafrn.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.attiatlttofafrn.backend.model.Mission;
import com.attiatlttofafrn.backend.model.Project;

public interface MissionRepository extends JpaRepository<Mission, Long> {

    List<Mission> findByProject(Project project);
}
