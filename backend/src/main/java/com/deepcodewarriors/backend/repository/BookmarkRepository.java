package com.deepcodewarriors.backend.repository;
import com.deepcodewarriors.backend.entity.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
}
