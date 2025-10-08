package com.attiatlttofafrn.backend.dto.missiontask;

public record MissionTaskUpdateRequest(
        String title,
        String description,
        String status
        ) {

}
