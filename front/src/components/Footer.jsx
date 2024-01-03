// Header.jsx
import React from 'react';
import discord from '../assets/discord.png'
import instagram from '../assets/instagram.png'

const Footer = () => {

  return (
    <footer>
    <div className="footer">
        <div className="column">
            <h3>GOTO GAME JAM</h3>
            <p>Tenemos como objetivo incentivar el desarrollo y la producción de videojuegos en la comunidad hispanohablante, a través de un acto virtual donde podamos premiar la creatividad y motivar a la gente para que puedan iniciarse en este mundo del desarrollo de videojuegos.</p>
        </div>
        <div className="column">
            <h3>Visitanos en Nuestras Redes Sociales</h3>
            <a href="https://www.instagram.com/gotogamejam/">
                <   img src={instagram} alt="Logo instagram" />
            </a>
            <a href="https://discord.com/invite/VUynHPyAcM">
                <img className="imgDiscord" src={discord} alt="Logo discord" />
            </a>
        </div>

    </div>
        <p className='copyright'>© Copyright GOTO GAME JAM. All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
