import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JudgeUpdate = () => {

  const [games, setGames] = useState([])
  const [selectedGame, setSelectedGame] = useState(null);
  const [name, setName] = useState('')
  const [genre, setGenre] = useState('')
  const [members, setMembers] = useState('')
  const [edition, setEdition] = useState('')
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


  const handleEdit = (game) => {
    setSelectedGame(game);
    setName(game.name);
    setGenre(game.genre);
    setMembers(game.members);
    setEdition(game.edition);
  };

  const handleCancelEdit = () => {
    setSelectedGame(null);
    // Limpiar los campos del formulario cuando se cancela la edición
    setName('');
    setGenre('');
    setMembers('');
    setEdition('');
  };

  const handleUpdate = (gameId) => {
    fetch(`http://localhost:2023/api/juegos/${gameId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({name, genre, members, edition})
    })
       .then((response) => {
         if (response.ok) {
           // Actualiza el estado de los juegos después de la edicion
           setGames((prevGames) => prevGames.filter((game) => game._id !== gameId));
         } else {
           throw new Error('Error al editar el juego');
         }
       })
       .catch((error) => {
         console.error('Error en la solicitud de editar:', error);
       });
  };


  return (
    <div className='actualizarJuego'>
      <h2>Actualizar juego</h2>
      {/* Display list of games here */}
      <p>¡ Juegos en competencia dentro de la Goto Game Jam !</p>

      <div className="contenedorForm">
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
                <td><button className='custom-button' onClick={() => handleEdit(game)}>Editar</button></td>
              </tr>
            ))}
            </tbody>
        </table>

      {selectedGame && (
        <form onSubmit={() => handleUpdate(selectedGame._id)}>
        
            <div>
              <label>
                Nombre:
                <input type="text" required onChange={(e) => setName(e.target.value)} value={name} />
              </label>
            </div>
            <div>
              <label>
                Género:
                <input type="text" required onChange={(e) => setGenre(e.target.value)} value={genre} />
              </label>
            </div>
            <div>
              <label>
                Miembros:
                <input type="text" required onChange={(e) => setMembers(e.target.value)} value={members} />
              </label>
            </div>
            <div>
              <label>
                Edición:
                <input type="text" required onChange={(e) => setEdition(e.target.value)} value={edition} />
              </label>
            </div>

            <button className='custom-button' type="submit">Guardar Cambios</button>
            <button className='custom-button' type="button" onClick={handleCancelEdit}>
              Cancelar Edición
            </button>
        </form>
        )}
      </div>

    </div>
  );
};

export default JudgeUpdate;

// Nombre, genero, miembros, edicion, votos totales