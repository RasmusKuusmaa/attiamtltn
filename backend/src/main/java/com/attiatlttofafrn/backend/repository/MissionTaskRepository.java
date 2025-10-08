package com.attiatlttofafrn.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.attiatlttofafrn.backend.model.Mission;
import com.attiatlttofafrn.backend.model.MissionTask;

public interface MissionTaskRepository extends JpaRepository<MissionTask, Long> {

    List<MissionTask> findByMission(Mission mission);
}
