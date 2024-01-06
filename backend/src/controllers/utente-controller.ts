import { Request, Response } from "express"
import { connection } from "../utils/db"
import * as bcrypt from 'bcrypt'

const saltRounds = 10
const password = "Admin@123"

//Definisco le funzioni login e registration
export async function login(req:Request, res: Response) {
    
    const {username, password} = req.body;

    connection.query(
        `SELECT *
        FROM Utente
        WHERE Username = ?`,
       [username],
      async function(err, results, fields) {

        if (err) {
            res.send('Si è verificato un errore:' + err);
            return;
          }

          if (Array.isArray(results)) {
            if (results.length > 0) {
                let user = results[0] as any;

                // controllare il campo admin di user e creare una variabile boolean
                // user / admin : false / true
                
                const isAuthenticated = await auth(user.Psw, password);
                        if (isAuthenticated) {
                            res.json({
                                "logged": true, 
                                "admin": user.Permesso == "admin" ? true : false
                            });
                        } else {
                            res.send("Password errata");   
                        }
                    }
            } else {
                res.send('Utente non trovato');
            }
          } 
          )
       }



async function auth(storedPass: string, userPass: string) { //utilizzo questa funzione per per confrontare le password

    return await bcrypt.compare(userPass, storedPass);

    // return new Promise((resolve, reject) => {
    //     bcrypt.compare(userPass, storedPass)
    //         .then(res => resolve(res))
    //         .catch(err => reject(err));
    // });
}

export async function registration(req:Request, res:Response) {
    const {username, password} = req.body;

    bcrypt
      .genSalt(saltRounds)
      .then(salt => {
        return bcrypt.hash(password, salt)
      })
      .then(hash => {
        connection.query(
            `INSERT INTO Utente (Permesso, Username, Psw)
            VALUES (?, ?, ?)
            `,
           ["user", username, hash],
           function(err, results, fields) {

            if (err) {
                res.send('Si è verificato un errore:' + err);
                return;
              }

              res.send("Utente registrato"); 
           }
        )
      })
      .catch(err => console.error(err.message))
}