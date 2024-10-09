import React, { ChangeEvent, useContext, useState } from 'react';
import ContextApp from '../Models/Contexto';
import { useNavigate } from 'react-router-dom';
import { IJuego } from '../Juegos/IJuego';
import Navbar from '../Shared/Navbar';

export const Nivel3Tortilla = () => {
  const [letrasAdivinadas, setLetrasAdivinadas] = useState<string[]>([]);
  const contextApp = useContext(ContextApp);

  const navigate = useNavigate();

  const [juego, setJuego] = useState<IJuego>({
    nombre: 'Nivel 3: Tortilla',
    dificultad: 'Dificil',
    puntosAcomulados: 0,
    retroalimentacion: '',
    intentos: 6,
    porcentaje: 100,
    palabra: ["", "", "", "", "", "", ""],
    usuarioId: contextApp.id,
  });

  const respuestaCorrecta = "TRABAJO";

  const insertarJuego = async (juego: IJuego) => {
    try {
      const request = await fetch("https://localhost:7034/Juegos", {
        method: "post",
        body: JSON.stringify(juego),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      });

      if (request.ok) {
        console.log("Juego insertado con éxito.");
      } else {
        alert("Error al insertar el juego.");
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleGuardarClick = () => {
    let nuevosPuntos = juego.puntosAcomulados;
    let nuevosIntentos = juego.intentos;
    let retroalimentacion = '';

    if (juego.palabra.join('').toUpperCase() === respuestaCorrecta) {
      retroalimentacion = '¡Correcto! Obtuviste la respuesta correcta.';

      if (juego.intentos > 0) {
        nuevosPuntos += 25;
      }

      const juegoParaGuardar = {
        ...juego,
        intentos: nuevosIntentos,
        puntosAcomulados: nuevosPuntos,
        retroalimentacion: retroalimentacion,
        palabra: [respuestaCorrecta], // Guarda solo la respuesta correcta
      };

      setJuego(juegoParaGuardar);
      insertarJuego(juegoParaGuardar);
    } else {
      retroalimentacion = '¡Incorrecto! Inténtalo de nuevo.';
      nuevosIntentos = Math.max(0, nuevosIntentos - 1);

      setJuego((prev) => ({
        ...prev,
        intentos: nuevosIntentos,
        retroalimentacion: retroalimentacion,
      }));
    }
  };

  const handleLetraClick = (letra: string) => {
    if (juego.intentos > 0 && !letrasAdivinadas.includes(letra)) {
      setLetrasAdivinadas((prev) => [...prev, letra]);

      if (respuestaCorrecta.includes(letra)) {
        const nuevasLetras = [...juego.palabra];
        respuestaCorrecta.split('').forEach((l, index) => {
          if (l === letra) {
            nuevasLetras[index] = letra;
          }
        });

        setJuego((prev) => ({
          ...prev,
          palabra: nuevasLetras,
        }));
      } else {
        setJuego((prev) => ({ ...prev, intentos: prev.intentos - 1 }));
      }
    }
  };

  const handleSiguienteClick = () => {
    if (juego.puntosAcomulados >= 25) {
      navigate("/Seleccion");
    } else {
      alert("Sigue practicando para alcanzar al menos 25 puntos.");
    }
  };

  const palabraMostrada = respuestaCorrecta
    .split('')
    .map((letra) => (letrasAdivinadas.includes(letra) ? letra : '_'))
    .join(' ');

  const dibujosAhorcado = [
    '',
    '_____\n|/   |\n|    O\n|   \n|   \n|____',
    '_____\n|/   |\n|    O\n|    |\n|   \n|____',
    '_____\n|/   |\n|    O\n|   /|\n|   \n|____',
    '_____\n|/   |\n|    O\n|   /|\\\n|   \n|____',
    '_____\n|/   |\n|    O\n|   /|\\\n|   /\n|____',
    '_____\n|/   |\n|    O\n|   /|\\\n|   / \\\n|____'
  ];

  return (
    <>
      <Navbar />
      <div className="container white-bg">
        <div className="row">
          <div className="col-6">
            <div className="ahorcado-container">
              <p className="titulo">Ahorcado</p>
              <pre className="ahorcado">{dibujosAhorcado[6 - juego.intentos]}</pre>
            </div>
          </div>
          <div className="col-6">
            <h1 className="titulo">Palabra: Tortilla</h1>
            <p className="subtitulo">Nivel 3: Dificil</p>
            <p className="instrucciones">Adivina la palabra. Tienes 6 intentos.</p>
            <p className="palabra">{palabraMostrada}</p>
            <p className="intentos">Intentos restantes: {juego.intentos}</p>
            <p className="puntos">Puntos acumulados: {juego.puntosAcomulados}</p>
            <p className="retroalimentacion">{juego.retroalimentacion}</p>
            <div className="letras-container">
              {Array.from('TEDICHANTRBJO').map((letra, index) => (
                <button
                  key={index}
                  onClick={() => handleLetraClick(letra)}
                  disabled={letrasAdivinadas.includes(letra) || juego.intentos === 0}
                  className={`letra ${letrasAdivinadas.includes(letra) ? 'adivinada' : ''}`}
                >
                  {letra}
                </button>
              ))}
            </div>
            <div className="botones-container">
              <button onClick={handleGuardarClick} disabled={juego.intentos === 0 || juego.puntosAcomulados >= 25}>
                Guardar
              </button>
              <button className="boton boton-siguiente" onClick={handleSiguienteClick}>Siguiente</button>
              <button className="boton boton-regresar" onClick={() => navigate("/Nivel2Tortilla")}>Regresar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};



