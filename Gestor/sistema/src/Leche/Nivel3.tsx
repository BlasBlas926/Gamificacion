import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ContextApp from '../Models/Contexto';
import { IJuego } from '../Juegos/IJuego';
import Navbar from '../Shared/Navbar';


export const Nivel3Leche = () => {
    const [letrasSeleccionadas, setLetrasSeleccionadas] = useState<{ [key: string]: boolean }>({});
    const contextApp = useContext(ContextApp);
    const navigate = useNavigate();

    const [juego, setJuego] = useState<IJuego>({
        nombre: 'Nivel 3: Leche',
        dificultad: 'Dificil',
        puntosAcomulados: 0,
        retroalimentacion: '',
        intentos: 3,
        porcentaje: 100,
        palabra: ["AGUA", 'LECHE', 'CASA', 'PALA'],
        usuarioId: contextApp.id,
    });
    const sopaDeLetras = [
        ['A', 'W', 'A', 'G', 'U', 'A', 'M', 'P', 'N'],
        ['B', 'G', 'L', 'V', 'B', 'L', 'P', 'D', 'V'],
        ['Z', 'A', 'E', 'P', 'C', 'A', 'S', 'A', 'J'],
        ['C', 'V', 'C', 'A', 'X', 'S', 'D', 'B', 'T'],
        ['V', 'X', 'H', 'L', 'D', 'A', 'C', 'N', 'R'],
        ['B', 'B', 'E', 'A', 'S', 'Q', 'V', 'M', 'E']
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
                retroalimentacion: 'No se formaron todas las palabras correctamente. Inténtalo de nuevo.',
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
        if (juego.puntosAcomulados >= 25) {
            navigate("/Seleccion");
        } else {
            alert("Sigue practicando para alcanzar al menos 25 puntos.");
        }
    };

    return (
        <>
            <Navbar />
            <div className="container white-bg">
                <div className="row">
                    <div className="col-12">
                        <h1 className="titulo">Palabra: Leche</h1>
                        <p className='subtitulo'>Nivel 3: Difícil</p>
                        <p>Busca en la siguiente sopa de letras las siguientes palabras</p>
                        <ul>LECHE,PALA,CASA,AGUA,</ul>

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
                            <button className="guardar-button" onClick={handleGuardarClick} disabled={juego.intentos === 0 || juego.puntosAcomulados >= 25}>
                                Responder
                            </button>
                            <div className="col-md-6 columna text-center">
                                <button className="boton boton-siguiente" onClick={handleSiguienteClick}>Siguiente</button>
                            </div>
                            <div className="col-md columnana text-center">
                                <button className="boton boton-regresar" onClick={() => navigate("/Nivel2Leche")}>Regresar</button>
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
