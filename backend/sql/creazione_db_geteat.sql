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

INSERT INTO 'dbgeteat', 'categoria' ('IDcat', 'Nome', 'Info', 'Img') VALUES ('0001', 'Panini', 'Scegli il panino che più ti piace', 'catPanini.jpg');
INSERT INTO 'dbgeteat', 'categoria' ('IDcat', 'Nome', 'Info', 'Img') VALUES ('0002', 'Dolci', 'Scegli il dolce che più ti piace', 'catDolci.jpg');
INSERT INTO 'dbgeteat', 'categoria' ('IDcat', 'Nome', 'Info', 'Img') VALUES ('0003', 'Bevande', 'Scegli la bevanda che più ti piace', 'catBevande.jpg');

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
-- Dumping data for table Categoria
--

INSERT INTO 'dbgeteat', 'prodotto' ('IDprod', 'Nome', 'Prezzo', 'Sconto', 'Img', 'Kcal', 'Categoria') VALUES ();

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

create table Ordine (
     IDordine varchar(50) not null,
     Ordinatario varchar(50) not null,  -- Foreign key --> Utente
     constraint ID_Ordine_ID primary key (IDordine));

--
-- Dumping data for table Categoria
--

INSERT INTO 'dbgeteat', 'Ordine' ('IDordine', 'Ordinatario') VALUES ();

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

create table Menu (
     NumOrdine varchar(50) not null,  -- Foreign key --> Ordine
     Prodotto varchar(50) not null,  -- Foreign key --> Prodotto
     constraint ID_Menu_ID primary key (Prodotto, NumOrdine));

--
-- Dumping data for table Categoria
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
-- Dumping data for table Categoria
--

INSERT INTO 'dbgeteat', 'Utente' ('ID', 'Permesso', 'Username', 'Psw') VALUES ();

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