import { Router } from "express"
import * as catOrdine from "../controllers/ordine-controller"

const router: Router = Router()

router.get("/api/ordini", catOrdine.allOrder)
router.get("/api/costoOrdini", catOrdine.orderPrice)
router.post("/api/checkout", catOrdine.checkout)

export default router