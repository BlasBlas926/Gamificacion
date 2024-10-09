import React, { ChangeEvent, useContext, useState } from 'react';
import ContextApp from '../Models/Contexto';
import { useNavigate } from 'react-router-dom';
import { IJuego } from '../Juegos/IJuego';
import Navbar from '../Shared/Navbar';

export const Nivel1Leche = () => {
    const contextApp = useContext(ContextApp);
    const navigate = useNavigate();

    const [juego, setJuego] = useState<IJuego>({
        nombre: 'Nivel 1: Leche',
        dificultad: 'Fácil',
        puntosAcomulados: 0,
        retroalimentacion: '',
        intentos: 10,
        porcentaje: 100,
        palabra: ["", "", "", "", ""],
        usuarioId: contextApp.id,
    });

    const respuestaCorrecta = "LECHE";

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

        if (palabraIngresada.toUpperCase() === respuestaCorrecta) {
            let nuevosPuntos = juego.puntosAcomulados;
            let nuevosIntentos = juego.intentos;
            let retroalimentacion = '';

            retroalimentacion = '¡Correcto! Obtuviste la respuesta correcta.';

            if (juego.intentos > 0) {
                nuevosPuntos += 10;
            }

            const juegoParaGuardar = {
                ...juego,
                intentos: nuevosIntentos,
                puntosAcomulados: nuevosPuntos,
                retroalimentacion: retroalimentacion,
                palabra: juego.palabra
            };

            setJuego(juegoParaGuardar);
            insertarJuego(juegoParaGuardar);
        } else {
            let nuevosIntentos = juego.intentos - 1;

            if (nuevosIntentos < 0) {
                nuevosIntentos = 0;
            }

            setJuego((prev) => ({
                ...prev,
                intentos: nuevosIntentos,
                retroalimentacion: '¡Incorrecto! Inténtalo de nuevo.'
            }));
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
        if (juego.puntosAcomulados >= 10) {
            navigate("/Nivel2Leche");
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
                        <h1 className="titulo">Palabra: Leche</h1>
                        <p className="subtitulo">Nivel 1 - Fácil</p>
                    </div>
                    <p>Observa la imagen y escribe en cada recuadro la letra que corresponda para formar la palabra.</p>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="image-container">
                            <img src="https://image.freepik.com/vector-gratis/leche-divertida-feliz-linda-icono-ilustracion-personaje-kawaii-dibujos-animados-linea-plana_92289-1627.jpg" alt="Imagen" />
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
                            <button className="guardar-button" onClick={handleGuardarClick} disabled={juego.intentos === 0 || juego.puntosAcomulados >= 10}>Responder</button>
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
