---
name: codeReview
description: Conduct a comprehensive code review of a project
argument-hint: The project or code to review
---
Conduct a thorough code review of the provided project, analyzing:

## Frontend Analysis
- **Component Structure**: Evaluate component organization, separation of concerns, and Angular best practices
- **Service Layer**: Review HTTP communication, error handling, and observable usage
- **State Management**: Assess data flow and reactive programming patterns
- **Type Safety**: Check TypeScript usage, interface definitions, and type annotations
- **UI/UX**: Evaluate user interface design and user experience considerations

## Backend Analysis  
- **Architecture**: Review layered architecture (Controller → Service → Repository)
- **Entity Design**: Assess JPA entity mappings, validation, and relationships
- **API Design**: Evaluate REST endpoint design, HTTP status codes, and error responses
- **Security**: Check for authentication, authorization, and input validation
- **Database**: Review schema design, migrations, and data access patterns

## Configuration & Infrastructure
- **Build Configuration**: Assess build tools, dependency management, and deployment setup
- **Environment Configuration**: Review environment-specific settings and secrets management
- **Docker/Containerization**: Evaluate container setup and orchestration
- **Version Control**: Check .gitignore, commit practices, and branching strategy

## Code Quality & Maintainability
- **Error Handling**: Assess exception handling and user feedback mechanisms
- **Testing**: Evaluate test coverage and testing strategies
- **Documentation**: Review code documentation and API documentation
- **Performance**: Identify potential performance bottlenecks and optimization opportunities

## Security Concerns
- **Input Validation**: Check for proper input sanitization and validation
- **Authentication/Authorization**: Assess security implementation
- **Data Protection**: Review sensitive data handling
- **Dependencies**: Check for known vulnerabilities in dependencies

## Scalability & Production Readiness
- **Database Performance**: Evaluate query efficiency and indexing
- **Caching Strategy**: Assess caching implementation
- **Logging/Monitoring**: Review logging and monitoring setup
- **Configuration Management**: Check environment-specific configurations

## Recommendations Priority
Organize findings by priority level (HIGH/MEDIUM/LOW) with specific, actionable recommendations for each issue identified.

Provide concrete code examples for critical fixes and clear explanations of why changes are needed.
