import { MongoClient, ObjectId } from 'mongodb'

const cliente = new MongoClient('mongodb://127.0.0.1:27017')
const db = cliente.db("AH_PARCIAL")
const votesCollection = db.collection("votes")

async function almacenarVoto(data){
    await cliente.connect()
    const voto = { "_id": new ObjectId() , ...data}
    return await votesCollection.insertOne(voto)
  }

async function juegoInformacion(juego_id){
    await cliente.connect()
    const infoJuego = await votesCollection.find({"juego_id": juego_id}).toArray()
    return infoJuego
}

async function juegosVotados(juez_id){
    await cliente.connect()
    const votosLista = await votesCollection.find({"juez_id": juez_id}).toArray()
    return votosLista
}

  export {
    almacenarVoto,
    juegoInformacion,
    juegosVotados,
  }
  
  export default{
    almacenarVoto,
    juegoInformacion,
    juegosVotados,
  }