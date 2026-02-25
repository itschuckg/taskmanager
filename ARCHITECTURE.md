# Task Manager Application - Architecture

## System Architecture Diagram

```mermaid
graph TB
    UI[User Interface Angular Material]
    AppComp[App Component]
    TaskForm[Task Form Component]
    TaskList[Task List Component]
    TaskService[Task Service HTTP Client]
    TaskModel[Task Model Interface]
    
    Controller[Task Controller @RestController /api/tasks]
    Service[Task Service @Service Business Logic]
    Repository[Task Repository @Repository JPA Interface]
    Entity[Task Entity @Entity ORM Mapping]
    
    MariaDB[(MariaDB 11.0 taskmanager DB Port 3307)]
    Docker[Docker Compose Container Orchestration]
    Git[Git Repository Version Control]
    
    UI --> AppComp
    AppComp --> TaskForm
    AppComp --> TaskList
    TaskForm --> TaskService
    TaskList --> TaskService
    TaskService --> TaskModel
    
    Controller --> Service
    Service --> Repository
    Repository --> Entity
    
    TaskService -->|HTTP REST API Port 8080| Controller
    Entity -->|JDBC| MariaDB
    Docker -.->|Manages| MariaDB
    Git -.->|Tracks| UI
    Git -.->|Tracks| Controller
```

## Component Flow

```mermaid
sequenceDiagram
    participant User
    participant TaskList
    participant TaskForm
    participant TaskService
    participant Controller
    participant Service
    participant Repository
    participant Database
    
    User->>TaskForm: Create Task
    TaskForm->>TaskService: createTask(task)
    TaskService->>Controller: POST /api/tasks
    Controller->>Service: createTask(task)
    Service->>Repository: save(task)
    Repository->>Database: INSERT INTO tasks
    Database-->>Repository: Task with ID
    Repository-->>Service: Task Entity
    Service-->>Controller: Task Entity
    Controller-->>TaskService: HTTP 201 + Task JSON
    TaskService-->>TaskForm: Task Observable
    TaskForm->>TaskList: taskCreated event
    TaskList->>TaskService: getAllTasks()
    TaskService->>Controller: GET /api/tasks
    Controller->>Service: getAllTasks()
    Service->>Repository: findAllOrderByCreatedAtDesc()
    Repository->>Database: SELECT * FROM tasks ORDER BY created_at DESC
    Database-->>Repository: Task List
    Repository-->>Service: List<Task>
    Service-->>Controller: List<Task>
    Controller-->>TaskService: HTTP 200 + Tasks JSON
    TaskService-->>TaskList: Tasks Observable
    TaskList->>User: Display Updated Tasks
```

## Technology Stack

### Frontend
- **Framework**: Angular 17
- **UI Library**: Angular Material
- **Language**: TypeScript 5.2
- **State Management**: RxJS Observables
- **HTTP Client**: Angular HttpClient
- **Build Tool**: Angular CLI
- **Dev Server**: Port 4200

### Backend
- **Framework**: Spring Boot 2.7.18
- **Language**: Java 11
- **ORM**: Hibernate (JPA)
- **Database Driver**: MariaDB JDBC
- **Validation**: Bean Validation (javax.validation)
- **Build Tool**: Maven
- **Server**: Port 8080

### Database
- **DBMS**: MariaDB 11.0
- **Port**: 3307 (mapped from 3306)
- **Schema**: taskmanager
- **Tables**: tasks

### Infrastructure
- **Containerization**: Docker Compose
- **Version Control**: Git
- **Repository**: GitHub (itschuckg/taskmanager)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks (sorted by created_at DESC) |
| GET | `/api/tasks/{id}` | Get task by ID |
| GET | `/api/tasks/status/{completed}` | Get tasks by completion status |
| GET | `/api/tasks/search?keyword=` | Search tasks by title/description |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/{id}` | Update existing task |
| PATCH | `/api/tasks/{id}/toggle` | Toggle task completion status |
| DELETE | `/api/tasks/{id}` | Delete task |

## Data Model

```mermaid
erDiagram
    TASKS {
        BIGINT id PK "Auto-increment"
        VARCHAR title "Max 255 chars, NOT NULL"
        TEXT description "Optional"
        BOOLEAN completed "Default FALSE"
        TIMESTAMP created_at "Auto-generated"
        TIMESTAMP updated_at "Auto-updated"
    }
```

## Current Implementation Status

### ✅ Completed
- Angular frontend with full CRUD UI
- Spring Boot backend with REST API
- MariaDB database schema
- Docker Compose configuration
- Task entity with JPA mappings
- Service layer with business logic
- Repository with custom queries
- HTTP communication between frontend/backend
- Material UI components and styling
- Search and filter functionality

### ⚠️ Pending
- User authentication & authorization
- Global exception handling
- Input validation & sanitization
- Error handling in frontend
- Unit & integration tests
- API documentation (Swagger)
- Database migrations (Flyway/Liquibase)
- Pagination for task lists
- Environment-specific configurations
- Logging & monitoring setup

### 🔒 Security Concerns
- No authentication mechanism
- Hardcoded database credentials
- CORS configured for localhost only
- No rate limiting
- No input sanitization
- Plain text password storage in config files

## Deployment Architecture (Future)

```mermaid
graph LR
    Users[Users]
    LB[Load Balancer]
    FE1[Frontend Instance 1 Nginx]
    FE2[Frontend Instance 2 Nginx]
    BE1[Backend Instance 1 Spring Boot]
    BE2[Backend Instance 2 Spring Boot]
    DB[(Primary DB MariaDB)]
    DBR[(Replica DB Read-Only)]
    Cache[Redis Cache]
    
    Users --> LB
    LB --> FE1
    LB --> FE2
    FE1 --> BE1
    FE2 --> BE2
    BE1 --> Cache
    BE2 --> Cache
    BE1 --> DB
    BE2 --> DB
    BE1 --> DBR
    BE2 --> DBR
    DB --> DBR
```

---

**Last Updated**: February 7, 2026  
**Version**: 1.0.0  
**Status**: Development
