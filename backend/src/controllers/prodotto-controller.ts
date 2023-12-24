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