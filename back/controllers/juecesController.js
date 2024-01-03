import juecesServices from "../services/juecesServices.js"
import juegosController from "./juegosController.js";
import juegosServices from "../services/juegosServices.js";

  async function votoJuez(req, res) {
    const data = {
      "juez_id": req.body.juez_id,
      "juego_id": req.body.juego_id,
      "jugabilidad": req.body.jugabilidad,
      "arte": req.body.arte,
      "sonido": req.body.sonido,
      "afinidad": req.body.afinidad
      // "nombre_juez": req.body.nombre_juez,
      // "nombre_juego": req.body.nombre_juego,
    }

    const juego = await juegosServices.juegoExiste(req.body.juego_id) //
    const juez  = await juecesServices.existeJuez(req.body.juez_id) //
    const voto = {...data, nombre_juez: juez.email, nombre_juego: juego.name}//

    juecesServices.votoJuez({...voto}) //
    .then(function (votoJuez) {
      const total_score = data.jugabilidad + data.arte + data.sonido + data.afinidad;
             
      juegosController.actualizarPuntaje(data.juego_id, total_score)
      return res.status(200).json(votoJuez)
    })
    .catch( error => {
      res.status(500).send('error del sevidor')
    })
  }

function juegosVotados(req, res) {
    juecesServices.juegosVotados(req.params.juez_id)
    .then(function(votosLista){
    const votosResultado = votosLista.map((v) => ({
        "nombre_juego": v.nombre_juego,
        "jugabilidad": v.jugabilidad,
        "arte": v.arte,
        "sonido": v.sonido,
        "afinidad": v.afinidad,
    }))
        res.status(200).json(votosResultado)
    })
    .catch( error => {
      res.status(500).send('error del sevidor')
    })
}

async function existeJuez(juez_id){
  const juez = await juecesServices.existeJuez(juez_id)
  return juez
}

async function votoJuezValidacion(juez_id){
  return await juecesServices.juegosVotados(juez_id)
}

  export {
    votoJuez,
    juegosVotados,
    existeJuez,
    votoJuezValidacion,
  }

  export default {
    votoJuez,
    juegosVotados,
    existeJuez,
    votoJuezValidacion,
  }