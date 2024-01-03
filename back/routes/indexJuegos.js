import express from 'express'
import juegosController from '../controllers/juegosController.js';
const routeJuegos = express()


routeJuegos.get('/lista', juegosController.juegosLista)
routeJuegos.get('/:juego_id', juegosController.juegoInformacion) // Nop
routeJuegos.get('/edicion/:edicion', juegosController.juegosPorEdicion) // Nop
routeJuegos.get('/:juego_id/promedio', juegosController.promedio) // Nop

routeJuegos.post('/', juegosController.crearJuego)
routeJuegos.delete('/:juego_id', juegosController.borrarJuego)
routeJuegos.put('/:juego_id', juegosController.modificarJuego)

export default routeJuegos