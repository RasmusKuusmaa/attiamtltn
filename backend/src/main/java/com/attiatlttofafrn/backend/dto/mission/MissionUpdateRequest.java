package com.attiatlttofafrn.backend.dto.mission;

public record MissionUpdateRequest(
        String title,
        String description,
        String status
        ) {

}
