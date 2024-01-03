import juecesController from "../controllers/juecesController.js"
import juegosController from "../controllers/juegosController.js"
import votoSchemas  from "../schemas/votoSchemas.js";

async function validarVoto (req, res, next) {
    votoSchemas.votoSchema.validate(req.body, {
      stripUnknown: true,
      abortEarly: false
    })
      .then(async function (juego) {
  
        req.body = juego
        next()
      })
      .catch(function (error) {
        res.status(400).json(error.errors)
        //res.status(400).send('Error' + error)
      })
  
  }

async function existeJuez(req, res, next){
    // const juez = await juecesController.existeJuez(req.body.juez_id)
    // console.log(juez)
    try {
        const juez = await juecesController.existeJuez(req.body.juez_id)
    
        if (juez){
          next()
        }else{
          res.status(400).send('El juez no existe, por lo tanto no se puede votar')

        } 
    
      } catch (error) {
        res.status(500).send('Error en el servidor buscando el juez')
      }
}

async function existeJuego(req, res, next){
    // const juego = await juegosController.juegoExiste(req.body.juego_id)
    // console.log(juego)
    try {
        const juego = await juegosController.juegoExiste(req.body.juego_id)
    
        if (juego){
          next()
        }else{
          res.status(400).send('El juego no existe, por lo que no se puede calificar')
        } 
    
      } catch (error) {
        res.status(500).send('Error en el servidor buscando el juego')
      }
      
}

async function votoUnico(req, res, next){
    try {
        const juegosVotados = await juecesController.votoJuezValidacion(req.body.juez_id)
        const existeJuego = juegosVotados.some( j => j.juego_id === req.body.juego_id )
    
        if (!existeJuego){
          next()
        }else{
          res.status(400).send('El juez ya califico este juego')
        }
    
      } catch (error) {
        res.status(500).send('Error en el servidor')
      }
}

export {
    validarVoto,
    existeJuez,
    existeJuego,
    votoUnico,
}

export default {
    validarVoto,
    existeJuez,
    existeJuego,
    votoUnico,
}