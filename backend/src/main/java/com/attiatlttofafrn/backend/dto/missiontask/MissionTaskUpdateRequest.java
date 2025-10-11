package com.attiatlttofafrn.backend.dto.missiontask;

import java.util.Optional;

public record MissionTaskUpdateRequest(
        Optional<String> title,
        Optional<String> description,
        Optional<String> status
) { }
