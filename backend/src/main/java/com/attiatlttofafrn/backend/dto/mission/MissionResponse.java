package com.attiatlttofafrn.backend.dto.mission;

import java.time.LocalDateTime;

public record MissionResponse(
        Long id,
        String title,
        String description,
        String status,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        LocalDateTime completedAt
        ) {

}
