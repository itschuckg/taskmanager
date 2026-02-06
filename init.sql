CREATE DATABASE IF NOT EXISTS taskmanager;
USE taskmanager;

CREATE TABLE IF NOT EXISTS tasks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO tasks (title, description, completed) VALUES
('Learn Angular', 'Complete Angular tutorial and build first app', FALSE),
('Setup Spring Boot', 'Configure Spring Boot with MariaDB', TRUE),
('Create API endpoints', 'Build REST API for task management', FALSE);