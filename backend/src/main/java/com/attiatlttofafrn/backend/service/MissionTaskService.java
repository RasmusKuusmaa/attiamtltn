package com.attiatlttofafrn.backend.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.attiatlttofafrn.backend.dto.missiontask.MissionTaskUpdateRequest;
import com.attiatlttofafrn.backend.model.Mission;
import com.attiatlttofafrn.backend.model.MissionTask;
import com.attiatlttofafrn.backend.repository.MissionRepository;
import com.attiatlttofafrn.backend.repository.MissionTaskRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
public class MissionTaskService {

    private final MissionTaskRepository missionTaskRepository;
    private final MissionRepository missionRepository;

    public MissionTaskService(MissionTaskRepository missionTaskRepository, MissionRepository missionRepository) {
        this.missionTaskRepository = missionTaskRepository;
        this.missionRepository = missionRepository;
    }

    public List<MissionTask> getTasksByMissionId(Long missionId) {
        Mission mission = missionRepository.findById(missionId)
                .orElseThrow(() -> new EntityNotFoundException("Mission not found"));
        return missionTaskRepository.findByMission(mission);
    }

    public MissionTask createTask(Long missionId, String title, String description) {
        Mission mission = missionRepository.findById(missionId)
                .orElseThrow(() -> new EntityNotFoundException("Mission not found"));
        MissionTask task = new MissionTask();
        task.setMission(mission);
        task.setTitle(title);
        task.setDescription(description);
        return missionTaskRepository.save(task);
    }

    public boolean deleteTask(Long id) {
        return missionTaskRepository.findById(id).map(t -> {
            missionTaskRepository.delete(t);
            return true;
        }).orElse(false);
    }

    public boolean updateTask(Long id, MissionTaskUpdateRequest request) {
        MissionTask task = missionTaskRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Task not found"));
        task.setTitle(request.title());
        task.setDescription(request.description());
        task.setStatus(request.status());
        missionTaskRepository.save(task);
        return true;
    }
}
