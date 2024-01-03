import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JudgeCreate = () => {

  const [name, setName] = useState('')
  const [genre, setGenre] = useState('')
  const [members, setMembers] = useState('')
  const [edition, setEdition] = useState('')
  const [total_score, setTotal_score] = useState(0)
  const [msjBien, setMsjBien] = useState(null);
  const navigate = useNavigate()

  const handleFormSubmit = (e) =>{
    e.preventDefault()

    fetch('http://localhost:2023/api/juegos', {
      method: 'POST',
      headers:{
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({name, genre, members, edition, total_score})
    })
    .then((res)=>res.json())
    .then((result)=>{
      console.log(result)
      navigate('/JudgeCreate', {replace: true})
      setMsjBien('Juego creado con exito'); // Establecer el mensaje de exito
      //console.error('Error durante el inicio de sesión:', error);
    })
  }

  return (
    <div className='crearJuego'>
      <h2>Crear Juego</h2>
      {/* Display list of games here */}
      <p>¡ Juegos en competencia dentro de la Goto Game Jam !</p>
      <div className='exito'>
      {msjBien && <p className='msjBien'>{msjBien}</p>} {/* Mostrar mensaje de exito si existe */}
      </div>
      <div className="contenedorForm">
        <form onSubmit={handleFormSubmit}>
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

          <button className='custom-button' type="submit">Enviar</button>
        </form>
        </div>

    </div>
  );
};

export default JudgeCreate;