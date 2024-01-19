import { Router } from "express";
import multer from "multer";  //Usiamo 'multer' per gestire le immagini
import * as path from "path"
import * as prodController from "../controllers/prodotto-controller";

//Multer part START
const imgLocation = path.join(__dirname, '../../public/img');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, imgLocation) 
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname + path.extname(file.originalname))
    }
});
const upload = multer({ storage: storage });
//Multer part END


const router: Router = Router();

router.get("/api/prodotto/:id", prodController.prodFromCat);
router.post("/api/addProdotto", upload.single('immagine'), prodController.addProd); //Middleware di caricamento file per gestire l'immagine nel form

export default router;