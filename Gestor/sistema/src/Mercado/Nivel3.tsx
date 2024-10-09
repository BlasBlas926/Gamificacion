import React, { ChangeEvent, useContext, useState } from 'react';
import Navbar from '../Shared/Navbar';
import { useNavigate } from 'react-router-dom';
import { IJuego } from '../Juegos/IJuego';
import ContextApp from '../Models/Contexto';

export const Nivel3Mercado = () => {
  const [letrasAdivinadas, setLetrasAdivinadas] = useState<string[]>([]);
  const contextApp = useContext(ContextApp);
  const navigate = useNavigate();

  const [juego, setJuego] = useState<IJuego>({
    nombre: 'Nivel 3: Mercado',
    dificultad: 'Difícil',
    puntosAcomulados: 0,
    retroalimentacion: '',
    intentos: 6,
    porcentaje: 100,
    palabra: ["", "", "", "", "", "", ""],
    usuarioId: contextApp.id,
  });
  const respuestaCorrecta = "MERCADO";

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
    const palabraIngresada = juego.palabra.join('');

    let nuevosPuntos = juego.puntosAcomulados;
    let nuevosIntentos = juego.intentos;
    let retroalimentacion = '';

    if (palabraIngresada.toUpperCase() === respuestaCorrecta) {
      retroalimentacion = '¡Correcto! Obtuviste la respuesta correcta.';

      if (juego.intentos > 0) {
        nuevosPuntos += 25;
      }
    } else {
      retroalimentacion = '¡Incorrecto! Inténtalo de nuevo.';

      if (juego.intentos > 0) {
        nuevosIntentos--;
      }
    }

    nuevosIntentos = Math.max(0, nuevosIntentos);

    const juegoParaGuardar = {
      ...juego,
      intentos: nuevosIntentos,
      puntosAcomulados: nuevosPuntos,
      retroalimentacion: retroalimentacion,
      palabra: juego.palabra
    };

    setJuego(juegoParaGuardar);

    // Solo guarda el juego si la respuesta es correcta
    if (retroalimentacion === '¡Correcto! Obtuviste la respuesta correcta.') {
      insertarJuego(juegoParaGuardar);
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
        setJuego({
          ...juego,
          palabra: nuevasLetras
        });
      } else {
        setJuego((prev) => ({ ...prev, intentos: prev.intentos - 1 }));
      }
    }
  };

  const handleLetraChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const nuevasLetras = [...juego.palabra];
    nuevasLetras[index] = e.target.value.toUpperCase();
    setJuego({
      ...juego,
      palabra: nuevasLetras
    });
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
            <h1 className="titulo">Palabra: Mercado</h1>
            <h2>Nivel 3: Difícil</h2>
            <p className="instrucciones">Adivina la siguiente palabra.</p>
            <p className="palabra">{palabraMostrada}</p>
            <p className="intentos">Intentos restantes: {juego.intentos}</p>
            <p className="puntos">Puntos acumulados: {juego.puntosAcomulados}</p>
            <p className="retroalimentacion">{juego.retroalimentacion}</p>
            <div className="letras-container">
              {'ERCAMTYODI'.split('').map((letra) => (
                <button
                  key={letra}
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
                Responder
              </button>
              <div className="col-md-6 columna text-center">
                <button className="boton boton-siguiente" onClick={handleSiguienteClick}>Siguiente</button>
              </div>
              <div className="col-md columnana text-center">
                <button className="boton boton-regresar" onClick={() => navigate("/Nivel2Mercado")}>Regresar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
