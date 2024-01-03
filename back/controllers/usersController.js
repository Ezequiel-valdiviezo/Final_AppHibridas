import usersServices from '../services/usersServices.js'

function createAccount(req, res) {
  usersServices.createAccount(req.body)
    .then(() => {
      res.status(201).json({ msg: "Cuenta creada con existo!" })
    })
    .catch(() => {
      res.status(500).json({ msg: "Fallo al crear la cuenta" })
    })
}

function getAccount(req, res){
  usersServices.getAccount(req.body)
  .then((users) => {
    res.status(200).json(users)
  })
  .catch(() => {
    res.status(500).json({ msg: "fallo al eliminar la cuenta"})
  })
}

function updateAccount(req, res){
  usersServices.updateAccount(req.body, req.params.idUser)
  .then(respuesta => {
    res.status(200).json(respuesta)
  })
  .catch( error => {
      res.status(500).json(error)
  })
}

function deleteAccount(req, res){
  usersServices.deleteAccount(req.params.idUser)
  .then((userBorrado) => {
    if (userBorrado) {
      res.status(200).json(userBorrado)
    }else{
      res.status(404).send('Ah ocurrido un error en el servidor')
    }
  })
  .catch((error) => {
    res.status(500).send('Ah ocurrido un error: ' + error)
  })
}


function login(req, res) {
  usersServices.createSession(req.body)
    .then((session) => {
      res.status(200).json(session)
    })
    .catch(() => {
      res.status(500).json({ msg: "Fallo el inicio de session" })
    })
}

function logout(req, res) {

  usersServices.deleteSession(req.token)
    .then(() => {
      res.status(200).json({})
    })
    .catch((err) => {
      res.status(500).json({ msg: "fallo al cerrar la session", err })
    })
}

export default {
  createAccount,
  getAccount,
  updateAccount,
  deleteAccount,
  login,
  logout
}