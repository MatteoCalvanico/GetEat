import { Request, Response } from "express"
import { connection } from "../utils/db"
import { v4 as uuidv4 } from 'uuid'; //Usiamo questa libreria per creare un ID sicuro

export async function allOrder(req:Request, res:Response) {
    connection.execute(
        `SELECT Ordine.IDordine, Utente.Username AS NomeOrdinante, Prodotto.Nome AS NomeProdotto
        FROM Ordine JOIN Utente ON Ordine.Ordinatario = Utente.ID 
        JOIN Menu ON Ordine.IDordine = Menu.NumOrdine 
        JOIN Prodotto ON Menu.Prodotto = Prodotto.IDprod;`,
        [],
        function(err, results, fields) {
            res.json(results)
        }
    )
}

export async function orderPrice(req:Request, res:Response) {
    connection.execute(
        `SELECT Ordine.IDordine, SUM(Prodotto.Prezzo) AS CostoTotale
        FROM Ordine JOIN Utente ON Ordine.Ordinatario = Utente.ID
        JOIN Menu ON Ordine.IDordine = Menu.NumOrdine 
        JOIN Prodotto ON Menu.Prodotto = Prodotto.IDprod
        GROUP BY Ordine.IDordine, Utente.Username;`,
        [],
        function(err, result, fields) {
            res.json(result)
        }
    )
}

//Per l'implementazione del checkout facciamo un ciclo che aggiunge INSERT per quanti prodotti abbiamo nel carrello
export async function checkout(req: Request, res: Response) {
    try {
        const { ordinatario, cart } = req.body;
        const IDordine = uuidv4();

        if (!ordinatario || !cart) {
            return res.status(400).json({ error: "Il corpo della richiesta è incompleto." });
        }

        var allSQL = "INSERT INTO Ordine (IDordine, Ordinatario) VALUES (?, ?); ";
        for (var prod of cart) {
            allSQL += "INSERT INTO Menu (NumOrdine, Prodotto) VALUES (?, ?); ";
        }

        var values = [IDordine, ordinatario];
        for (var prod of cart) {
            values.push(IDordine, prod.IDprod);
        }

        connection.query(
            allSQL, values,
            function (err, result, fields) {
                if (err) {
                    res.status(500).json({ error: 'Query non andata a buon fine, errore:' + err });
                } else {
                    res.status(200).json({ message: "Ordine registrato con successo!" });
                }
            }
        );

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Errore durante l'elaborazione dell'ordine." });
    }
}
