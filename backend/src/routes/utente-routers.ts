import { Router } from "express"
import * as utenteController from "../controllers/utente-controller"

const router: Router = Router()     //creo una istanza della classe Router

router.post("/api/login", utenteController.login)
router.post("/api/registration", utenteController.registration)

export default router

//il codice definisce due route per l'autenticazione e la registrazione degli utenti
//utilizzando il router di Express e i metodi del controller dell'utente.