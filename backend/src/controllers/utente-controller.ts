import { Request, Response } from "express"
import { connection } from "../utils/db"

//Definisco le funzioni login e registration
export async function login(req:Request, res: Response) {
    
    const {username, password} = req.body;

    connection.query(
        `SELECT *
        FROM Utente
        WHERE Username = ?`,
       [username],
       function(err, results, fields) {

        if (err) {
            res.send('Si è verificato un errore:' + err);
            return;
          }

          if (Array.isArray(results)) {
            if (results.length > 0) {
                let user = results[0] as any;

                // controllare il campo admin di user e creare una variabile boolean
                // user / admin : false / true

                if (auth(user.Psw, password)) {     
                    res.json({
                        "logged": true, 
                        "admin": user.Permesso == "admin" ? true : false
                    });
                } else {
                    res.send("Password errata");
                }
            } else {
                res.send('Utente non trovato');
            }

          } 
       }
    )
}


function auth(storedPass: string, userPass: string): boolean {  //utilizzo questa funzione per per confrontare le password

    if (storedPass === userPass) {
        return true;
    }
    return false;
}

export async function registration(req:Request, res:Response) {
    const {username, password} = req.body;

    connection.query(
        `INSERT INTO Utente (Permesso, Username, Psw)
        VALUES (?, ?, ?)
        `,
       ["user", username, password],
       function(err, results, fields) {

        if (err) {
            res.send('Si è verificato un errore:' + err);
            return;
          }

          res.send("Utente registrato"); 
       }
    )
}


