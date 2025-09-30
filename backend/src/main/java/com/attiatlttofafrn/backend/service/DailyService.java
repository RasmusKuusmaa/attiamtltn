package com.attiatlttofafrn.backend.service;

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
}
