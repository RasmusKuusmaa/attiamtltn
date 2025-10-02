package com.attiatlttofafrn.backend.dto.task;

import java.time.LocalDateTime;

import com.attiatlttofafrn.backend.model.Folder;

public record TaskResponse(
        Long task_id,
        Long folder_id,
        String title,
        Boolean completed,
        LocalDateTime createdAt,
        LocalDateTime completedAt
        ) {

}
