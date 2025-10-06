package com.attiatlttofafrn.backend.controller;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.attiatlttofafrn.backend.dto.task.TaskRequest;
import com.attiatlttofafrn.backend.dto.task.TaskResponse;
import com.attiatlttofafrn.backend.dto.task.TaskUpdateRequest;
import com.attiatlttofafrn.backend.model.Folder;
import com.attiatlttofafrn.backend.model.Task;
import com.attiatlttofafrn.backend.service.FolderService;
import com.attiatlttofafrn.backend.service.TaskService;
import com.attiatlttofafrn.backend.service.UserService;

@RestController
@RequestMapping("api/user/tasks")
public class TaskController {

    private final UserService userService;

    private final TaskService taskService;
    private final FolderService folderService;

    public TaskController(UserService userService, TaskService taskService, FolderService folderService) {
        this.userService = userService;
        this.taskService = taskService;
        this.folderService = folderService;
    }

    @GetMapping("")
    public ResponseEntity<?> getUserTasks(Authentication authentication) {
        String email = authentication.getName();

        return userService.findByEmail(email)
                .map(user -> ResponseEntity.ok(
                taskService.getTasksForUser(user)
                        .stream()
                        .map(task -> new TaskResponse(
                        task.getTask_id(),
                        Optional.ofNullable(task.getFolder())
                                .map(Folder::getFolder_id)
                                .orElse(null),
                        task.getTitle(),
                        task.getCompleted(),
                        task.getCreatedAt(),
                        task.getCompletedAt()))
                        .toList())
                ).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<?> deleteTask(@PathVariable Long taskId) {
        if (taskService.deleteTask(taskId)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("")
    public ResponseEntity<?> addTask(Authentication auth, @RequestBody TaskRequest request) {
        String email = auth.getName();

        return userService.findByEmail(email)
                .map(user -> {
                    Folder folder = null;
                    if (request.folderId() != null) {
                        folder = folderService.findById(request.folderId())
                                .orElse(null);
                    }
                    Task task = taskService.createTask(user, request.title(), folder);
                    Long folderId = Optional.ofNullable(task.getFolder())
                            .map(Folder::getFolder_id)
                            .orElse(null);
                    TaskResponse response = new TaskResponse(
                            task.getTask_id(),
                            folderId,
                            task.getTitle(),
                            task.getCompleted(),
                            task.getCreatedAt(),
                            task.getCompletedAt());
                    return ResponseEntity.ok(response);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{taskId}/complete")
    public ResponseEntity<?> completeTask(Authentication auth, @PathVariable Long taskId) {
        String email = auth.getName();

        return userService.findByEmail(email)
                .map(user -> {
                    try {
                        boolean updated = taskService.toggleTaskCompletion(taskId, user);
                        if (updated) {
                            return ResponseEntity.ok().build();
                        } else {
                            return ResponseEntity.notFound().build();
                        }
                    } catch (SecurityException e) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
                    }
                })
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(
            @PathVariable long id,
            @RequestBody TaskUpdateRequest request
    ) {
        boolean updated = taskService.updateTask(id, request);

        if (updated) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
}
