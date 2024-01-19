import { Router } from "express";
import multer from "multer";  //Usiamo 'multer' per gestire le immagini
import * as path from "path"
import * as prodController from "../controllers/prodotto-controller";

const router: Router = Router();
const upload = multer({ dest: /*'../../public/img'*/ path.join(__dirname, '../../public/img') });

router.get("/api/prodotto/:id", prodController.prodFromCat);
router.post("/api/addProdotto", upload.single('immagine'), prodController.addProd); //Middleware di caricamento file per gestire l'immagine nel form

export default router;