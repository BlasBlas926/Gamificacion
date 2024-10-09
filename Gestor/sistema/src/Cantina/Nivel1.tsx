import React, { ChangeEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IJuego } from '../Juegos/IJuego';
import Navbar from '../Shared/Navbar';
import ContextApp from '../Models/Contexto';

export const Nivel1Cantina = () => {
  const contextApp = useContext(ContextApp);
  const navigate = useNavigate();

  const [juego, setJuego] = useState<IJuego>({
    nombre: 'Nivel 1: Cantina',
    dificultad: 'Fácil',
    puntosAcomulados: 0,
    retroalimentacion: '',
    intentos: 10,
    porcentaje: 100,
    palabra: ['', ''],
    usuarioId: contextApp.id,
  });

  const insertarJuego = async (juego: IJuego) => {
    try {
      const request = await fetch('https://localhost:7034/Juegos', {
        method: 'post',
        body: JSON.stringify(juego),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      });

      if (request.ok) {
        console.log('Juego insertado con éxito.');
      } else {
        alert('Error al insertar el juego.');
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleGuardarClick = () => {
    const respuestaCorrecta1 = 'Cantina';
    const respuestaCorrecta2 = 'Instrumento';
    const palabraIngresada1 = juego.palabra[0];
    const palabraIngresada2 = juego.palabra[1];

    let nuevosPuntos = juego.puntosAcomulados;
    let nuevosIntentos = juego.intentos;
    let retroalimentacion = '';

    if (palabraIngresada1 === respuestaCorrecta1 && palabraIngresada2 === respuestaCorrecta2) {
      retroalimentacion = '¡Correcto! Obtuviste la respuesta correcta.';

      if (juego.intentos > 0) {
        nuevosPuntos += 10;
      }
    } else {
      retroalimentacion = '¡Incorrecto! Inténtalo de nuevo.';

      if (juego.intentos > 0) {
        nuevosIntentos--;
      }
    }

    if (nuevosIntentos < 0) {
      nuevosIntentos = 0;
    }

    setJuego({
      ...juego,
      intentos: nuevosIntentos,
      puntosAcomulados: nuevosPuntos,
      retroalimentacion: retroalimentacion,
    });

    // Solo inserta el juego si la respuesta es correcta
    if (retroalimentacion === '¡Correcto! Obtuviste la respuesta correcta.') {
      insertarJuego({
        ...juego,
        intentos: nuevosIntentos,
        puntosAcomulados: nuevosPuntos,
        retroalimentacion: retroalimentacion,
      });
    }
  };

  const handlePalabraChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const nuevasPalabras = [...juego.palabra];
    nuevasPalabras[index] = e.target.value;
    setJuego({
      ...juego,
      palabra: nuevasPalabras,
    });
  };

  const handleSiguienteClick = () => {
    if (juego.puntosAcomulados >= 10) {
      navigate('/Nivel2Cantina');
    } else {
      alert('Sigue practicando para alcanzar al menos 10 puntos.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container white-bg">
        <div className="row">
          <div className="col-12">
            <h1 className="titulo">Palabra: Cantina</h1>
          </div>
          <div className="col-12">
            <h2 className="subtitulo">Nivel 1: Fácil</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <p className="instrucciones">Observe las siguientes imágenes y escriba la palabra que corresponda a la imagen</p>
            <p className="instrucciones">Ejemplo: <span className="ejemplo">Casa</span></p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 columna">
            <div className="d-flex flex-column align-items-center">
              <img
                src="https://www.freevector.com/uploads/vector/preview/28194/Mexican_Cantina_vector_2.jpg"
                className="imagen img-fluid"
                style={{ width: '31%' }}
              />
              <input
                type="text"
                value={juego.palabra[0]}
                onChange={(e) => handlePalabraChange(e, 0)}
                placeholder="Escribe una palabra"
                className="input"
              />
            </div>
          </div>
          <div className="col-md-6 columna">
            <div className="d-flex flex-column align-items-center">
              <img
                src="https://image.freepik.com/vector-gratis/ilustracion-dibujos-animados-conjunto-instrumentos-musicales_11460-10028.jpg"
                alt="Imagen 2"
                className="imagen img-fluid"
                style={{ width: '24%' }}
              />
              <input
                type="text"
                value={juego.palabra[1]}
                onChange={(e) => handlePalabraChange(e, 1)}
                placeholder="Escribe una palabra"
                className="input"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 columna text-center">
            <button disabled={juego.intentos === 0 || juego.puntosAcomulados >= 10} className="boton" onClick={handleGuardarClick}>Guardar</button>
          </div>
          <div className="col-md-6 columna text-center">
            <button className="boton boton-siguiente" onClick={handleSiguienteClick}>Siguiente</button>
          </div>
          <div className="col-md columnana text-center">
            <button className="boton boton-regresar" onClick={() => navigate('/Seleccion')}>Regresar</button>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <p className="puntos">Puntos acumulados: {juego.puntosAcomulados}</p>
            <p className={juego.retroalimentacion === '¡Correcto! Obtuviste la respuesta correcta.' ? 'retroalimentacion-correcta' : juego.retroalimentacion === '¡Incorrecto! Inténtalo de nuevo.' ? 'retroalimentacion-incorrecta' : ''}>
              {juego.retroalimentacion}
            </p>
            <p className="intentos">Intentos restantes: {juego.intentos}</p>
          </div>
        </div>
      </div>
    </>
  );
};
