package com.attiatlttofafrn.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.attiatlttofafrn.backend.dto.missiontask.MissionTaskRequest;
import com.attiatlttofafrn.backend.dto.missiontask.MissionTaskResponse;
import com.attiatlttofafrn.backend.dto.missiontask.MissionTaskUpdateRequest;
import com.attiatlttofafrn.backend.model.MissionTask;
import com.attiatlttofafrn.backend.service.MissionTaskService;

@RestController
@RequestMapping("api/user/mission-tasks")
public class MissionTaskController {

    private final MissionTaskService missionTaskService;

    public MissionTaskController(MissionTaskService missionTaskService) {
        this.missionTaskService = missionTaskService;
    }

    @GetMapping("/mission/{missionId}")
    public ResponseEntity<?> getTasksByMission(@PathVariable Long missionId) {
        return ResponseEntity.ok(
                missionTaskService.getTasksByMissionId(missionId)
                        .stream()
                        .map(t -> new MissionTaskResponse(
                        t.getMissionTaskId(),
                        t.getTitle(),
                        t.getDescription(),
                        t.getStatus(),
                        t.getCreatedAt(),
                        t.getUpdatedAt(),
                        t.getCompletedAt()
                )).toList()
        );
    }

    @PostMapping("/mission/{missionId}")
    public ResponseEntity<?> createTask(@PathVariable Long missionId, @RequestBody MissionTaskRequest request) {
        MissionTask task = missionTaskService.createTask(missionId, request.title(), request.description());
        MissionTaskResponse response = new MissionTaskResponse(
                task.getMissionTaskId(),
                task.getTitle(),
                task.getDescription(),
                task.getStatus(),
                task.getCreatedAt(),
                task.getUpdatedAt(),
                task.getCompletedAt()
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<?> deleteTask(@PathVariable Long taskId) {
        if (missionTaskService.deleteTask(taskId)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<?> updateTask(@PathVariable Long taskId, @RequestBody MissionTaskUpdateRequest request) {
        boolean updated = missionTaskService.updateTask(taskId, request);
        if (updated) {
            return ResponseEntity.ok("Task updated successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
