import React, { ChangeEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IJuego } from '../Juegos/IJuego';
import ContextApp from '../Models/Contexto';
import Navbar from '../Shared/Navbar';
import './Nivel1Familia.css';

export const Nivel1Familia = () => {
    const contextApp = useContext(ContextApp);
    const navigate = useNavigate();

    const [juego, setJuego] = useState<IJuego>({
        nombre: 'Nivel 1: Familia',
        dificultad: 'Fácil',
        puntosAcomulados: 0,
        retroalimentacion: '',
        intentos: 10,
        porcentaje: 100,
        palabra: ["", "", "", "", "", "", ""],
        usuarioId: contextApp.id,
    });

    const respuestaCorrecta = "FAMILIA";

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
    }

    const guardarJuego = async (intentos: number, puntos: number, retroalimentacion: string) => {
        const juegoParaGuardar = {
            ...juego,
            intentos: intentos,
            puntosAcomulados: puntos,
            retroalimentacion: retroalimentacion,
            palabra: juego.palabra
        };

        insertarJuego(juegoParaGuardar);
    }

    const handleGuardarClick = () => {
        const palabraIngresada = juego.palabra.join('');

        let nuevosPuntos = juego.puntosAcomulados;
        let nuevosIntentos = juego.intentos;
        let retroalimentacion = '';

        if (palabraIngresada.toUpperCase() === respuestaCorrecta) {
            retroalimentacion = '¡Correcto! Obtuviste la respuesta correcta.';

            if (juego.intentos > 0) {
                nuevosPuntos += 10;
                // Solo guardamos si la respuesta es correcta
                guardarJuego(nuevosIntentos, nuevosPuntos, retroalimentacion);
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

        const juegoParaGuardar = {
            ...juego,
            intentos: nuevosIntentos,
            puntosAcomulados: nuevosPuntos,
            retroalimentacion: retroalimentacion,
            palabra: juego.palabra
        };

        setJuego(juegoParaGuardar);
    }

    const handleLetraChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const nuevasLetras = [...juego.palabra];
        nuevasLetras[index] = e.target.value.toUpperCase(); // Convertir a mayúsculas
        setJuego({
            ...juego,
            palabra: nuevasLetras
        });
    }

    const handleSiguienteClick = () => {
        if (juego.puntosAcomulados >= 10) {
            navigate("/Nivel2Familia");
        } else {
            alert("Sigue practicando para alcanzar al menos 10 puntos.");
        }
    }

    return (
        <>
            <Navbar />
            <div className="container white-bg">
                <div className="row">
                    <div className="col-12">
                        <h1 className="titulo">Palabra: Familia</h1>
                        <p className='subtitulo'>Nivel 1: Fácil</p>
                    </div>
                    <p>Observa la imagen y escribe en cada recuadro la letra que corresponda para formar la palabra.</p>
                </div>
                <div className="row">
                    <div className="col-12">
                        {/* Agregar la imagen con estilos de centrado */}
                        <div className="image-container">
                            <img src="https://th.bing.com/th/id/OIP._GsiY7Cbfqf1gszHXLPxngHaHa?pid=ImgDet&rs=1" alt="Imagen" />
                        </div>

                        <div className="palabra-container">
                            {juego.palabra.map((letra, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    value={letra}
                                    onChange={(e) => handleLetraChange(e, index)}
                                />
                            ))}
                        </div>
                        <div className="info-container">
                            {juego.retroalimentacion && (
                                <div className={`retroalimentacion ${juego.retroalimentacion === '¡Correcto! Obtuviste la respuesta correcta.' ? 'correcta' : 'incorrecta'}`}>
                                    <p>{juego.retroalimentacion}</p>
                                </div>
                            )}
                            <p>Intentos restantes: {juego.intentos}</p>
                            <p>Puntos acumulados: {juego.puntosAcomulados}</p>
                        </div>
                        <div className="button-container">
                            <button className="guardar-button" disabled={juego.intentos === 0 || juego.puntosAcomulados >= 10} onClick={handleGuardarClick}>Guardar</button>
                            <div className="col-md-6 columna text-center">
                                <button className="boton boton-siguiente" onClick={handleSiguienteClick}>Siguiente</button>
                            </div>
                            <div className="col-md columnana text-center">
                                <button className="boton boton-regresar" onClick={() => navigate("/Seleccion")}>Regresar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
