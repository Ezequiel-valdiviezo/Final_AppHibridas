import express from 'express'
import { routerIndex } from './routes/indexRoutes.js'
import cors from 'cors'

const app = express() // Crea el servidor
app.use(cors()) // cualquiera pueda acceder al API
app.use(express.json()) // interpreta el body cuando viene un JSON

routerIndex(app)


app.listen(2023, function () {
    console.log("El servidor esta levantado! http://localhost:2023")
  })