package com.deepcodewarriors.backend.service;

import com.deepcodewarriors.backend.entity.Tutorial;
import com.deepcodewarriors.backend.repository.TutorialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TutorialService {
    @Autowired
    private TutorialRepository tutorialRepository;

    public List<Tutorial> getAllTutorials() {
        return tutorialRepository.findAll();
    }
}
