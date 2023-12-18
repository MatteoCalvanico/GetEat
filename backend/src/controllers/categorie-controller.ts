import { Request, Response } from "express"
import { connection } from "../utils/db"

export async function allCategories(req:Request, res: Response) {
    connection.execute(
        `SELECT *
        FROM categoria`,
       [],
       function(err, results, fields) {
         res.json(results)
       }
    )
}