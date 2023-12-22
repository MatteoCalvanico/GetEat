-- Database Section
-- ________________ 

drop database if exists DBGetEat;

create database if not exists DBGetEat;

use DBGetEat;
-- Tables Section
-- _____________ 

create table Categoria (
     IDcat varchar(50) not null,
     Nome varchar(50) not null,
     Info varchar(100) not null,
     Img varchar(100) not null,
     constraint ID_Categoria_ID primary key (IDcat));

--
-- Dumping data for table Categoria
--

INSERT INTO 'dbgeteat', 'categoria' ('IDcat', 'Nome', 'Info', 'Img') VALUES ('1', 'Panini', 'Scegli il panino che più ti piace', 'catPanini.jpg');
INSERT INTO 'dbgeteat', 'categoria' ('IDcat', 'Nome', 'Info', 'Img') VALUES ('2', 'Dolci', 'Scegli il dolce che più ti piace', 'catDolci.jpg');
INSERT INTO 'dbgeteat', 'categoria' ('IDcat', 'Nome', 'Info', 'Img') VALUES ('3', 'Bevande', 'Scegli la bevanda che più ti piace', 'catBevande.jpg');

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

create table Prodotto (
     IDprod varchar(50) not null,
     Nome varchar(50) not null,
     Prezzo float not null,
     Sconto numeric(65,10),
     Img varchar(100) not null,
     Kcal numeric(65) not null,
     Categoria varchar(50) not null,  -- Foreign key --> Categoria
     constraint ID_Prodotto_ID primary key (IDprod));

--
-- Dumping data for table Prodotto
--

INSERT INTO 'dbgeteat', 'prodotto' ('IDprod', 'Nome', 'Prezzo', 'Sconto', 'Img', 'Kcal', 'Categoria') VALUES ('prod1', 'Panino al formaggio', '10.00', '0.00', 'prodPanino1.jpg', '1125', '1');
INSERT INTO 'dbgeteat', 'prodotto' ('IDprod', 'Nome', 'Prezzo', 'Sconto', 'Img', 'Kcal', 'Categoria') VALUES ('prod2', 'Panino alla porchetta', '15.00', '5.00', 'prodPanino2.jpg', '1500'. '1');
INSERT INTO 'dbgeteat', 'prodotto' ('IDprod', 'Nome', 'Prezzo', 'Sconto', 'Img', 'Kcal', 'Categoria') VALUES ('prod3', 'Panino alla mortadella', '9.50', '2.00', 'prodPanino3.jpg', '1300'. '1');
INSERT INTO 'dbgeteat', 'prodotto' ('IDprod', 'Nome', 'Prezzo', 'Sconto', 'Img', 'Kcal', 'Categoria') VALUES ('prod4', 'Torta al cioccolato [Fetta]', '2.45', '0.00', 'prodDolce1.jpg', '550', '2');
INSERT INTO 'dbgeteat', 'prodotto' ('IDprod', 'Nome', 'Prezzo', 'Sconto', 'Img', 'Kcal', 'Categoria') VALUES ('prod5', 'Tiramisù', '5.99', '0.00', 'prodDolce2.jpg', '', '2');
INSERT INTO 'dbgeteat', 'prodotto' ('IDprod', 'Nome', 'Prezzo', 'Sconto', 'Img', 'Kcal', 'Categoria') VALUES ('prod6', 'Coca-Cola', '1.50', '0.00', 'prodBibita1.jpg', '140', '3');
INSERT INTO 'dbgeteat', 'prodotto' ('IDprod', 'Nome', 'Prezzo', 'Sconto', 'Img', 'Kcal', 'Categoria') VALUES ('prod7', 'Sprite', '1.50', '0.00', 'prodBibita2.jpg', '30', '3');

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

create table Ordine (
     IDordine varchar(50) not null,
     Ordinatario varchar(50) not null,  -- Foreign key --> Utente
     constraint ID_Ordine_ID primary key (IDordine));

--
-- Dumping data for table Ordine
--

INSERT INTO 'dbgeteat', 'Ordine' ('IDordine', 'Ordinatario') VALUES ();

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

create table Menu (
     NumOrdine varchar(50) not null,  -- Foreign key --> Ordine
     Prodotto varchar(50) not null,  -- Foreign key --> Prodotto
     constraint ID_Menu_ID primary key (Prodotto, NumOrdine));

--
-- Dumping data for table Menu
--

INSERT INTO 'dbgeteat', 'Menu' ('NumOrdine', 'Prodotto') VALUES ();

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

create table Utente (
     ID varchar(50) not null,
     Permesso varchar(50) not null,
     Username varchar(50) not null,
     Psw varchar(50) not null,
     constraint ID_Utente_ID primary key (ID));

--
-- Dumping data for table Utente
--

INSERT INTO 'dbgeteat', 'Utente' ('ID', 'Permesso', 'Username', 'Psw') VALUES ('1', 'admin', 'admin', 'password');
INSERT INTO 'dbgeteat', 'Utente' ('ID', 'Permesso', 'Username', 'Psw') VALUES ('2', 'user', 'utente1', 'password');
INSERT INTO 'dbgeteat', 'Utente' ('ID', 'Permesso', 'Username', 'Psw') VALUES ('3', 'user', 'utente2', 'password');

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-- Constraints Section
-- ___________________ 

alter table Prodotto add constraint FKInventario_FK
     foreign key (Prodotto.Categoria) 
     references Categoria;

alter table Ordine add constraint ID_Ordine_CHK
     check(exists(select * from Menu
                  where Menu.NumOrdine = Ordine.IDordine)); 

alter table Ordine add constraint FKAcquisto_FK
     foreign key (Ordinatario)
     references Utente;

alter table Menu add constraint FKMen_Pro
     foreign key (Menu.Prodotto)
     references Prodotto;

alter table Menu add constraint FKMen_Ord_FK
     foreign key (NumOrdine)
     references Ordine;


-- Index Section
-- _____________ 

create unique index ID_Categoria_IND
     on Categoria (IDcat);

create unique index ID_Prodotto_IND
     on Prodotto (IDprod);

create index FKInventario_IND
     on Prodotto (Categoria);

create unique index ID_Ordine_IND
     on Ordine (IDordine);

create index FKAcquisto_IND
     on Ordine (Ordinatario);

create unique index ID_Menu_IND
     on Menu (Prodotto, NumOrdine);

create index FKMen_Ord_IND
     on Menu (NumOrdine);

create unique index ID_Utente_IND
     on Utente (ID);