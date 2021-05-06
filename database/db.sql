CREATE DATABASE organizador_tareas_bd;

USE organizador_tareas_bd ;

-- -----------------------------------------------------
-- Table `organizador_tareas_bd`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `organizador_tareas_bd`.`users` (
  `idusers` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `name` VARCHAR(25) NOT NULL,
  `last_name` VARCHAR(25) NULL,
  `country` VARCHAR(25) NULL,
  `phone` VARCHAR(10) NULL,
  `password` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`idusers`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `organizador_tareas_bd`.`favorite_books`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `organizador_tareas_bd`.`favorite_books` (
  `idbooks` INT NOT NULL AUTO_INCREMENT,
  `name_book` VARCHAR(45) NOT NULL,
  `author` VARCHAR(45) NULL,
  `date_public` VARCHAR(40) NULL,
  `information` LONGTEXT NULL,
  `users_idusers` INT(11) NULL,
  PRIMARY KEY (`idbooks`),
  INDEX `fk_favorite_books_users_idx` (`users_idusers` ASC),
  CONSTRAINT `fk_favorite_books_users`
    FOREIGN KEY (`users_idusers`)
    REFERENCES `organizador_tareas_bd`.`users` (`idusers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
