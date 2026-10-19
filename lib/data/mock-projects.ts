export interface ProjectTask {
  id: string;
  title: string;
  description: string;
  concepts: string[];
  hints: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  technologies: string[];
  tasks: ProjectTask[];
}

export const MOCK_PROJECTS: Project[] = [
  {
    id: "java-employee-management",
    title: "Java Employee Management System",
    description: "Build a complete employee management system from scratch using Java, Spring Boot, and REST APIs.",
    level: "Intermediate",
    technologies: ["Java", "Spring Boot", "MySQL", "REST API"],
    tasks: [
      {
        id: "task-1",
        title: "Create Spring Boot project",
        description: "Initialize a new Spring Boot project with Web, JPA, and MySQL dependencies.",
        concepts: ["Spring Initializr", "Dependencies", "Maven/Gradle"],
        hints: ["Use start.spring.io", "Select Spring Web, Spring Data JPA, and MySQL Driver"]
      },
      {
        id: "task-2",
        title: "Create Employee model",
        description: "Create an Employee entity class with id, firstName, lastName, and emailId fields.",
        concepts: ["JPA Entities", "@Entity", "@Id", "@GeneratedValue"],
        hints: ["Don't forget the default constructor and getters/setters (or Lombok)"]
      },
      {
        id: "task-3",
        title: "Create Repository interface",
        description: "Create an EmployeeRepository interface extending JpaRepository.",
        concepts: ["Spring Data JPA", "JpaRepository interface"],
        hints: ["It should be: public interface EmployeeRepository extends JpaRepository<Employee, Long>"]
      },
      {
        id: "task-4",
        title: "Create REST API Controller",
        description: "Create an EmployeeController with endpoints for GET all employees and POST new employee.",
        concepts: ["@RestController", "@RequestMapping", "@GetMapping", "@PostMapping", "@RequestBody"],
        hints: ["Inject the EmployeeRepository via constructor"]
      },
      {
        id: "task-5",
        title: "Connect MySQL Database",
        description: "Configure your application.properties to connect to a local MySQL instance.",
        concepts: ["application.properties", "JDBC URL", "spring.datasource.*"],
        hints: ["Make sure MySQL is running on port 3306"]
      }
    ]
  },
  {
    id: "python-weather-app",
    title: "Python CLI Weather App",
    description: "Build a command-line application that fetches real-time weather data from an API.",
    level: "Beginner",
    technologies: ["Python", "Requests", "JSON", "REST API"],
    tasks: [
      {
        id: "task-1",
        title: "Setup Project and Environment",
        description: "Create a virtual environment and install the 'requests' library.",
        concepts: ["Virtual Environments (venv)", "pip install"],
        hints: ["python -m venv env", "pip install requests"]
      },
      {
        id: "task-2",
        title: "Get API Key",
        description: "Sign up for a free OpenWeatherMap API key.",
        concepts: ["API Authentication", "Environment Variables"],
        hints: ["Store the key in a .env file and use python-dotenv"]
      },
      {
        id: "task-3",
        title: "Make API Request",
        description: "Write a function that accepts a city name and makes a GET request to the weather API.",
        concepts: ["requests.get()", "Query parameters", "JSON response"],
        hints: ["Check the status code before parsing the JSON"]
      }
    ]
  }
];
