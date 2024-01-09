import { Router } from "express"
import * as catOrdine from "../controllers/ordine-controller"

const router: Router = Router()

router.get("/api/ordini", catOrdine.allOrder)
router.post("/api/checkout", catOrdine.checkout)

export default router