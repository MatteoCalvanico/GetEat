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

/*Idea per checkout: 
- per l'ID di ordine usare la libreria uuid (import { v4 as uuidv4 } from 'uuid'; e entity.id = uuidv4();)
- salvare le query in variabili e usare come esempio questo link: https://stackoverflow.com/questions/23266854/node-mysql-multiple-statements-in-one-query (esempio corretto sotto)
- per le query dei vari prodotti fare un ciclo
*/

export async function checkout(req: Request, res: Response) {
    try {
        const { ordinatario, cart } = req.body;
        const IDordine = uuidv4();

        if (!ordinatario || !cart) {
            return res.status(400).json({ error: "Il corpo della richiesta è incompleto." });
        }

        var allSQL = "INSERT INTO Ordine (IDordine, Ordinatario) VALUES (?, ?); "

        for(var prod of cart){
            allSQL = allSQL + "INSERT INTO Menu (NumOrdine, Prodotto) VALUES (" + IDordine + ", " + prod.IDprod + "); "
        }

        connection.query(
            allSQL,[IDordine, ordinatario],
            function(err, result, fields){
                if(err){
                    res.send('Query non andata a buon fine, errore:' + err);
                }else{
                    res.status(200).json({ message: "Ordine registrato con successo!" });
                }
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Errore durante l'elaborazione dell'ordine." });
    }
}
