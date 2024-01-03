import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Votes = () => {

  const [games, setGames] = useState([])

  const juez_id =  localStorage.getItem('id');
  //console.log(juez_id)
  // const juegoID = selectedUser.name
  const [error, setError] = useState(null);
  const [msjBien, setMsjBien] = useState(null);

  const [jugabilidad, setJugabilidad] = useState('')
  const [arte, setArte] = useState('')
  const [sonido, setSonido] = useState('')
  const [afinidad, setAfinidad] = useState('')
  

  const [selectedGame, setSelectedGame] = useState(null);
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


    const handleVote = (game) => {
      setSelectedGame(game);
      // setEmail(game.email);
      // setRol(game.rol);
    };

    const handleCancelVote = () => {
      setSelectedGame(null);
      // Limpiar los campos del formulario cuando se cancela la edición
      // setEmail('');
      // setRol('');
    };

    const handleFormSubmit = (e) =>{
      e.preventDefault()

      const requestData = {
        juez_id,
        juego_id: selectedGame._id,
        jugabilidad,
        arte,
        sonido,
        afinidad,
      };

      //console.log(JSON.stringify({juez_id, juego_id:selectedGame._id, jugabilidad, arte, sonido, afinidad}))
      console.log(JSON.stringify(requestData))
    fetch('http://localhost:2023/api/jueces/votar', {
      method: 'POST',
      headers:{
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify(requestData)
    })
    .then((res)=>res.json())
    .then((result)=>{
      console.log(result)
      navigate('/Votes', {replace: true})
      setMsjBien('Juego votado con exito');
      setError(null)
      })
      .catch(()=>{
        setMsjBien(null);
        setError('Tenga en cuenta que un juez no puede votar 2 veces el mismo juego, y los valores del voto deben ser del 1 al 10'); // Establecer el mensaje de error
        console.error('Ah ocurrido un error:', error);
      })
    }


  return (
    <div className='votoJuez'>
        <h2>¡Bienvenido señor/a Juez!</h2>
        <p>Seleccione un juego para votar</p>

      <div className='containerJuezVoto'>
        <tbody>
          <div className="juego">
            {games.map(game => (
              <tr key={game._id} >
                <td>{game.name}</td>
                <td><button class="custom-button" onClick={() => handleVote(game)}>Votar</button></td>
              </tr>
            ))}
          </div>
        </tbody>
      </div>


        {selectedGame && (
        <form onSubmit={handleFormSubmit}>
            <h3>Votar: {selectedGame.name}</h3>
            {error && <p className='loginError'>{error}</p>} {/* Mostrar mensaje de error si existe */}
            {msjBien && <p className=''>{msjBien}</p>} {/* Mostrar mensaje de error si existe */}
            <div>
              <label>
                Jugabilidad:
                <input type="text" required onChange={(e) => setJugabilidad(e.target.value)} value={jugabilidad} />
              </label>
            </div>
            <div>
              <label>
                Arte:
                <input type="text" required onChange={(e) => setArte(e.target.value)} value={arte} />
              </label>
            </div>
            <div>
              <label>
                Sonido:
                <input type="text" required onChange={(e) => setSonido(e.target.value)} value={sonido} />
              </label>
            </div>
            <div>
              <label>
                Afinidad:
                <input type="text" required onChange={(e) => setAfinidad(e.target.value)} value={afinidad} />
              </label>
            </div>

            <button className='custom-button' type="submit">Votar</button>
            <button className='custom-button' type="button" onClick={handleCancelVote}>
              Cancelar Edición
            </button>
        </form>
        )}
        
    </div>
  );
};

export default Votes;
