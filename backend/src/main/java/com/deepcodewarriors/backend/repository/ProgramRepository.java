package com.deepcodewarriors.backend.repository;
import com.deepcodewarriors.backend.entity.Program;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ProgramRepository extends JpaRepository<Program, Long> {
    Optional<Program> findBySlug(String slug);
}
