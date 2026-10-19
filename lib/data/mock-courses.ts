import { Course } from "./course-schema";
import { JAVA_COURSE } from "./mock-course-java-generated";
import { ADVANCED_JAVA_COURSE } from "./mock-course-advanced-java-generated";
import { PYTHON_COURSE } from "./mock-course-python-generated";
import { FLUTTER_COURSE } from "./mock-course-flutter-generated";
import { WEB_COURSE } from "./mock-course-web-generated";
import { DSA_COURSE } from "./mock-course-dsa-generated";

export const MOCK_COURSES: Course[] = [
  PYTHON_COURSE,
  FLUTTER_COURSE,
  WEB_COURSE,
  JAVA_COURSE,
  ADVANCED_JAVA_COURSE,
  DSA_COURSE
];
