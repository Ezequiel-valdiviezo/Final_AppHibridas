
import yup from 'yup'

const juezId_required = 'El ID del juez es obligario.'

const juegoId_required = 'El ID del juego es obligario.'

const jugabilidad_required = 'Jugabilidad es un campo obligatorio.'
const jugabilidad_min = 'El puntaje minimo en jugabilidad debe ser mayor a 1.'
const jugabilidad_max = 'El puntaje de jugabilidad no puede ser mayor de 10.'

const arte_required =  'Arte es un campo obligatorio.'
const arte_min = 'El puntaje minimo en arte debe ser mayor a 1.'
const arte_max = 'El puntaje de arte no puede ser mayor de 10.'

const sonido_required = 'Sonido es un campo obligatorio.'
const sonido_min = 'El puntaje minimo en sonido debe ser mayor a 1.'
const sonido_max = 'El puntaje de sonido no puede ser mayor de 10.'

const afinidad_required = 'Afinidad es un campo obligatorio.'
const afinidad_min = 'El puntaje minimo en afinidad debe ser mayor a 1.'
const afinidad_max = 'El puntaje de afinidad no puede ser mayor de 10.'

const votoSchema = yup.object({

  juez_id: yup.string().required(juezId_required) ,
  juego_id: yup.string().required(juegoId_required) ,
  jugabilidad: yup.number().integer().min(1, jugabilidad_min).max(10, jugabilidad_max).required(jugabilidad_required) ,
  arte: yup.number().integer().min(1, arte_min).max(10, arte_max).required(arte_required) ,
  sonido: yup.number().integer().min(1, sonido_min).max(10, sonido_max).required(sonido_required) ,
  afinidad: yup.number().integer().min(1, afinidad_min).max(10, afinidad_max).required(afinidad_required) ,

})

export default {
    votoSchema
}