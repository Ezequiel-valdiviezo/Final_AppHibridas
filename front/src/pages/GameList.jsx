import React, { useEffect, useState } from 'react';
import personaEnComputadora from '../assets/personaComputadora.png'
import { useNavigate } from 'react-router-dom';

const GameList = () => {

  const [games, setGames] = useState([])
  const [error, setError] = useState("")
  const navigate = useNavigate()
  
  useEffect(()=>{
    fetch('http://localhost:2023/api/juegos/lista',{
      method: 'GET',
      headers: {
        'auth-token': localStorage.getItem('token')
      }
    })
    .then((response) =>{
      if(response.ok){
        return response.json()
      }
      else if(response.status == 401){
        navigate('/login', {replace: true})
        return {}
      }
    })
    .then((data) =>{
      setGames(data)
    })  

    return ()=>{
      console.log("Se ejecuta cuando se desmonta el componente")
    }

  }, []) // ejecuta solamente cuando se monta el componente


  return (
    <div className='listaJuegos'>
      <h2>Lista de juegos</h2>
      <p>¡ Juegos en competencia dentro de la Goto Game Jam !</p>

      <div className='fondoJuegos'>
        {games.map(game => (
          <div key={game._id} className="cardJuego">
            <img src={personaEnComputadora} alt="" />
            <p>Nombre: {game.name}</p>
            <p>Género: {game.genre}</p>
            <p>Edición: {game.edition}</p>
            <p>Miembros: {game.members}</p>
            <p>Votos totales: {game.total_score}</p>
          </div>
      ))}
      </div>


    </div>
  );
};

export default GameList;
