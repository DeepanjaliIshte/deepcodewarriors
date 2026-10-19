package com.deepcodewarriors.api;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class CourseController {

    @GetMapping("/health")
    public Status health() {
        return new Status("UP");
    }

    @GetMapping("/courses")
    public List<Course> getCourses() {
        return List.of(
                new Course("JAVA-101", "Java Fundamentals", "Beginner"),
                new Course("SPRING-201", "Spring Boot REST APIs", "Intermediate"),
                new Course("DSA-301", "Data Structures & Algorithms", "Advanced")
        );
    }

    public record Status(String status) {
    }

    public record Course(String code, String title, String level) {
    }
}
