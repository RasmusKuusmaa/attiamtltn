package com.attiatlttofafrn.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.attiatlttofafrn.backend.model.MissionTask;
import com.attiatlttofafrn.backend.model.User;

public interface MissionTaskRepository extends JpaRepository<MissionTask, Long> {

    List<MissionTask> findByUser(User user);
}
