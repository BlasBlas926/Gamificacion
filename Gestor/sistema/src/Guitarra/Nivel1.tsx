import React, { ChangeEvent, useContext, useState } from 'react';
import Navbar from '../Shared/Navbar';
import { useNavigate } from 'react-router-dom';
import { IJuego } from '../Juegos/IJuego';
import ContextApp from '../Models/Contexto';
import '../Pala/Nivel1.css';

export const Nivel1Guitarra = () => {
    const contextApp = useContext(ContextApp);
    const navigate = useNavigate();

    const [juego, setJuego] = useState<IJuego>({
        nombre: 'Nivel 1: Guitarra',
        dificultad: 'Fácil',
        puntosAcomulados: 0,
        retroalimentacion: '',
        intentos: 10,
        porcentaje: 100,
        palabra: ["", "", "", "", "", "", "", ""],
        usuarioId: contextApp.id,
    });

    const respuestaCorrecta = "GUITARRA";

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
                nuevosPuntos += 10;

                // Solo inserta el juego si la respuesta es correcta
                insertarJuego({
                    ...juego,
                    intentos: nuevosIntentos,
                    puntosAcomulados: nuevosPuntos,
                    retroalimentacion: retroalimentacion,
                    palabra: juego.palabra
                });
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
            retroalimentacion: retroalimentacion
        });
    };

    const handleLetraChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const nuevasLetras = [...juego.palabra];
        nuevasLetras[index] = e.target.value.toUpperCase(); // Convertir a mayúsculas
        setJuego({
            ...juego,
            palabra: nuevasLetras
        });
    };

    const handleSiguienteClick = () => {
        if (juego.puntosAcomulados >= 10) {
            navigate("/Nivel2Guitarra");
        } else {
            alert("Sigue practicando para alcanzar al menos 10 puntos.");
        }
    };

    return (
        <>
            <Navbar />
            <div className="container white-bg">
                <div className="row">
                    <div className="col-12">
                        <h1 className="titulo">Palabra: Guitarra</h1>
                        <p className="subtitulo">Nivel 1: Fácil</p>
                    </div>
                    <p>Observa la imagen y escribe en cada recuadro la letra que corresponda para formar la palabra.</p>
                </div>
                <div className="row">
                    <div className="col-12">
                        {/* Agregar la imagen con estilos de centrado */}
                        <div className="image-container">
                            <img src="https://st.depositphotos.com/1024768/2955/v/950/depositphotos_29551501-stock-illustration-guitar-clip-art-cartoon-illustration.jpg" alt="Imagen" />
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
                            <button className="guardar-button" disabled={juego.intentos === 0 || juego.puntosAcomulados >= 10} onClick={handleGuardarClick}>Responder</button>
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
};
