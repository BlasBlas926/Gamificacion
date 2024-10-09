import React, { useState, useContext, ChangeEvent } from "react";
import { IJuego } from "../Juegos/IJuego";
import ContextApp from "../Models/Contexto";
import "./Nivel1.css";
import Navbar from "../Shared/Navbar";
import { useNavigate } from "react-router-dom";

export const Nivel2Pala = () => {
    const contextApp = useContext(ContextApp);
    const navigate = useNavigate();

    const [juego, setJuego] = useState<IJuego>({
        nombre: 'Nivel 2: Pala',
        dificultad: 'Normal',
        puntosAcomulados: 0,
        retroalimentacion: '',
        intentos: 5,
        porcentaje: 100,
        palabra: ["", ""],
        usuarioId: contextApp.id,
    });

    const respuestaCorrecta1 = "Pe-lo-ta";
    const respuestaCorrecta2 = "Ju-gue-te";

    const insertarJuego = async (juego: IJuego) => {
        try {
            if (juego.intentos > 0 && juego.palabra[0] === respuestaCorrecta1 && juego.palabra[1] === respuestaCorrecta2) {
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
            }
        } catch (error) {
            alert(error);
        }
    }

    const handleGuardarClick = () => {
        const palabraIngresada1 = juego.palabra[0];
        const palabraIngresada2 = juego.palabra[1];

        let nuevosPuntos = juego.puntosAcomulados;
        let nuevosIntentos = juego.intentos;
        let retroalimentacion = '';

        if (palabraIngresada1 === respuestaCorrecta1 && palabraIngresada2 === respuestaCorrecta2) {
            retroalimentacion = '¡Correcto! Obtuviste la respuesta correcta.';

            if (juego.intentos > 0) {
                nuevosPuntos += 20;
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

        // Insertar juego en la base de datos
        insertarJuego({
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
        if (juego.puntosAcomulados >= 20) {
            navigate("/Nivel3Pala");
        } else {
            alert("Sigue practicando para alcanzar al menos 20 puntos.");
        }
    }
    return (
        <>
            <Navbar />
            <div className="container white-bg">
                <div className="row">
                    <div className="col-12">
                        <h1 className="titulo">Palabra: Pala</h1>
                    </div>
                    <div className="col-12">
                        <h2 className="subtitulo">Nivel 2: Normal</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <p className="instrucciones">Observe las siguientes imágenes y escriba la palabra que corresponda a la imagen</p>
                        <p className="instrucciones">Ejemplo: <span className="ejemplo">Ca-sa</span></p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 columna">
                        <div className="d-flex flex-column align-items-center">
                            <img
                                src="https://image.freepik.com/vector-gratis/imagenes-predisenadas-dibujos-animados-pelota-baloncesto_11460-3908.jpg"
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
                                src="https://st.depositphotos.com/3236579/4310/v/950/depositphotos_43100127-stock-illustration-cartoon-baby-toys-isolated-on.jpg"
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
                        <button onClick={handleGuardarClick} disabled={juego.intentos === 0 || juego.puntosAcomulados >= 20} className="boton">Responder</button>
                    </div>
                    <div className="col-md-6 columna text-center">
                        <button className="boton boton-siguiente" onClick={handleSiguienteClick}>Siguiente</button>
                    </div>
                    <div className="col-md columnana text-center">
                        <button className="boton boton-regresar" onClick={() => navigate("/Nivel1Pala")}>Regresar</button>
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
}
