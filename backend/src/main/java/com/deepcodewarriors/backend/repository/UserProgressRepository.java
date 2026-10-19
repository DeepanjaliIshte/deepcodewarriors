package com.deepcodewarriors.backend.repository;
import com.deepcodewarriors.backend.entity.UserProgress;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProgressRepository extends JpaRepository<UserProgress, Long> {
}
