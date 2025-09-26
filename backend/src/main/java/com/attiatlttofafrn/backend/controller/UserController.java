package com.attiatlttofafrn.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.attiatlttofafrn.backend.model.User;
import com.attiatlttofafrn.backend.service.UserService;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService service) {
        this.userService = service;
    }

}
