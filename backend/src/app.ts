import express, { Express } from "express"
import history from "connect-history-api-fallback"
import bodyParser from "body-parser"

import catRouter from "./routes/categorie-routers"
import prodRouter from "./routes/prodotto-routers"
import utenteRouter from "./routes/utente-routers"
import OrdineRouter from "./routes/ordine-routers"

const app: Express = express()
const port: number = 3000

app.use(history())
app.use(express.static("public"))
app.use(express.static("dist_frontend"))

app.use(bodyParser.json());
app.use(catRouter);
app.use(prodRouter);
app.use(utenteRouter);
app.use(OrdineRouter);


app.use(function(req, res, next) {
    res.setHeader("Content-Type", "text/plain")
    res.status(404).send("Ops... Pagina non trovata")
})

app.listen(port, function() {
    console.log(`Listening on http://localhost:${port}`)
})