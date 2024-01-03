// Header.jsx
import React, { useState } from 'react';
import NavBar from './Navbar';
import logo from '../assets/logo.png';

const Header = () => {
  console.log("renderizar el Header");

  const userRole = localStorage.getItem('rol');
  console.log(localStorage.getItem('rol'));

  const userLinks = [
    { url: '/Home', texto: 'INICIO' },
    { url: '/GameList', texto: 'LISTA DE JUEGOS' },
    { url: '/Logout', texto: 'CERRAR SESIÓN' },
  ];

  const judgeLinks = [
    { url: '/Votes', texto: 'VOTAR' },
    ...userLinks,
  ];

  const adminLinks = [
    { url: '/JudgeCreate', texto: 'CREAR JUEGO' },
    { url: '/JudgeUpdate', texto: 'MODIFICAR JUEGO' },
    { url: '/JudgeDelete', texto: 'ELIMINAR JUEGO' },
    { url: '/UserCreate', texto: 'CREAR USUARIO' },
    { url: '/UserUpdate', texto: 'EDITAR USUARIO' },
    { url: '/UserDelete', texto: 'ELIMINAR USUARIO' },
    ...userLinks,
  ];

  // Determinar los enlaces según el rol
  let links = [];

  if (userRole === 'admin') {
    links = adminLinks;
  } else if (userRole === 'juez') {
    links = judgeLinks;
  } else {
    links = userLinks;
  }

  return (
    <header>
      <div className='headerOne'>
        <h1 className="hola">GOTO Game JAM</h1>
        <img className="logo" src={logo} alt="GOTO Game JAM" />
      </div>
      <NavBar links={links} userRole={userRole} />
    </header>
  );
};

export default Header;
