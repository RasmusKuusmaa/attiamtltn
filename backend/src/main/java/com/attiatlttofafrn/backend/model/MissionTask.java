package com.attiatlttofafrn.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Optional;

@Entity
@Table(name = "mission_tasks")
public class MissionTask {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long missionTaskId;

    @ManyToOne
    @JoinColumn(name = "mission_id", nullable = false)
    private Mission mission;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime completedAt;

    @Column(length = 100)
    private String status = "created";

    public Long getMissionTaskId() {
        return missionTaskId;
    }

    public void setMissionTaskId(Long missionTaskId) {
        this.missionTaskId = missionTaskId;
    }

    public Mission getMission() {
        return mission;
    }

    public void setMission(Mission mission) {
        this.mission = mission;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title2) {
        this.title = title2;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description2) {
        this.description = description2;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public LocalDateTime getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(LocalDateTime completedAt) {
        this.completedAt = completedAt;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}
