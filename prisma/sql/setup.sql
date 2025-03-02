-- Creates an user and a password
CREATE USER 'eco-service-user'@'localhost' IDENTIFIED BY 'eco-service-password';

-- Allows user to connect to database
GRANT ALL PRIVILEGES ON *.* TO 'eco-service-user'@'localhost';

-- Create the database
CREATE DATABASE IF NOT EXISTS `eco-service-db`;

-- Grant privileges to the user on the database
GRANT ALL PRIVILEGES ON `eco-service-db`.* TO 'eco-service-user'@'localhost';
