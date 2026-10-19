package com.deepcodewarriors.backend.controller;

import com.deepcodewarriors.backend.entity.Tutorial;
import com.deepcodewarriors.backend.repository.TutorialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tutorials")
@CrossOrigin(origins = "*")
public class TutorialController {

    @Autowired
    private TutorialRepository tutorialRepository;

    @GetMapping
    public List<Tutorial> getAllTutorials() {
        return tutorialRepository.findAll();
    }

    @GetMapping("/{slug}")
    public ResponseEntity<Tutorial> getTutorialBySlug(@PathVariable String slug) {
        return tutorialRepository.findBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Tutorial createTutorial(@RequestBody Tutorial tutorial) {
        return tutorialRepository.save(tutorial);
    }
}
