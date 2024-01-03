import { MongoClient, ObjectId } from 'mongodb'
import votosServices from "./votesService.js"

const cliente = new MongoClient('mongodb://127.0.0.1:27017')
const db = cliente.db("AH_PARCIAL")
const juecesCollection = db.collection("judges")
const UsersCollection = db.collection("users")


async function votoJuez(data){
    return votosServices.almacenarVoto(data)
  }

  async function existeJuez(id){
    await cliente.connect()
    return await UsersCollection.findOne({ _id: new ObjectId(id) })
  }

async function juegosVotados(juez_id){
    return votosServices.juegosVotados(juez_id)
}

  export {
    votoJuez,
    existeJuez,
    juegosVotados,
  }

  export default{
    votoJuez,
    existeJuez,
    juegosVotados,
  }