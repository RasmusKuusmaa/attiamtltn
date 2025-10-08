package com.attiatlttofafrn.backend.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.attiatlttofafrn.backend.dto.mission.MissionUpdateRequest;
import com.attiatlttofafrn.backend.model.Mission;
import com.attiatlttofafrn.backend.model.Project;
import com.attiatlttofafrn.backend.repository.MissionRepository;
import com.attiatlttofafrn.backend.repository.ProjectRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
public class MissionService {

    private final MissionRepository missionRepository;
    private final ProjectRepository projectRepository;

    public MissionService(MissionRepository missionRepository, ProjectRepository projectRepository) {
        this.missionRepository = missionRepository;
        this.projectRepository = projectRepository;
    }

    public List<Mission> getMissionsByProjectId(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("Project not found"));
        return missionRepository.findByProject(project);
    }

    public Mission createMission(Long projectId, String title, String description) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("Project not found"));
        Mission mission = new Mission();
        mission.setProject(project);
        mission.setTitle(title);
        mission.setDescription(description);
        return missionRepository.save(mission);
    }

    public boolean deleteMission(Long id) {
        return missionRepository.findById(id).map(m -> {
            missionRepository.delete(m);
            return true;
        }).orElse(false);
    }

    public boolean updateMission(Long id, MissionUpdateRequest request) {
        Mission mission = missionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Mission not found"));
        mission.setTitle(request.title());
        mission.setDescription(request.description());
        mission.setStatus(request.status());
        missionRepository.save(mission);
        return true;
    }
}
