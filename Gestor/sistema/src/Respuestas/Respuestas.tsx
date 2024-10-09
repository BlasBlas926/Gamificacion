// Respuestas.tsx
import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import ContextApp from "../Models/Contexto";
import { IJuego } from "../Juegos/IJuego";
import Navbar from "../Shared/Navbar";
import './Respuestas.css';

const Respuestas = () => {
    const { id } = useContext(ContextApp);
    const [juegos, setJuegos] = useState<IJuego[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchJuegos = async () => {
            try {
                const apiUrl = `https://localhost:7034/Juegos/Usuario/${id}`;
                const response = await axios.get(apiUrl);
                setJuegos(response.data);
            } catch (error) {
                setError('Error al obtener los datos de la API: ' + error);
            }
        }

        fetchJuegos();
    }, [id]);

    return (
        <>
            <Navbar />
            <div className="respuestas-container">
                <h1>Respuestas</h1>
                {error && <p className="error-message">{error}</p>}
                <div className="content">
                    {juegos.length > 0 ? (
                        juegos.map((juego, index) => (
                            <div key={index} className="juego">
                                <h2>{juego.nombre}</h2>
                                <p>Dificultad: {juego.dificultad}</p>
                                <p>Puntos acumulados: {juego.puntosAcomulados}</p>
                                <p>Retroalimentación: {juego.retroalimentacion}</p>
                                <p>Intentos: {juego.intentos}</p>
                                <p>Porcentaje: {juego.porcentaje}</p>
                                <p>Palabras: {juego.palabra ? juego.palabra.join(', ') : 'No hay palabras'}</p>
                            </div>
                        ))
                    ) : null}
                </div>
                {juegos.length === 0 && <p className="sin-respuestas">Sin respuestas</p>}
            </div>
        </>
    );
}
export default Respuestas;
