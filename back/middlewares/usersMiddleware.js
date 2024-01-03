import { UsersSchema, UsersSchema2 } from "../schemas/usersSchemas.js";
import usersServices from '../services/usersServices.js'

export function validateAccount(req, res, next) {
  UsersSchema.validate(req.body, {
    stripUnknown: true,
    abortEarly: false
  })
    .then(async function (data) {
      req.body = data
      next()
    })
    .catch(function (err) {
      res.status(400).json(err)
    })

}
export function validateAccount2(req, res, next) {
  UsersSchema2.validate(req.body, {
    stripUnknown: true,
    abortEarly: false
  })
    .then(async function (data) {
      req.body = data
      next()
    })
    .catch(function (err) {
      res.status(400).json(err)
    })

}
// Verifica la validez de un token
export function verifySession(req, res, next) {
  const token = req.headers['auth-token']

  if (!token) {
    return res.status(401).json({ msg: "No se encuentra el token" })
  }

  usersServices.verifyToken(token)
    .then((payload) => {
      req.token = token
      req.session = payload
      next()
    })
    .catch(() => {
      return res.status(401).json({ msg: "El Token no es valido" })
    })

}