import { MongoClient, ObjectId } from "mongodb"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const client = new MongoClient('mongodb://127.0.0.1:27017')
const db = client.db("AH_PARCIAL")
const AccountsCollection = db.collection('users')
const TokensCollection = db.collection('tokens')

async function createAccount(account) {
  await client.connect()

  const newAccount = {
    ...account
  }

  //Hashea el passoword
  newAccount.password = await bcrypt.hash(account.password, await bcrypt.genSalt(10))

  await AccountsCollection.insertOne(newAccount)
}

async function getAccount(){
  await client.connect()
  return AccountsCollection.find().toArray();
}

async function updateAccount(data, id){
  await client.connect()
  return await AccountsCollection.updateOne({_id: new ObjectId(id)}, {$set: {...data}})
}

async function deleteAccount(id){
  await client.connect()
  return await AccountsCollection.deleteOne({_id: new ObjectId(id)})
}

async function verifyAccount(account) {
  await client.connect()
  // Busca la cuenta a traves del email
  let accountData = await AccountsCollection.findOne({ email: account.email })

  if (!accountData) {
    throw { msg: "No se encuentra el email en la base de datos" }
  }

  if (!await bcrypt.compare(account.password, accountData.password)) {
    throw { msg: "El password es incorrecto" }
  }

  return { ...accountData, password: undefined }

}

async function createToken(payload) {
  //crea el token
  const token = jwt.sign(payload, "CLAVE SECRETA")
  //inserta el token en la base
  TokensCollection.insertOne({ token, email: payload.email })
  return token
}


async function createSession(account) {
  return {
    account: await verifyAccount(account),
    token: await createToken({ ...account, password: undefined })
  }
}

async function verifyToken(token) {
  await client.connect()
  // Verificar la validez del token utilizando jwt.verify
  const payload = jwt.verify(token, "CLAVE SECRETA")
  // Busca el token
  if (!await TokensCollection.findOne({ token })) {
    throw { msg: "El token no esta en la base de datos" }
  }
  // Devuelve payload del token si esta todo bien
  return payload
}

async function deleteSession(token) {
  await client.connect()

  return await TokensCollection.deleteOne({ token })
}

export default {
  createAccount,
  getAccount,
  updateAccount,
  deleteAccount,
  createSession,
  deleteSession,
  verifyToken

}