package com.attiatlttofafrn.backend.dto.daily;

import java.time.LocalDateTime;

public record DailyResponse(
        Long daily_id,
        String title,
        Boolean completed,
        LocalDateTime createdAt,
        Integer streak
        ) {

}
