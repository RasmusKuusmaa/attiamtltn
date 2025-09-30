package com.attiatlttofafrn.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.attiatlttofafrn.backend.model.Daily;
import com.attiatlttofafrn.backend.model.User;
import com.attiatlttofafrn.backend.repository.DailyRepository;

@Service
public class DailyService {

    private final DailyRepository dailyRepository;

    public DailyService(DailyRepository dailyRepository) {
        this.dailyRepository = dailyRepository;
    }

    public List<Daily> getDailiesForUser(User user) {
        return dailyRepository.findByUser(user);
    }

    public boolean deleteDaily(Long id) {
        return dailyRepository.findById(id).map(
                daily -> {
                    dailyRepository.delete(daily);
                    return true;

                }).orElse(false);
    }

    public Daily createDaily(User user, String title) {
        Daily daily = new Daily();
        daily.setUser(user);
        daily.setTitle(title);
        daily.setCompleted(false);
        daily.setCreatedAt(LocalDateTime.now());
        daily.setStreak(0);
        return dailyRepository.save(daily);
    }

    public boolean toggleDailyCompletion(Long dailyId, User user) {
        return dailyRepository.findById(dailyId)
                .map(daily -> {
                    if (!daily.getUser().getUser_id().equals(user.getUser_id())) {
                        throw new SecurityException("You cannot modify this daily");
                    }
                    if (!daily.getCompleted()) {
                        daily.setCompleted(true);

                    } else {
                        daily.setCompleted(false);
                    }
                    dailyRepository.save(daily);
                    return true;
                })
                .orElse(false);
    }
}
