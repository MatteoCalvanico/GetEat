import { Request, Response } from "express"
import jwt from "jsonwebtoken"

export interface Utente {
    ID: string
    Permesso: "admin" | "user"
    Username: string
    Psw: string
}
const JWT_SECRET = "foo"
const COOKIE_NAME = "access-token"

//Codifica l'utente in un access token e lo imposta come cookie.
export const setAccessToken = (req: Request, res: Response, user: any) => {
  // Crea l'access token con JWT
  const accessToken = jwt.sign(user, JWT_SECRET, { expiresIn: "1 day" })
  // Imposta l'access token come cookie
  res.cookie(COOKIE_NAME, accessToken, {
    maxAge: 86400000, // 1 giorno in millisecondi
    httpOnly: true,
    sameSite: true,
    // secure: true
  })
}

//Cancella il cookie contente l'access token.
export const deleteAccessToken = (req: Request, res: Response) => { res.clearCookie(COOKIE_NAME) } // Cancella il cookie dell'access token

//Decodifica l'access token, ottenendo l'utente.
export const decodeAccessToken = (req: Request, res: Response) => {
  const accessToken = req.cookies[COOKIE_NAME]
  if (!accessToken) return null
  try {
    const user = jwt.verify(accessToken, JWT_SECRET) as Utente
    return user
  } catch {
    return null
  }
}
