CREATE TABLE `proj_db`.`Teams` (
  `team_id` INT NOT NULL,
  `city` VARCHAR(25) NULL,
  `nickname` VARCHAR(15) NULL,
  PRIMARY KEY (`team_id`));

CREATE TABLE `proj_db`.`Players` (
  `name` VARCHAR(45) NULL,
  `status` VARCHAR(5) NULL,
  `position` VARCHAR(5) NULL,
  `nfl_id` INT NOT NULL,
  `global_id` VARCHAR(10) NOT NULL,
  `home_town` VARCHAR(45) NULL,
  `college` VARCHAR(45) NULL,
  `season` INT NOT NULL,
  `team_id` INT NULL,
  PRIMARY KEY (`nfl_id`, `season`),
  INDEX `team_id_idx` (`team_id` ASC) VISIBLE,
  CONSTRAINT `team_id`
    FOREIGN KEY (`team_id`)
    REFERENCES `proj_db`.`Teams` (`team_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `proj_db`.`Plays` (
  `away_team` VARCHAR(5) NULL,
  `yards` INT NULL,
  `home_team` VARCHAR(5) NULL,
  `passer_id` VARCHAR(10) NULL,
  `play_type` VARCHAR(15) NULL,
  `reciever_id` VARCHAR(10) NULL,
  `rusher_id` VARCHAR(10) NULL);