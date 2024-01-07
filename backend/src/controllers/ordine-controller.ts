import { Request, Response } from "express"
import { connection } from "../utils/db"

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