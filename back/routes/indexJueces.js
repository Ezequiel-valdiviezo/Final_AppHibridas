import express from 'express'
import juecesController from '../controllers/juecesController.js';
import { validarVoto, existeJuez, existeJuego, votoUnico } from '../middlewares/votesMiddleware.js'
const routeJueces = express()
  
routeJueces.post('/votar', [validarVoto], [existeJuez], [existeJuego], [votoUnico], juecesController.votoJuez)
routeJueces.get('/:juez_id', juecesController.juegosVotados) // Nop


export default routeJueces