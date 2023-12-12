-- *********************************************
-- * Standard SQL generation                   
-- *--------------------------------------------
-- * DB-MAIN version: 11.0.2              
-- * Generator date: Sep 14 2021              
-- * Generation date: Tue Dec 12 13:48:17 2023 
-- * LUN file: C:\Users\matte\Desktop\Uni\II Anno\Ingegneria dei Sistemi Web\Progetto Sistemi Web\ERproject.lun 
-- * Schema: DB-GetEat/SQL 
-- ********************************************* 


-- Database Section
-- ________________ 

create database DBGetEat;


-- DBSpace Section
-- _______________


-- Tables Section
-- _____________ 

create table Categoria (
     ID varchar(50) not null,
     Nome varchar(50) not null,
     Info varchar(100) not null,
     constraint ID_Categoria_ID primary key (ID));

create table Prodotto (
     ID varchar(50) not null,
     Nome varchar(50) not null,
     Prezzo float(100) not null,
     Sconto numeric(100,10),
     Kcal numeric(5000) not null,
     Inv_ID varchar(50) not null,
     constraint ID_Prodotto_ID primary key (ID));

create table Ordine (
     ID varchar(50) not null,
     Acq_ID varchar(50) not null,
     constraint ID_Ordine_ID primary key (ID));

create table Menu (
     M_O_ID varchar(50) not null,
     ID varchar(50) not null,
     constraint ID_Menu_ID primary key (ID, M_O_ID));

create table Utente (
     ID varchar(50) not null,
     Permesso varchar(50) not null,
     Username varchar(50) not null,
     Password varchar(50) not null,
     constraint ID_Utente_ID primary key (ID));


-- Constraints Section
-- ___________________ 

alter table Prodotto add constraint FKInventario_FK
     foreign key (Inv_ID)
     references Categoria;

alter table Ordine add constraint ID_Ordine_CHK
     check(exists(select * from Menu
                  where Menu.M_O_ID = ID)); 

alter table Ordine add constraint FKAcquisto_FK
     foreign key (Acq_ID)
     references Utente;

alter table Menu add constraint FKMen_Pro
     foreign key (ID)
     references Prodotto;

alter table Menu add constraint FKMen_Ord_FK
     foreign key (M_O_ID)
     references Ordine;


-- Index Section
-- _____________ 

create unique index ID_Categoria_IND
     on Categoria (ID);

create unique index ID_Prodotto_IND
     on Prodotto (ID);

create index FKInventario_IND
     on Prodotto (Inv_ID);

create unique index ID_Ordine_IND
     on Ordine (ID);

create index FKAcquisto_IND
     on Ordine (Acq_ID);

create unique index ID_Menu_IND
     on Menu (ID, M_O_ID);

create index FKMen_Ord_IND
     on Menu (M_O_ID);

create unique index ID_Utente_IND
     on Utente (ID);

