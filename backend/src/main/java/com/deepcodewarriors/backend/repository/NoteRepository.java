package com.deepcodewarriors.backend.repository;
import com.deepcodewarriors.backend.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Note, Long> {
}
