import exp from 'constants'
import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import { IJuego } from '../Juegos/IJuego';
import ContextApp from '../Models/Contexto';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Shared/Navbar';

export const Nivel3Basura = () => {
    const [letrasAdivinadas, setLetrasAdivinadas] = useState<string[]>([]);
    const contextApp = useContext(ContextApp);
    const navigate = useNavigate();

    const [juego, setJuego] = useState<IJuego>({
        nombre: 'Nivel 3: Basura',
        dificultad: 'Dificil',
        puntosAcomulados: 0,
        retroalimentacion: '',
        intentos: 6,
        porcentaje: 100,
        palabra: ["", "", "", "", "", "", "", "", ""],
        usuarioId: contextApp.id,

    });
    const respuestaCorrecta = "RECICLAJE";

    const insertarJuego = async (juego: IJuego) => {
        try {
            if (juego.intentos > 0 && juego.palabra.join('').toUpperCase() === respuestaCorrecta) {
                const response = await fetch("https://localhost:7034/Juegos", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(juego),
                });

                if (response.ok) {
                    console.log("Juego insertado con éxito.");
                } else {
                    alert("Error al insertar el juego.");
                }
            }
        } catch (error) {
            console.error(error);
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
            palabra: juego.palabra,
        };

        setJuego(juegoParaGuardar);


        insertarJuego(juegoParaGuardar);
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
                        <h1 className="titulo"> Palabra: Basura</h1>
                        <p className="subtitulo">Nivel 3: Dificil</p>
                        <p className="instrucciones">Adivina la sguiente palabra.</p>
                        <p className="palabra">{palabraMostrada}</p>
                        <p className="intentos">Intentos restantes: {juego.intentos}</p>
                        <p className="puntos">Puntos acumulados: {juego.puntosAcomulados}</p>
                        <p className="retroalimentacion">{juego.retroalimentacion}</p>
                        <div className="letras-container">
                            {'RFGECILAJ'.split('').map((letra) => (
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
                            <button onClick={handleGuardarClick} disabled={juego.intentos === 0 || juego.puntosAcomulados >= 30}>
                                Guardar
                            </button>
                            <div className="col-md-6 columna text-center">
                                <button className="boton boton-siguiente" onClick={handleSiguienteClick}>Siguiente</button>
                            </div>
                            <div className="col-md columnana text-center">
                                <button className="boton boton-regresar" onClick={() => navigate("/Nivel2Basura")}>Regresar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
