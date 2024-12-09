-- Creates an user and a password
CREATE USER 'eco-service-user'@'localhost' IDENTIFIED BY 'eco-service-password';

-- Allows user to connect to database
GRANT ALL PRIVILEGES ON *.* TO 'eco-service-user'@'localhost';
