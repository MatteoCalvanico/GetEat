
-- Categoria
INSERT INTO Categoria (IDcat, Nome, Info, Img) VALUES
('cat1', 'Panini', 'Scegli il panino che più ti piace', 'catPanini.jpg'),
('cat2', 'Dolci', 'Scegli il dolce che più ti piace', 'catDolci.jpg'),
('cat3', 'Bevande', 'Scegli la bevanda che più ti piace', 'catBevande.jpg');

-- Utente
INSERT INTO Utente (Permesso, Username, Psw) VALUES
('admin', 'admin', 'password'),
('user', 'utente1', 'password'),
('user', 'utente2', 'password');

-- Prodotto
INSERT INTO Prodotto (IDprod, Nome, Prezzo, Sconto, Img, Kcal, Categoria) VALUES
('prod1', 'Panino al formaggio', 10.00, 0.00, 'prodPanino1.jpg', 1125, 'cat1'),
('prod2', 'Panino alla porchetta', 15.00, 5.00, 'prodPanino2.jpg', 1500, 'cat1'),
('prod3', 'Hot Dog', 9.50, 2.00, 'prodPanino3.jpg', 1300, 'cat1'),
('prod4', 'Torta al cioccolato [Fetta]', 2.45, 0.00, 'prodDolce1.jpg', 550, 'cat2'),
('prod5', 'Tiramisù', 5.99, 0.00, 'prodDolce2.jpg', 250, 'cat2'),
('prod6', 'Coca-Cola', 1.50, 0.00, 'prodBibita1.jpg', 140, 'cat3'),
('prod7', 'Sprite', 1.50, 0.00, 'prodBibita2.jpg', 30, 'cat3');
