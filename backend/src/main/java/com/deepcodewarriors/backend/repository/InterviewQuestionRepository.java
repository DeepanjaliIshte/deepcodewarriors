package com.deepcodewarriors.backend.repository;
import com.deepcodewarriors.backend.entity.InterviewQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InterviewQuestionRepository extends JpaRepository<InterviewQuestion, Long> {
}
