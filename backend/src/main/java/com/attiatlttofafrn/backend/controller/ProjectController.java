package com.attiatlttofafrn.backend.controller;

import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.attiatlttofafrn.backend.dto.project.ProjectRequest;
import com.attiatlttofafrn.backend.dto.project.ProjectResponse;
import com.attiatlttofafrn.backend.dto.project.ProjectUpdateRequest;
import com.attiatlttofafrn.backend.model.Project;
import com.attiatlttofafrn.backend.service.ProjectService;
import com.attiatlttofafrn.backend.service.UserService;

@RestController
@RequestMapping("api/user/projects")
public class ProjectController {

    private final UserService userService;
    private final ProjectService projectService;

    public ProjectController(UserService userService, ProjectService projectService) {
        this.userService = userService;
        this.projectService = projectService;
    }

    @GetMapping("")
    public ResponseEntity<?> getUserProjects(Authentication auth) {
        String email = auth.getName();
        return userService.findByEmail(email)
                .map(user -> ResponseEntity.ok(
                projectService.getProjectsForUser(user)
                        .stream()
                        .map(p -> new ProjectResponse(
                        p.getProjectId(),
                        p.getTitle(),
                        p.getDescription(),
                        p.getStatus(),
                        p.getCreatedAt(),
                        p.getUpdatedAt(),
                        p.getCompletedAt()
                )).toList()
        ))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("")
    public ResponseEntity<?> createProject(Authentication auth, @RequestBody ProjectRequest request) {
        String email = auth.getName();
        return userService.findByEmail(email)
                .map(user -> {
                    Project project = projectService.createProject(user, request.title(), request.description());
                    ProjectResponse response = new ProjectResponse(
                            project.getProjectId(),
                            project.getTitle(),
                            project.getDescription(),
                            project.getStatus(),
                            project.getCreatedAt(),
                            project.getUpdatedAt(),
                            project.getCompletedAt()
                    );
                    return ResponseEntity.ok(response);
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<?> deleteProject(@PathVariable Long projectId) {
        if (projectService.deleteProject(projectId)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{projectId}")
    public ResponseEntity<?> updateProject(@PathVariable Long projectId, @RequestBody ProjectUpdateRequest request) {
        boolean updated = projectService.updateProject(projectId, request);
        if (updated) {
            return ResponseEntity.ok("Project updated successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
