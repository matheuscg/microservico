SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE user;

USE user;

CREATE TABLE `user` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(100),
	PRIMARY KEY (`id`)
);

INSERT INTO `user` (`id`, `name`) VALUES
(1, 'Pedro');

CREATE TABLE `userfavorites` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`iduser` INT NOT NULL,
	`idmovie` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `userwatchlist` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`iduser` INT NOT NULL,
	`idmovie` INT NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `userfavorites` ADD CONSTRAINT `userfavorites_fk0` FOREIGN KEY (`iduser`) REFERENCES `user`(`id`);

ALTER TABLE `userwatchlist` ADD CONSTRAINT `userwatchlist_fk0` FOREIGN KEY (`iduser`) REFERENCES `user`(`id`);

COMMIT;