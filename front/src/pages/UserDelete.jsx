// NavBar.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserDelete = () => {
  
    const [users, setUsers] = useState([])
    const [error, setError] = useState("")
    const navigate = useNavigate()

    useEffect(()=>{
    fetch('http://localhost:2023/api/users/',{
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
        setUsers(data)
    })
    }, [])

    const handleDelete = (userId) => {
        // Envia una solicitud a la API para eliminar el juego
        fetch(`http://localhost:2023/api/users/${userId}`, {
          method: 'DELETE',
          headers: {
            // 'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token'),
          },
        })
          .then((response) => {
            if (response.ok) {
              // Actualiza el estado de los juegos después de la eliminación
              setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
            } else {
              throw new Error('Error al eliminar el juego');
            }
          })
          .catch((error) => {
            console.error('Error en la solicitud de eliminación:', error);
          });
      };

  return (
    <div className='editDelete'>
        <h2>Eliminar Usuario</h2>

        <table class="game-list">
            <thead>
            <tr>
                <th>Email</th>
                <th>Rol</th>
            </tr>
            </thead>
            <tbody>
            {users.map(user => (
              <tr key={user._id} className="cardJuego">
                <td>{user.email}</td>
                <td>{user.rol}</td>
                <td><button className='delete-button' onClick={() => handleDelete(user._id)} >Eliminar</button></td>
              </tr>
            ))}
            </tbody>
        </table>
    </div>

    
  );
};

export default UserDelete;
