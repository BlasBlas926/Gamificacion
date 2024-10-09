import React, { ChangeEvent, useContext, useState } from 'react';
import Navbar from '../Shared/Navbar';
import { useNavigate } from 'react-router-dom';
import { IJuego } from '../Juegos/IJuego';
import ContextApp from '../Models/Contexto';

export const Nivel1Mexico = () => {
    const contextApp = useContext(ContextApp);
    const navigate = useNavigate();

    const [juego, setJuego] = useState<IJuego>({
        nombre: 'Nivel 1: Mexico',
        dificultad: 'Fácil',
        puntosAcomulados: 0,
        retroalimentacion: '',
        intentos: 10,
        porcentaje: 100,
        palabra: ["", ""],
        usuarioId: contextApp.id,
    });

    const respuestaCorrecta1 = "PA-LA";
    const respuestaCorrecta2 = "PI-ÑA-TA";

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

    const handleGuardarClick = () => {
        const palabraIngresada1 = juego.palabra[0].toUpperCase();
        const palabraIngresada2 = juego.palabra[1].toUpperCase();

        let nuevosPuntos = juego.puntosAcomulados;
        let nuevosIntentos = juego.intentos;
        let retroalimentacion = '';

        if (palabraIngresada1 === respuestaCorrecta1 && palabraIngresada2 === respuestaCorrecta2) {
            retroalimentacion = '¡Correcto! Obtuviste la respuesta correcta.';

            if (juego.intentos > 0) {
                nuevosPuntos += 10;

                // Solo inserta el juego si la respuesta es correcta
                insertarJuego({
                    ...juego,
                    intentos: nuevosIntentos,
                    puntosAcomulados: nuevosPuntos,
                    retroalimentacion: retroalimentacion
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
    }

    const handlePalabraChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const nuevasPalabras = [...juego.palabra];
        nuevasPalabras[index] = e.target.value;
        setJuego({
            ...juego,
            palabra: nuevasPalabras
        });
    }

    const handleSiguienteClick = () => {
        if (juego.puntosAcomulados >= 10) {
            navigate("/Nivel2Mexico");
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
                        <h1 className="titulo">Palabra: México</h1>
                    </div>
                    <div className="col-12">
                        <h2 className="subtitulo">Nivel 1: Fácil</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <p className="instrucciones">Observe las siguientes imágenes y divide la palabra en silabas según con correponda</p>
                        <p className="instrucciones">Ejemplo: <span className="ejemplo">Ca-sa</span></p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 columna">
                        <div className="d-flex flex-column align-items-center">
                            <img
                                src="https://media.istockphoto.com/vectors/shovel-for-industrial-worker-in-cartoon-style-vector-id1029821758?k=6&m=1029821758&s=170667a&w=0&h=E2hu1H_VKxEMvaVRv0J8wHIIOmd5NLqlX_5F0irm_6g="
                                className="imagen img-fluid"
                                style={{ width: "25%" }}
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
                                src="https://st2.depositphotos.com/5057409/7509/v/950/depositphotos_75094177-stock-illustration-color-mexican-pinata-shape-star.jpg"
                                alt="Imagen 2"
                                className="imagen img-fluid"
                                style={{ width: "25%" }}
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
                        <button onClick={handleGuardarClick} disabled={juego.intentos === 0 || juego.puntosAcomulados >= 10} className="boton">Responder</button>
                    </div>
                    <div className="col-md-6 columna text-center">
                        <button className="boton boton-siguiente" onClick={handleSiguienteClick}>Siguiente</button>
                    </div>
                    <div className="col-md columnana text-center">
                        <button className="boton boton-regresar" onClick={() => navigate("/Seleccion")}>Regresar</button>
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
            </div >
        </>
    );
}
