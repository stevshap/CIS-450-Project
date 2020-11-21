  CREATE TABLE `proj_db`.`Teams` (
  `teamId` INT NOT NULL,
  `season` INT NOT NULL,
  `city` VARCHAR(25) NOT NULL,
  `name` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`teamId`));

  CREATE TABLE `proj_db`.`Players` (
  `name` INT NOT NULL,
  `status` VARCHAR(5) NULL,
  `position` VARCHAR(5) NOT NULL,
  `nflId` INT NOT NULL,
  `playerId` VARCHAR(15) NOT NULL,
  `homeTown` VARCHAR(45) NOT NULL,
  `college` VARCHAR(45) NOT NULL,
  `season` INT NOT NULL,
  `teamId` INT NOT NULL,
  PRIMARY KEY (`nflId`)),
  FOREIGN KEY (`teamId`)
  REFERENCES `proj_db`.`Teams` (`teamId`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

  CREATE TABLE `proj_db`.`Plays` (
  `awayTeam` VARCHAR(4) NOT NULL,
  `homeTeam` VARCHAR(4) NOT NULL,
  `passerId` VARCHAR(15) NULL,
  `playType` VARCHAR(15) NOT NULL,
  `receiverId` VARCHAR(15) NULL,
  `rusherId` VARCHAR(15) NULL);