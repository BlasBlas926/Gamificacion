import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IJuego } from '../Juegos/IJuego';
import Navbar from '../Shared/Navbar';
import ContextApp from '../Models/Contexto';

const PALABRA_AHORCADO = 'BASURA';

export const Nivel2Basura = () => {
    const navigate = useNavigate();
    const contextApp = useContext(ContextApp);

    const [juego, setJuego] = useState<IJuego>({
        nombre: 'Nivel 2: Basura',
        dificultad: 'Normal',
        puntosAcomulados: 0,
        retroalimentacion: '',
        intentos: 5,
        porcentaje: 100,
        palabra: Array.from({ length: PALABRA_AHORCADO.length }, () => ''),
        usuarioId: contextApp.id,
    });

    const respuestaCorrecta = PALABRA_AHORCADO.split('');

    const insertarJuego = async (juego: IJuego) => {
        try {
            // Supongamos que tienes una API para guardar juegos
            const response = await fetch('https://localhost:7034/Juegos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(juego),
            });

            if (!response.ok) {
                throw new Error('Error al guardar el juego');
            }

            console.log('Juego guardado exitosamente');
        } catch (error) {
            console.error(error);
        }
    };

    const handleGuardarClick = () => {
        const palabraIngresada = juego.palabra.join('').toUpperCase();

        let nuevosPuntos = juego.puntosAcomulados;
        let nuevosIntentos = juego.intentos;
        let retroalimentacion = '';

        if (palabraIngresada === PALABRA_AHORCADO) {
            retroalimentacion = '¡Correcto! Obtuviste la respuesta correcta.';
            nuevosPuntos += 20;

            // Insertar juego en la base de datos solo si la respuesta es correcta
            insertarJuego({
                ...juego,
                intentos: nuevosIntentos,
                puntosAcomulados: nuevosPuntos,
                retroalimentacion: retroalimentacion,
            });
        } else {
            retroalimentacion = '¡Incorrecto! Inténtalo de nuevo.';
            nuevosIntentos--;

            if (nuevosIntentos === 0) {
                // Lógica para mostrar el ahorcado o finalizar el juego
                retroalimentacion = `Se agotaron los intentos. La palabra correcta era: ${PALABRA_AHORCADO}`;
            }
        }

        // Verifica que los intentos no sean negativos
        nuevosIntentos = Math.max(0, nuevosIntentos);

        setJuego({
            ...juego,
            intentos: nuevosIntentos,
            puntosAcomulados: nuevosPuntos,
            retroalimentacion: retroalimentacion,
        });
    };

    const handleLetraChange = (index: number, letra: string) => {
        const nuevasLetras = [...juego.palabra];
        nuevasLetras[index] = letra.toUpperCase();
        setJuego({
            ...juego,
            palabra: nuevasLetras,
        });
    };

    const handleSiguienteClick = () => {
        if (juego.puntosAcomulados >= 20) {
            navigate('/Nivel3Basura');
        } else {
            alert('Sigue practicando para alcanzar al menos 20 puntos.');
        }
    };

    return (
        <>
            <Navbar />
            <div className="container white-bg ahorcado-container">
                <div className="row">
                    <div className="col-12">
                        <h2 className="titulo">Palabra: Basura</h2>
                        <p className="subtitulo">Nivel 2: Normal</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <p className="instrucciones">Adivina la palabra: Empieza con B</p>
                        <div className="ahorcado-word">
                            {respuestaCorrecta.map((letra, index) => (
                                <div key={index} className="letra-ahorcado">
                                    {juego.palabra[index]}
                                </div>
                            ))}
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <label>Ingresa una letra: </label>
                                <div className="letras-input">
                                    {respuestaCorrecta.map((letra, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            value={juego.palabra[index]}
                                            onChange={(e) => handleLetraChange(index, e.target.value)}
                                            maxLength={1}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row intentos-puntos-container">
                    <div className="intentos">Intentos: {juego.intentos}</div>
                    <div className="puntos">Puntos: {juego.puntosAcomulados}</div>
                </div>
                {juego.retroalimentacion && (
                    <div className="row retroalimentacion">{juego.retroalimentacion}</div>
                )}
                <div className="row">
                    <div className="col-12">
                        <button onClick={handleGuardarClick} disabled={juego.intentos === 0 || juego.puntosAcomulados >= 20} className="guardar-button">
                            Responder
                        </button>
                        <div className="col-md-6 columna text-center">
                            <button className="boton boton-siguiente" onClick={handleSiguienteClick}>Siguiente</button>
                        </div>
                        <div className="col-md columnana text-center">
                            <button className="boton boton-regresar" onClick={() => navigate("/Nivel1Basura")}>Regresar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
