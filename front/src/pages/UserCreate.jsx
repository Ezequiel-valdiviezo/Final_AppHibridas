import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserCreate = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rol, setRol] = useState('')
  const [msjBien, setMsjBien] = useState(null);
  const navigate = useNavigate()

  const handleFormSubmit = (e) =>{
    e.preventDefault()

    fetch('http://localhost:2023/api/users/', {
      method: 'POST',
      headers:{
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({email, password, rol})
    })
    .then((res)=>res.json())
    .then((result)=>{
      console.log(result)
      navigate('/UserCreate', {replace: true})
      setMsjBien('Usuario creado con exito');
    })
  }

  return (
    <div className='crearJuego'>
      <h2>Crear Usuario</h2>

      <p>¡ Juegos en competencia dentro de la Goto Game Jam !</p>
      <div className='exito'>
        {msjBien && <p className='msjBien'>{msjBien}</p>} {/* Mostrar mensaje de exito si existe */}
      </div>
      <div className="contenedorForm">
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>
              Email:
              <input type="text" required onChange={(e) => setEmail(e.target.value)} value={email} />
            </label>
          </div>
          <div>
            <label>
              Password:
              <input type="text" required onChange={(e) => setPassword(e.target.value)} value={password} />
            </label>
          </div>
          <div>
            <label>
              Rol:
              <input type="text" required onChange={(e) => setRol(e.target.value)} value={rol} />
            </label>
          </div>

          <button className='custom-button' type="submit">Enviar</button>
        </form>
        </div>

    </div>
  );
};

export default UserCreate;
