package com.attiatlttofafrn.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.attiatlttofafrn.backend.model.Countdown;
import com.attiatlttofafrn.backend.model.User;

public interface CountdownRepository extends JpaRepository<Countdown, Long> {

    List<Countdown> findByUser(User user);
}
