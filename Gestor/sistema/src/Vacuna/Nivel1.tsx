import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Shared/Navbar';
import { useNavigate } from 'react-router-dom';
import { IJuego } from '../Juegos/IJuego';
import ContextApp from '../Models/Contexto';

export const Nivel1Vacuna = () => {
    const [letrasSeleccionadas, setLetrasSeleccionadas] = useState<{ [key: string]: boolean }>({});
    const contextApp = useContext(ContextApp);
    const navigate = useNavigate();

    const [juego, setJuego] = useState<IJuego>({
        nombre: 'Nivel 1: Vacuna',
        dificultad: 'Facil',
        puntosAcomulados: 0,
        retroalimentacion: '',
        intentos: 3,
        porcentaje: 100,
        palabra: ["VACUNA", "INYECCION"],
        usuarioId: contextApp.id
    });

    const sopaDeLetras = [
        ['V', 'A', 'S', 'U', 'R', 'A', 'E', 'E', 'E'],
        ['O', 'V', 'A', 'C', 'U', 'N', 'A', 'A', 'E'],
        ['E', 'C', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
        ['I', 'N', 'Y', 'E', 'C', 'C', 'I', 'O', 'N'],
    ];

    const handleGuardarClick = async () => {
        const letrasFormadas = Object.keys(letrasSeleccionadas).map(
            (key) => sopaDeLetras[parseInt(key[0])][parseInt(key[2])]
        );

        const palabrasFormadas = juego.palabra.filter((palabra) =>
            palabra.split('').every((letra) => letrasFormadas.includes(letra))
        );

        if (palabrasFormadas.length === juego.palabra.length) {
            // Actualizar puntos, intentos y retroalimentación localmente
            setJuego((prevState) => ({
                ...prevState,
                puntosAcomulados: prevState.puntosAcomulados + 10, // Aumentar puntos
                retroalimentacion: '¡Buen trabajo! Has formado todas las palabras correctamente.', // Actualizar retroalimentación
            }));

            try {
                // Llamada a la API para guardar el juego
                const response = await fetch("https://localhost:7034/Juegos", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...juego,
                        puntosAcomulados: juego.puntosAcomulados + 25,
                        retroalimentacion: '¡Buen trabajo! Has formado todas las palabras correctamente.',
                        letrasSeleccionadas: Object.keys(letrasSeleccionadas).filter(
                            (key) => letrasSeleccionadas[key]
                        ),
                    }),
                });

                if (response.ok) {
                    console.log("Juego guardado con éxito.");
                } else {
                    console.error("Error al guardar el juego.");
                }
            } catch (error) {
                console.error("Error de red:", error);
            }
        } else {
            // Actualizar intentos y retroalimentación localmente
            setJuego((prevState) => ({
                ...prevState,
                intentos: prevState.intentos > 0 ? prevState.intentos - 1 : 0, // Disminuir intentos si son mayores que 0
                retroalimentacion: 'No se formaron todas las palabras correctamente. Inténtalo de nuevo.', // Actualizar retroalimentación
            }));
        }
    };

    const handleLetterClick = (rowIndex: number, columnIndex: number) => {
        const key = `${rowIndex}-${columnIndex}`;
        setLetrasSeleccionadas((prevState) => ({
            ...prevState,
            [key]: true,
        }));
    };


    const handleSiguienteClick = () => {
        if (juego.puntosAcomulados >= 10) {
            navigate("/Nivel2Vacuna");
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
                        <h1 className="titulo">Palabra: Vacuna</h1>
                        <p className='subtitulo'>Nivel 1: Facil</p>
                        <p>Busca en la suguiente sopas de letras las suguientes palabras</p>
                        <ul>INYECCION, VACUNA</ul>
                    </div>
                    <div className="sopa-de-letras">
                        {sopaDeLetras.map((row, i) => (
                            <div key={i} className="sopa-row">
                                {row.map((letter, j) => {
                                    const key = `${i}-${j}`;
                                    return (
                                        <span
                                            key={j}
                                            className={`sopa-letter ${letrasSeleccionadas[key] ? 'selected' : ''}`}
                                            onClick={() => handleLetterClick(i, j)}
                                        >
                                            {letter}
                                        </span>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                    <div className="row">
                        <div className="col-12 text-center">
                            <button className="guardar-button" onClick={handleGuardarClick} disabled={juego.intentos === 0 || juego.puntosAcomulados >= 10}>
                                Responder
                            </button>
                            <div className="col-md-6 columna text-center">
                                <button className="boton boton-siguiente" onClick={handleSiguienteClick}>Siguiente</button>
                            </div>
                            <div className="col-md columnana text-center">
                                <button className="boton boton-regresar" onClick={() => navigate("/Seleccion")}>Regresar</button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 text-center">
                            <p>Intentos: {juego.intentos}</p>
                            <p>Puntos: {juego.puntosAcomulados}</p>
                            <p>{juego.retroalimentacion}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

// ... código posterior ...
