import { Router } from "express"
import * as catController from "../controllers/categorie-controller"

const router: Router = Router()

router.get("/api/categorie", catController.allCategories)

export default router