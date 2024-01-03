import React from 'react';
import niñoJugando from '../assets/niñoJugando.png'
import niñaProgrmando from '../assets/niñaProgramando.png'
import pacman from '../assets/pacman.jpg'
import trofeo from '../assets/trofeo.png'
import brianLara from '../assets/brianLara.png'
import utn from '../assets/utn.png'
import argentun from '../assets/argentun.png'
import innovd from '../assets/innovod.png'
import logoGoto from '../assets/logopng.png'
// import fondo2 from '../assets/fondo2.png'


const Home = () => {
  return (
    <div className='home'>
      {/* <h2>BIENVENIDO A GOTO GAME JAM!</h2> */}
      {/* <img src={gotoGameJam} alt="GOTO Game JAM" />
       */}
      <div className="presentacion">
        <h2>GOTO GAME JAM</h2>
        <img src={logoGoto} alt="Logo Goto Game Jam" />
      </div>
      
      <div className="degradado">
        <div className='container'>
          <div className='column'>
            <h3>¿QUÉ ES GOTO GAME JAM?</h3>
            <p>Es una competencia que se realizada varias veces al año, donde los grupos tienen que hacer un juego durante un tiempo estimado.</p>
            <p>Luego continua el evento lleno de talleres y charlas que se realizaran en un transcurso luego de la competencia, culminando con un cierre donde se nombran a los ganadores.</p>
          </div>
          <div className='column'>
            <img src={niñoJugando} alt="GOTO Game JAM" />
          </div>
        </div>
        
        <div className='container'>
          <div className='column'>
            <img src={niñaProgrmando} alt="GOTO Game JAM" />
          </div>
          <div className='column'>
            <h3>¿QUÉ ES UNA GAME JAM?</h3>
            <p>Una Game JAM es un evento virtual, en el que un equipo, crea un videojuego desde cero en un corto periodo de tiempo utilizando los recursos que conozcan. La única consigna es que tiene que estar terminado en el tiempo pactado y con la temática establecida, que se revelará al comienzo de la JAM.</p>
          </div>
        </div>
      </div>

      <div className='negro divPacman'>
        <div className=''>
          <h3>NUESTRO OBJETIVO</h3>
          <p>Sabemos que este año fue complicado, y queremos darle color al último mes del ciclo lectivo 2022 con una Game JAM en el cual podamos divertirnos haciendo lo que mas nos gusta que son los Video Juegos.</p>
        </div>
        <div className='divPacman'>
          <img src={pacman} alt="GOTO Game JAM" />
        </div>
      </div>

      <div className="degradado2">
        <div className='container'>
          <div className='column1'>
            <h3>¿QUIENES PUEDEN PARTICIPAR?</h3>
            <p>Están TODOS invitados, sin excluir a nadie. No importa si no eres programador o no tienes con quien participar, tendremos un discord en el que podras formar equipo con otras personas, y siempre se necesitan diferentes habilidades: ya sean programar, dibujar, escribir, o mas cosas.</p>
          </div>
        </div>

        <div className="containerPad">
          <h3>COMUNIDAD</h3>
          <p>Te invitamos a que te unas a nuestra comunidad de Discord donde podrás comunicarte, consultar dudas, buscar grupos y hasta demostrar el avance del juegosi quisieran. Vamos a estar brindándoles un formulario para la inscripción, donde podrán anotarse en grupo o solos si ustedes desean.</p>
        </div>
      </div>

    <div className="containerPremios">
      <h3>PREMIOS</h3>
      <div className="premios">
        <div className="cardPremio">
          <img src={trofeo} alt="GOTO Game JAM" />
          <h4>Carrera Programacion - UTN FRGP</h4>
          <span>100% Becada</span>
        </div>
        <div className="cardPremio">
          <img src={trofeo} alt="GOTO Game JAM" />
          <h4>Carrera Programacion - UTN FRGP</h4>
          <span>50% Becada</span>
        </div>
      </div>
    </div>

    <div className="apoyan">
      <h3>Apoyan</h3>
      <div className="container">
        <div className="column apoyoCard">
          <img src={brianLara} alt="Logo brian lara" />
        </div>
        <div className="column apoyoCard">
          <img src={utn} alt="Logo utn" />
        </div>
        <div className="column apoyoCard">
          <img src={argentun} alt="Logo argentum" />
        </div>
        <div className="column apoyoCard">
          <img src={innovd} alt="Logo innovd" />
        </div>
      </div>
    </div>


    </div>
  );
};

export default Home;
