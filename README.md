# Task Manager Web Application

A full-stack task management application built with Angular frontend, Spring Boot backend, and MariaDB database.

## Architecture

- **Frontend**: Angular 17+ with TypeScript and Angular Material UI
- **Backend**: Spring Boot 3.x with Java 17+
- **Database**: MariaDB 11.0
- **API**: RESTful services for task CRUD operations

## Features

- ✅ Create new tasks with title and description
- ✅ Mark tasks as completed/uncompleted
- ✅ Delete tasks
- ✅ Search tasks by title or description
- ✅ Filter tasks (All, Pending, Completed)
- ✅ Responsive design with Angular Material
- ✅ Real-time updates and error handling

## Quick Start

### 1. Start Database
```bash
docker-compose up -d mariadb
```

### 2. Install Frontend Dependencies
```bash
cd frontend
npm install
```

### 3. Run the Applications

**Backend (Terminal 1):**
```bash
cd backend
./mvnw spring-boot:run
```

**Frontend (Terminal 2):**
```bash
cd frontend
npm start
```

### 4. Access the Application

- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:8080/api/tasks
- **Database**: localhost:3306

## Prerequisites

- Node.js 18+ and npm
- Java 17+
- Maven 3.6+
- Docker and Docker Compose
- VS Code (recommended)

## Development Setup

Use VS Code tasks:
- Run `Tasks: Run Task` -> "Full Stack Setup"
- Run `Tasks: Run Task` -> "Start Database"

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/{id}` | Update task |
| PATCH | `/api/tasks/{id}/toggle` | Toggle completion |
| DELETE | `/api/tasks/{id}` | Delete task |

## Troubleshooting

1. **Database Connection Error**
   ```bash
   docker-compose up -d mariadb
   ```

2. **Port Already in Use**
   ```bash
   npx kill-port 4200 8080 3306
   ```

## License

MIT License