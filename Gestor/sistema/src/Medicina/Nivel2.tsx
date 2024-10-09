import React, { ChangeEvent, useContext, useState } from 'react';
import ContextApp from '../Models/Contexto';
import { IJuego } from '../Juegos/IJuego';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Shared/Navbar';

export const Nivel2Medicina = () => {
    const contextApp = useContext(ContextApp);
    const navigate = useNavigate();

    const [juego, setJuego] = useState<IJuego>({
        nombre: 'Nivel 2: Medicina',
        dificultad: 'Normal',
        puntosAcomulados: 0,
        retroalimentacion: '',
        intentos: 5,
        porcentaje: 100,
        palabra: ["", ""],
        usuarioId: contextApp.id,
    });

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
        const respuestaCorrecta1 = "Medicina";
        const respuestaCorrecta2 = "Mercado";
        const palabraIngresada1 = juego.palabra[0];
        const palabraIngresada2 = juego.palabra[1];

        let nuevosPuntos = juego.puntosAcomulados;
        let nuevosIntentos = juego.intentos;
        let retroalimentacion = '';

        if (palabraIngresada1 === respuestaCorrecta1 && palabraIngresada2 === respuestaCorrecta2) {
            retroalimentacion = '¡Correcto! Obtuviste la respuesta correcta.';

            if (juego.intentos > 0) {
                nuevosPuntos += 20;
                // Solo guardamos si ambas respuestas son correctas
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

        nuevosIntentos = Math.max(0, nuevosIntentos);

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
        if (juego.puntosAcomulados >= 20) {
            navigate("/Nivel3Medicina");
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
                        <h1 className="titulo">Palabra:Medicina</h1>
                    </div>
                    <div className="col-12">
                        <h2 className="subtitulo">Nivel 2: Normal</h2>
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
                                src="https://static.vecteezy.com/system/resources/previews/002/043/492/non_2x/cute-cartoon-medicine-character-isometric-drugs-pills-syringe-thermometer-band-aid-dropper-and-first-aid-box-illustration-design-concept-of-healthcare-and-medicine-free-vector.jpg"
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
                                src="https://th.bing.com/th/id/OIP.3aG-pkJmNYR80NZp51fLZgHaHa?rs=1&pid=ImgDetMain"
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
                        <button onClick={handleGuardarClick} disabled={juego.intentos === 0 || juego.puntosAcomulados === 20} className="boton">Responder</button>
                    </div>
                    <div className="col-md-6 columna text-center">
                        <button className="boton boton-siguiente" onClick={handleSiguienteClick}>Siguiente</button>
                    </div>
                    <div className="col-md columnana text-center">
                        <button className="boton boton-regresar" onClick={() => navigate("/Nivel1Medicina")}>Regresar</button>
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
