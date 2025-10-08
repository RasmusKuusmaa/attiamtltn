package com.attiatlttofafrn.backend.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.attiatlttofafrn.backend.dto.project.ProjectUpdateRequest;
import com.attiatlttofafrn.backend.model.Project;
import com.attiatlttofafrn.backend.model.User;
import com.attiatlttofafrn.backend.repository.ProjectRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<Project> getProjectsForUser(User user) {
        return projectRepository.findByUser(user);
    }

    public Project createProject(User user, String title, String description) {
        Project project = new Project();
        project.setUser(user);
        project.setTitle(title);
        project.setDescription(description);
        return projectRepository.save(project);
    }

    public boolean deleteProject(Long id) {
        return projectRepository.findById(id).map(p -> {
            projectRepository.delete(p);
            return true;
        }).orElse(false);
    }

    public boolean updateProject(Long id, ProjectUpdateRequest request) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Project not found"));
        project.setTitle(request.title());
        project.setDescription(request.description());
        project.setStatus(request.status());
        projectRepository.save(project);
        return true;
    }
}
