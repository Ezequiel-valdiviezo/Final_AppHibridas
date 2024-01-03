// NavBar.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserUpdate = () => {
  
    const [users, setUsers] = useState([])
    const [email, setEmail] = useState('')
    const [rol, setRol] = useState('')
    const [selectedUser, setSelectedUser] = useState(null);
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
    
        return ()=>{
          console.log("Se ejecuta cuando se desmonta el componente")
        }
    
      }, []) // ejecuta solamente cuando se monta el componente

      const handleEdit = (user) => {
        setSelectedUser(user);
        setEmail(user.email);
        setRol(user.rol);
      };
    
      const handleCancelEdit = () => {
        setSelectedUser(null);
        // Limpiar los campos del formulario cuando se cancela la edición
        setEmail('');
        setRol('');
      };


      const handleUpdate = (userId) => {
        fetch(`http://localhost:2023/api/users/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token'),
          },
          body: JSON.stringify({email, rol})
        })
           .then((response) => {
             if (response.ok) {
               // Actualiza el estado de los juegos después de la edicion
               setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
             } else {
               throw new Error('Error al editar el usuario');
             }
           })
           .catch((error) => {
             console.error('Error en la solicitud de editar:', error);
           });
      };

  return (
    <div className='editDelete'>
        <h2>Editar usuario</h2>


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
                <td><button className='custom-button' onClick={() => handleEdit(user)}>Editar</button></td>
              </tr>
            ))}
            </tbody>
        </table>


        {selectedUser && (
        <form onSubmit={() => handleUpdate(selectedUser._id)}>
        
            <div>
              <label>
                Nombre:
                <input type="text" required onChange={(e) => setEmail(e.target.value)} value={email} />
              </label>
            </div>
            <div>
              <label>
                Rol:
                <input type="text" required onChange={(e) => setRol(e.target.value)} value={rol} />
              </label>
            </div>

            <button className='custom-button' type="submit">Guardar Cambios</button>
            <button className='custom-button' type="button" onClick={handleCancelEdit}>
              Cancelar Edición
            </button>
        </form>
        )}
    
    </div>
  );
};

export default UserUpdate;
