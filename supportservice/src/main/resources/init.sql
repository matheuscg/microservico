CREATE DATABASE ms_support_tickets;

CREATE USER 'supportservice'@'%' IDENTIFIED WITH mysql_native_password BY 'fiapteste';

GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, INDEX, DROP, ALTER, CREATE TEMPORARY TABLES, LOCK TABLES ON ms_support_tickets.* TO 'supportservice'@'%';

