package com.attiatlttofafrn.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.attiatlttofafrn.backend.model.User;
import com.attiatlttofafrn.backend.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;
    
    public UserService(UserRepository repo){
        userRepository = repo;
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }
}
