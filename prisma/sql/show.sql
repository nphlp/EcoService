-- Shows users privileges
SHOW GRANTS FOR 'eco-service-user'@'localhost';
-- or for server
SHOW GRANTS FOR 'eco-service-user'@'%';

-- Shows all tables for the database
SHOW TABLES FROM `eco-service-db`;

-- Shows all users
SELECT User FROM mysql.user;

-- Shows all databases
SHOW DATABASES;