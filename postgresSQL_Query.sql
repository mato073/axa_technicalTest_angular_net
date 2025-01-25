CREATE DATABASE AxaTestDatabase

GO

USE AxaTestDatabase

GO

CREATE SCHEMA AxaTestSchema

GO

CREATE TABLE AxaTestSchema.users
(
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password_hash BYTEA NOT NULL,
    password_salt BYTEA NOT NULL,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

GO

CREATE TABLE AxaTestSchema.tasks
(
    task_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL DEFAULT 'Task Title',
    description VARCHAR(255) NOT NULL DEFAULT 'Task Description',
    due_date DATE NOT NULL DEFAULT '2021-01-01',
    is_complete BOOLEAN NOT NULL DEFAULT false,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES tutorialappschema.users(user_id)
);

GO