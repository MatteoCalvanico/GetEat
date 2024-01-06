DROP DATABASE IF EXISTS DBGetEat;
CREATE DATABASE DBGetEat;
USE DBGetEat;

CREATE TABLE Categoria (
  IDcat varchar(50) NOT NULL,
  Nome varchar(50) NOT NULL,
  Info varchar(100) NOT NULL,
  Img varchar(100) NOT NULL,
  PRIMARY KEY (IDcat)
)
ENGINE = InnoDB;

CREATE TABLE Prodotto (
  IDprod varchar(50) NOT NULL,
  Nome varchar(50) NOT NULL,
  Prezzo DECIMAL(10,2) NOT NULL,
  Sconto DECIMAL(10,2) DEFAULT 0.00,
  Img varchar(100) NOT NULL,
  Kcal INTEGER NOT NULL,
  Categoria varchar(50) NOT NULL,
  PRIMARY KEY (IDprod),
  UNIQUE INDEX ID_Prodotto_IND (IDprod ASC),
  INDEX FKInventario_IND (Categoria ASC),
  CONSTRAINT FKInventario_IND1
    FOREIGN KEY (Categoria) REFERENCES Categoria(IDcat) ON DELETE NO ACTION ON UPDATE NO ACTION
)
ENGINE = InnoDB;

CREATE TABLE Utente (
  ID INTEGER NOT NULL AUTO_INCREMENT,
  Permesso ENUM("admin", "user") default "user",
  Username VARCHAR(50) NOT NULL,
  Psw VARCHAR(255) NOT NULL,
  PRIMARY KEY (ID),
  UNIQUE INDEX ID_Utente_IND (ID)
)
ENGINE = InnoDB;

CREATE TABLE Ordine (
  IDordine INTEGER NOT NULL AUTO_INCREMENT,
  Ordinatario INTEGER NOT NULL,
  PRIMARY KEY (IDordine),
  UNIQUE INDEX ID_Ordine_IND (IDordine ASC),
  INDEX FKAcquisto_IND (Ordinatario ASC),
  CONSTRAINT FKAcquisto_IND1
    FOREIGN KEY (Ordinatario) REFERENCES Utente(ID) ON DELETE NO ACTION ON UPDATE NO ACTION
)
ENGINE = InnoDB;

CREATE TABLE Menu (
  NumOrdine INTEGER NOT NULL,
  Prodotto varchar(50) NOT NULL,
  PRIMARY KEY (Prodotto, NumOrdine),
  UNIQUE INDEX ID_Menu_IND (Prodotto, NumOrdine ASC),
  INDEX FKMen_Ord_IND (NumOrdine ASC),
  CONSTRAINT FK_numordine
    FOREIGN KEY (NumOrdine) REFERENCES Ordine(IDordine) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT FK_prodotto
    FOREIGN KEY (Prodotto) REFERENCES Prodotto(IDprod) ON DELETE NO ACTION ON UPDATE NO ACTION
)
ENGINE = InnoDB;
