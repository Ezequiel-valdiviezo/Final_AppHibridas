import express from 'express'
import usersController from '../controllers/usersController.js'
import { validateAccount, validateAccount2, verifySession } from '../middlewares/usersMiddleware.js'

const route = express.Router()

/// registro

//Crea un usuario
route.post('/', [validateAccount], usersController.createAccount)

// Trae los usuarios
route.get('/', usersController.getAccount)
// Eliminar usuario
route.delete('/:idUser', usersController.deleteAccount)
// editar usuario
route.put('/:idUser', usersController.updateAccount)


// auth/login
route.post('/session', [validateAccount2], usersController.login)
// logout
route.delete('/session', [verifySession], usersController.logout)

export default route