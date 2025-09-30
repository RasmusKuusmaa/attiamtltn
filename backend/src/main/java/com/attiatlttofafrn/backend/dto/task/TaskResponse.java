package com.attiatlttofafrn.backend.dto.task;

import java.time.LocalDateTime;

public record TaskResponse(
        Long task_id,
        String title,
        Boolean completed,
        LocalDateTime createdAt,
        LocalDateTime completedAt
        ) {

}
