import { Request, Response } from "express"
import { connection } from "../utils/db"

export async function prodFromCat(req:Request, res: Response) {
    connection.execute(
        `SELECT *
        FROM prodotto
        WHERE Categoria=?`,
       [req.params.id],
       function(err, results, fields) {
         res.json(results)
       }
    )
}

export async function addProd(req: Request, res: Response) {
  console.log(req.body)

  const { id, nome, prezzo, sconto, kcal, categoria } = req.body;
  const categoryId = categoria.IDcat; //Ci serve solo l'ID della categoria

  //Controllo se immagine presente
  if (!req.file) {
    return res.status(400).send("Il campo 'immagine' è richiesto.");
  }

  //Gestione del file immagine
  const immagine = req.file.filename; 

  connection.execute(
    `INSERT INTO Prodotto (IDprod, Nome, Prezzo, Sconto, Img, Kcal, Categoria)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [id, nome, prezzo, sconto, immagine, kcal, categoryId],
    function (err, results, fields) {
      if (err) {
        console.error(err);
        res.status(500).send("Errore nell'aggiunta del prodotto");
      } else {
        res.json({ success: true, message: "Prodotto aggiunto con successo" });
      }
    }
  );
}