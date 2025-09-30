package com.attiatlttofafrn.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.attiatlttofafrn.backend.model.Daily;
import com.attiatlttofafrn.backend.model.User;

public interface DailyRepository extends JpaRepository<Daily, Long> {

    List<Daily> findByUser(User user);
}
