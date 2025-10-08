package com.attiatlttofafrn.backend.dto.missiontask;

import java.time.LocalDateTime;

public record MissionTaskResponse(
        Long id,
        String title,
        String description,
        String status,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        LocalDateTime completedAt
        ) {

}
