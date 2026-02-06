# Task Manager Web Application - Copilot Instructions

This workspace contains a full-stack task manager web application with Angular frontend, Spring Boot backend, and MariaDB database.

## Architecture
- **Frontend**: Angular 17+ with TypeScript and Angular Material
- **Backend**: Spring Boot 3.x with Java 17+ (when fully implemented)
- **Database**: MariaDB
- **API**: RESTful services for task CRUD operations

## Current Implementation Status
✅ **Frontend Complete**: 
- Angular application with Material UI
- Task components for CRUD operations
- Service layer for HTTP communication
- Responsive design with search and filtering

⚠️ **Backend Partial**: 
- Basic Spring Boot structure created
- Entity, Repository, Service, and Controller files ready
- Requires Maven build and database setup

⚠️ **Database Setup**: 
- Docker compose configuration ready
- MariaDB initialization script prepared
- Requires Docker to be running

## Development Guidelines
- Follow Angular coding standards and best practices
- Use reactive forms for user inputs
- Implement proper error handling and loading states
- Follow Spring Boot conventions for REST API design (when backend is complete)
- Use JPA entities and repositories for data access
- Write clean, maintainable code with proper documentation

## Key Components
- Task model interface with id, title, description, completed status
- Angular components for task listing, creation, and editing
- TaskService for HTTP API communication
- Spring Boot structure ready for backend implementation

## Next Steps for Full Implementation
1. Complete Spring Boot backend with Maven dependencies
2. Set up MariaDB database using Docker
3. Test API endpoints and frontend integration
4. Add comprehensive error handling
5. Implement proper logging and monitoring

## Getting Started
1. Install frontend dependencies: `cd frontend && npm install --legacy-peer-deps`
2. Start development server: `npm start` (in frontend directory)
3. For full stack: Set up Docker, complete backend, and start database

## Testing
- Use Jest for Angular testing
- Implement unit tests for components and services
- Add integration tests for API endpoints when backend is complete