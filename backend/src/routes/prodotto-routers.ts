import { Router } from "express"
import * as prodController from "../controllers/prodotto-controller"

const router: Router = Router()

router.get("/api/prodotto/:id", prodController.prodFromCat)

export default router