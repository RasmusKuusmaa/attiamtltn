package com.attiatlttofafrn.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "countdowns")
public class Countdown {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long countdownId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String title;

    private LocalDateTime due;

    @Column(name = "display_format")
    private String displayFormat;

    @Column(name = "negative_after")
    private String negativeAfter;

    private String location;

    public Long getCountdownId() {
        return countdownId;
    }

    public void setCountdownId(Long countdownId) {
        this.countdownId = countdownId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDateTime getDue() {
        return due;
    }

    public void setDue(LocalDateTime due) {
        this.due = due;
    }

    public String getDisplayFormat() {
        return displayFormat;
    }

    public void setDisplayFormat(String displayFormat) {
        this.displayFormat = displayFormat;
    }

    public String getNegativeAfter() {
        return negativeAfter;
    }

    public void setNegativeAfter(String negativeAfter) {
        this.negativeAfter = negativeAfter;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
