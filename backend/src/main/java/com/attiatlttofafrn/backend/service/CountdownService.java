package com.attiatlttofafrn.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.attiatlttofafrn.backend.model.Countdown;
import com.attiatlttofafrn.backend.model.User;
import com.attiatlttofafrn.backend.repository.CountdownRepository;

@Service
public class CountdownService {

    private final CountdownRepository countdownRepository;

    public CountdownService(CountdownRepository countdownRepository) {
        this.countdownRepository = countdownRepository;
    }

    public List<Countdown> getCountdownsForUser(User user) {
        return countdownRepository.findByUser(user);
    }
}
