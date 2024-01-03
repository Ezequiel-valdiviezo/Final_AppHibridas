// Header.jsx
import React, { useEffect ,useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            console.log(localStorage.getItem('token'))
          try {
            // Hacer la llamada fetch para eliminar el token de sesión en el servidor
            await fetch('http://localhost:2023/api/users/session', {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
              },
            });
    
            // Eliminar el token de sesión del almacenamiento local
            //localStorage.removeItem('token');
    
            // Redirigir al usuario a la página de inicio de sesión
            navigate('/', { replace: true });
          } catch (error) {
            console.error('Error durante el cierre de sesión:', error);
          }
        };
    
        // Llamar a la función de cierre de sesión al montar el componente
        logout();
      }, []);
    
      // El componente no renderiza nada, ya que redirige inmediatamente al usuario
      return null;
};

export default Logout;
