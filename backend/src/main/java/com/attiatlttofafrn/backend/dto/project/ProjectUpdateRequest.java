package com.attiatlttofafrn.backend.dto.project;

public record ProjectUpdateRequest(
        String title,
        String description,
        String status
        ) {

}
