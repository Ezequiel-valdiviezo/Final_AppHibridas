import juegosServices from "../services/juegosServices.js"

function juegosLista(req, res){
  juegosServices.juegosLista()
  .then(function (juegos) {
    res.status(200).json(juegos)
  })
  .catch( error => {
      res.status(500).json(error)
  })
}

function juegoInformacion(req, res){
  juegosServices.juegoInformacion(req.params.juego_id)
  .then(function(infoJuego){
    const informacionJuego = infoJuego.map((i) => ({
        "nombre_juez": i.nombre_juez,
        "jugabilidad": i.jugabilidad,
        "arte": i.arte,
        "sonido": i.sonido,
        "afinidad": i.afinidad,
    }))
        res.status(200).json(informacionJuego)
    })
    .catch( error => {
      res.status(500).send('error del sevidor')
    })
}

function juegosPorEdicion(req, res) {
  // Llama a la función `juegosPorGeneroEdicion`con los parámetros en la URL (req.params.edicion) y en los
  // parámetros de consulta (req.query.genre).
  juegosServices.juegosPorGeneroEdicion(req.params.edicion, {"genre": req.query.genre})
    .then(function (juego) {
      console.log(juego)
      // Ordena los juegos por puntaje en orden descendente.
      const juegosPorPuntaje = juego.sort((a, b) => b.total_score - a.total_score)
      
      res.status(200).json(juegosPorPuntaje);
    })
    .catch(function (error) {
      res.status(500).send('error del sevidor')
    });
}

async function promedio(req, res) {
  juegosServices.juegoInformacion(req.params.juego_id)
  .then(function (respuesta){
    const promedios = {
      "nombre_juego": "",
      "jugabilidad": 0,
      "arte": 0,
      "sonido": 0, 
      "afinidad": 0,
      "promedioTotal": 0
    }

    const cantidadElementos = respuesta.length
    
    respuesta.forEach(p => {
      promedios.nombre_juego = p.nombre_juego
      promedios.jugabilidad += p.jugabilidad
      promedios.arte += p.arte
      promedios.sonido += p.sonido
      promedios.afinidad += p.afinidad
      promedios.promedioTotal = ((promedios.jugabilidad + promedios.arte + promedios.sonido + promedios.afinidad ) / 4)
    })

    const response = {
      "nombre_juego": promedios.nombre_juego,
      "jugabilidad": promedios.jugabilidad / cantidadElementos,
      "arte": promedios.arte / cantidadElementos,
      "sonido": promedios.sonido / cantidadElementos,
      "afinidad": promedios.afinidad / cantidadElementos,
      "promedioTotal":  promedios.promedioTotal / cantidadElementos
    }

    res.status(200).json(response)
  })
  .catch( error => {
    res.status(500).json(error)
  })
}

function crearJuego(req, res){
    const data = {
        "name": req.body.name,
        "genre": req.body.genre,
        "members": req.body.members,
        "edition": req.body.edition,
        "total_score": 0,
    }

    juegosServices.crearJuego(data)
    .then(function (juegoCreado) {
        res.status(200).json(juegoCreado)
    })
    .catch( error => {
        res.status(500).json(error)
    })
}

function borrarJuego(req, res) {
    juegosServices.borrarJuego(req.params.juego_id)
    .then((juegoBorrado) => {
        if (juegoBorrado) {
          res.status(200).json(juegoBorrado)
        }else{
          res.status(404).send('Ah ocurrido un error en el servidor')
        }
      })
      .catch((error) => {
        res.status(500).send('Ah ocurrido un error: ' + error)
      })
  }


  function modificarJuego(req, res){
    juegosServices.modificarJuego(req.body, req.params.juego_id)
    .then(respuesta => {
        res.status(200).json(respuesta)
    })
    .catch( error => {
        res.status(500).json(error)
    })
  }

  async function juegoExiste (id) {
    const juego = await juegosServices.juegoExiste(id)
    return  juego
  }

  async function actualizarPuntaje(id, total_score) {
    const juego = await juegosServices.juegoPorId(id)
    const newData = {
      "total_score": juego.total_score + total_score
    }
    juegosServices.actualizarPuntosJuego(id, newData)  
  }

export {
    juegosLista,
    juegoInformacion,
    juegosPorEdicion,
    promedio,
    crearJuego,
    borrarJuego,
    modificarJuego,
    juegoExiste,
    actualizarPuntaje
}

export default {
    juegosLista,
    juegoInformacion,
    juegosPorEdicion,
    promedio,
    crearJuego,
    borrarJuego,
    modificarJuego,
    juegoExiste,
    actualizarPuntaje
}