import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IJuego } from '../Juegos/IJuego';
import ContextApp from '../Models/Contexto';
import './Nivel1Basura.css';
import Navbar from '../Shared/Navbar';
import { IUsuario } from '../Inicio/IUsuario';
import axios from 'axios';

export const Nivel1Basura = () => {
    const [letrasSeleccionadas, setLetrasSeleccionadas] = useState<{ [key: string]: boolean }>({});
    const contextApp = useContext(ContextApp);
    const navigate = useNavigate();
    const { id, nombre, apellidoMaterno, apellidoPaterno } = useContext(ContextApp);

    const [juego, setJuego] = useState<IJuego>({
        id : '',
        nombre: 'Nivel 1: Basura',
        dificultad: 'Facil',
        puntosAcomulados: 0,
        retroalimentacion: '',
        intentos: 10,
        porcentaje: 100,
        palabra: ["BASURA", "ORGANICA", "RECICLAJE"],
        usuarioId: contextApp.id,
    });

  
    const sopaDeLetras = [
        ['B', 'A', 'S', 'U', 'R', 'A', 'E', 'E', 'E'],
        ['O', 'R', 'G', 'A', 'N', 'I', 'C', 'A', 'E'],
        ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
        ['R', 'E', 'C', 'I', 'C', 'L', 'A', 'J', 'E'],
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
                puntosAcomulados: prevState.puntosAcomulados + 25, // Aumentar puntos
                retroalimentacion: 'Has formado todas las palabras correctamente.', // Actualizar retroalimentación
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
                        puntosAcomulados: juego.puntosAcomulados + 10,
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
                retroalimentacion: 'Inténtalo de nuevo.', // Actualizar retroalimentación
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
            navigate("/Nivel2Basura");
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
                        <h2 className="titulo">Palabra: Basura</h2>
                        <p className="subtitulo">Nivel 1: Fácil</p>
                        <p>Busca en la suguiente sopas de letras las suguientes palabras</p>
                        <ul>Basura, Reciclaje, Orgonica</ul>
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
                                Guardar
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