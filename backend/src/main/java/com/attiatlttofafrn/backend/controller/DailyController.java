package com.attiatlttofafrn.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.attiatlttofafrn.backend.dto.daily.DailyRequest;
import com.attiatlttofafrn.backend.dto.daily.DailyResponse;
import com.attiatlttofafrn.backend.model.Daily;
import com.attiatlttofafrn.backend.service.DailyService;
import com.attiatlttofafrn.backend.service.UserService;

@RestController
@RequestMapping("/api/user/dailies")
public class DailyController {

    private final UserService userService;
    private final DailyService dailyService;

    public DailyController(UserService userService, DailyService dailyService) {
        this.userService = userService;

        this.dailyService = dailyService;
    }

    @GetMapping("")
    public ResponseEntity<?> getUserDailies(Authentication auth) {
        String email = auth.getName();
        return userService.findByEmail(email)
                .map(user -> ResponseEntity.ok(
                dailyService.getDailiesForUser(user)
                        .stream()
                        .map(daily -> new DailyResponse(
                        daily.getDaily_id(),
                        daily.getTitle(),
                        daily.getCompleted(),
                        daily.getCreatedAt(),
                        daily.getStreak())).
                        toList()))
                .orElse(ResponseEntity.notFound().build()
                );
    }

    @DeleteMapping("/{dailyId}")
    public ResponseEntity<?> deleteDaily(@PathVariable Long dailyId) {
        if (dailyService.deleteDaily(dailyId)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("")
    public ResponseEntity<?> addDaily(Authentication auth, @RequestBody DailyRequest request) {
        String email = auth.getName();

        return userService.findByEmail(email)
                .map(user -> {
                    Daily daily = dailyService.createDaily(user, request.title());
                    DailyResponse response = new DailyResponse(
                            daily.getDaily_id(),
                            daily.getTitle(),
                            daily.getCompleted(),
                            daily.getCreatedAt(),
                            daily.getStreak());
                    return ResponseEntity.ok(response);
                }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{dailyId}/complete")
    public ResponseEntity<?> completeDaily(Authentication auth, @PathVariable Long dailyId) {
        String email = auth.getName();

        return userService.findByEmail(email)
                .map(user -> {
                    try {
                        boolean updated = dailyService.toggleDailyCompletion(dailyId, user);
                        if (updated) {
                            return ResponseEntity.ok().build();
                        } else {
                            return ResponseEntity.notFound().build();
                        }
                    } catch (SecurityException e) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
                    }
                })
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }
}
