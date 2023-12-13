import express, { Express } from "express"

import history from "connect-history-api-fallback"

const app: Express = express()
const port: number = 3000

app.use(history())
app.use(express.static("public"))
app.use(express.static("dist_frontend"))

app.use(express.static('public'));