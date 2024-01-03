// NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ links, userRole }) => {
  console.log("renderizar el NavBar");
  const className = 'nav-principal';

  const filterLinks = (link) => {
    if (link.url === '/Logout') {
      return true;
    }
    if (userRole === 'admin' && link.url === '/JudgeCreate') {
      return true;
    } else if (userRole === 'admin' && link.url === '/JudgeUpdate') {
      return true;
    } else if (userRole === 'admin' && link.url === '/JudgeDelete') {
      return true;
    } else if (userRole === 'admin' && link.url === '/UserCreate') {
      return true;
    } else if (userRole === 'admin' && link.url === '/UserUpdate') {
      return true;
    } else if (userRole === 'admin' && link.url === '/UserDelete') {
      return true;
    } else if (userRole === 'juez' && link.url === '/Votes') {
      return true;
    } else if (userRole === 'user' && link.url === '/Home') {
      return true;
    } else if (userRole === 'juez' && link.url === '/Home') {
      return true;
    } else if (userRole === 'user' && link.url === '/GameList') {
      return true;
    }

    return false;
  };

  const filteredLinks = links.filter(filterLinks);

  return (
    <nav className='nav'>
      <ul className={className}>
        {filteredLinks.map((elemento, index) => (
          <li key={index} className="nav-principal__item">
            <Link to={elemento.url}>{elemento.texto}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
