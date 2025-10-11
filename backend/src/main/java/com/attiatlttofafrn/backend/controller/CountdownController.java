package com.attiatlttofafrn.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.attiatlttofafrn.backend.dto.countdown.CountdownResponseDto;
import com.attiatlttofafrn.backend.service.CountdownService;
import com.attiatlttofafrn.backend.service.UserService;

@RestController
@RequestMapping("/api/user/countdowns")
public class CountdownController {

    private final CountdownService countdownService;
    private final UserService userService;

    public CountdownController(CountdownService countdownService, UserService userService) {
        this.countdownService = countdownService;
        this.userService = userService;
    }

    @GetMapping("")
    public ResponseEntity<?> getUserCountdowns(Authentication auth) {
        String email = auth.getName();
        return userService.findByEmail(email)
                .map(user -> {
                    var countdownDtos = countdownService.getCountdownsForUser(user)
                            .stream()
                            .map(countdown -> new CountdownResponseDto(
                            countdown.getCountdownId(),
                            user.getUser_id(),
                            countdown.getTitle(),
                            countdown.getDue(),
                            countdown.getDisplayFormat(),
                            countdown.getNegativeAfter(),
                            countdown.getLocation()
                    ))
                            .toList();

                    return ResponseEntity.ok(countdownDtos);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
