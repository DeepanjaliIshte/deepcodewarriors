package com.deepcodewarriors.backend.repository;
import com.deepcodewarriors.backend.entity.Tutorial;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface TutorialRepository extends JpaRepository<Tutorial, Long> {
    Optional<Tutorial> findBySlug(String slug);
}
