import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JudgeDelete = () => {

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


  const handleDelete = (gameId) => {
    // Envia una solicitud a la API para eliminar el juego
    fetch(`http://localhost:2023/api/juegos/${gameId}`, {
      method: 'DELETE',
      headers: {
        // 'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    })
      .then((response) => {
        if (response.ok) {
          // Actualiza el estado de los juegos después de la eliminación
          setGames((prevGames) => prevGames.filter((game) => game._id !== gameId));
        } else {
          throw new Error('Error al eliminar el juego');
        }
      })
      .catch((error) => {
        console.error('Error en la solicitud de eliminación:', error);
      });
  };


  return (
    <div className='eliminarJuego'>
        <h2>Borrar Juego</h2>

        <table class="game-list">
            <thead>
            <tr>
                <th>Nombre</th>
                <th>Género</th>
                <th>Edición</th>
                <th>Miembros</th>
                <th>Votos totales</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            {games.map(game => (
              <tr key={game._id} className="cardJuego">
                <td>{game.name}</td>
                <td>{game.genre}</td>
                <td>{game.edition}</td>
                <td>{game.members}</td>
                <td>{game.total_score}</td>
                <td><button class="delete-button" onClick={() => handleDelete(game._id)}>Eliminar</button></td>
              </tr>
            ))}
            </tbody>
        </table>
    </div>
  );
};

export default JudgeDelete;
