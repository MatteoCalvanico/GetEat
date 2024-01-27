import { Request, Response } from "express"
import { connection } from "../utils/db"
import { unlink } from 'fs/promises'; //La usiamo per togliere l'immagine dalla cartella
import path from "path";

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

  //Controllo se immagine presente
  if (!req.file) {
    return res.status(400).send("Il campo 'immagine' è richiesto.");
  }

  //Gestione del file immagine
  const immagine = req.file.filename; 

  connection.execute(
    `INSERT INTO Prodotto (IDprod, Nome, Prezzo, Sconto, Img, Kcal, Categoria)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [id, nome, prezzo, sconto, immagine, kcal, categoria],
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

export async function delProd(req: Request, res: Response) {
  const { id, imgName } = req.body;

    //Cancello l'immagine dalla cartella delle immagini
    const imagePath = path.join(__dirname, '../../public/img', imgName);
    try {
      await unlink(imagePath);
    } catch (error) {
      return res.status(500).send("Errore durante la cancellazione dell'immagine");
    }

  connection.execute(
    `DELETE FROM Prodotto WHERE IDprod = ?`,
    [id],
    function (err, results, fields) {
      if (err) {
        console.error(err);
        res.status(500).send("Errore nella cancellazione del prodotto");
      } else {
        res.json({ success: true, message: "Prodotto eliminato con successo" });
      }
    }
  )
}
