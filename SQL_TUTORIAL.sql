--//The string "Dotnet Expert" is 13 characters long, and would not fit in this datatype


CREATE DATABASE DotNetCourseDatabase

GO

USE DotNetCourseDatabase 

GO

CREATE SCHEMA AxaTechnicalTestSchema

GO

CREATE TABLE AxaTechnicalTestSchema.Auht (
    Email NVARCHAR(50) NOT NULL
    ,
    PasswordHash VARBINARY(MAX) NOT NULL
    ,
    PasswordSalt VARBINARY(MAX) NOT NULL
)


GO

CREATE TABLE AxaTechnicalTestSchema.Users
(
    UserId INT IDENTITY(1,1) PRIMARY KEY
    ,
    Name NVARCHAR(255) NOT NULL
    ,
    Email NVARCHAR(50) NOT NULL
    ,
    CreationDate DATETIME DEFAULT GETDATE()
);

GO

CREATE TABLE AxaTechnicalTestSchema.UserTasks
(
    TaskId INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX) NOT NULL,
    DueDate DATETIME NOT NULL,
    IsCompleted BIT NOT NULL DEFAULT 0,
    UserId INT NOT NULL,
    FOREIGN KEY (UserId) REFERENCES AxaTechnicalTestSchema.Users(UserId)
);



