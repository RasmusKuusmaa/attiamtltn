package com.attiatlttofafrn.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.attiatlttofafrn.backend.dto.mission.MissionRequest;
import com.attiatlttofafrn.backend.dto.mission.MissionResponse;
import com.attiatlttofafrn.backend.dto.mission.MissionUpdateRequest;
import com.attiatlttofafrn.backend.model.Mission;
import com.attiatlttofafrn.backend.service.MissionService;

@RestController
@RequestMapping("api/user/missions")
public class MissionController {

    private final MissionService missionService;

    public MissionController(MissionService missionService) {
        this.missionService = missionService;
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<?> getMissionsByProject(@PathVariable Long projectId) {
        return ResponseEntity.ok(
                missionService.getMissionsByProjectId(projectId)
                        .stream()
                        .map(m -> new MissionResponse(
                        m.getMissionId(),
                        m.getTitle(),
                        m.getDescription(),
                        m.getStatus(),
                        m.getCreatedAt(),
                        m.getUpdatedAt(),
                        m.getCompletedAt()
                )).toList()
        );
    }

    @PostMapping("/project/{projectId}")
    public ResponseEntity<?> createMission(@PathVariable Long projectId, @RequestBody MissionRequest request) {
        Mission mission = missionService.createMission(projectId, request.title(), request.description());
        MissionResponse response = new MissionResponse(
                mission.getMissionId(),
                mission.getTitle(),
                mission.getDescription(),
                mission.getStatus(),
                mission.getCreatedAt(),
                mission.getUpdatedAt(),
                mission.getCompletedAt()
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{missionId}")
    public ResponseEntity<?> deleteMission(@PathVariable Long missionId) {
        if (missionService.deleteMission(missionId)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{missionId}")
    public ResponseEntity<?> updateMission(@PathVariable Long missionId, @RequestBody MissionUpdateRequest request) {
        boolean updated = missionService.updateMission(missionId, request);
        if (updated) {
            return ResponseEntity.ok("Mission updated successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
