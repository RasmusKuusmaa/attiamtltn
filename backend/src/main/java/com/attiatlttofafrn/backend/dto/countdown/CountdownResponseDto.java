package com.attiatlttofafrn.backend.dto.countdown;

import java.time.LocalDateTime;

public record CountdownResponseDto(
        Long countdownId,
        Long userId,
        String title,
        LocalDateTime due,
        String displayFormat,
        String negativeAfter,
        String location
        ) {

}
