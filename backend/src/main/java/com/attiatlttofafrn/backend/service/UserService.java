package com.attiatlttofafrn.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.attiatlttofafrn.backend.model.User;
import com.attiatlttofafrn.backend.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User save(User user) {
        return userRepository.save(user);
    }
}
