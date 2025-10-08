package com.attiatlttofafrn.backend.dto.project;

import java.time.LocalDateTime;

public record ProjectResponse(
        Long id,
        String title,
        String description,
        String status,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        LocalDateTime completedAt
        ) {

}
