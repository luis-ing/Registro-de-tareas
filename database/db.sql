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
-- Table `organizador_tareas_bd`.`task_table`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `organizador_tareas_bd`.`task_table` (
  `idtask` INT NOT NULL AUTO_INCREMENT,
  `name_task` VARCHAR(45) NOT NULL,
  `date_public` DATETIME NULL,
  `date_final` DATETIME NULL,
  `status` INT NULL,
  `users_idusers` INT(11) NULL,
  PRIMARY KEY (`idtask`),
  INDEX `idusers` (`users_idusers` ASC),
    FOREIGN KEY (`users_idusers`)
    REFERENCES `organizador_tareas_bd`.`users` (`idusers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
