import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Logo/alfa.jpg';

import './Navbar1.css';
import ContextApp from '../Models/Contexto';



const palabras = ["Pala", "Piñata", "Familia", "Basura", "Medicina", "Casa", "Vacuna", "Cantina",
    "Mercado", "Trabajo", "Tortilla", "Leche", "Guitarra", "México"];


const palabraLinks = palabras.map((palabra, index) => (
    <Link
        key={index}
        to={
            palabra === "Pala" ? "/Nivel1Pala" :
                palabra === "Piñata" ? "/Nivel1Piñata" :
                    palabra === "Familia" ? "/Nivel1Familia" :
                        palabra === "Basura" ? "/Nivel1Basura" :
                            palabra === "Medicina" ? "/Nivel1Medicina" :
                                palabra === "Casa" ? "/Nivel1Casa" :
                                    palabra === "Vacuna" ? "/Nivel1Vacuna" :
                                        palabra === "Cantina" ? "/Nivel1Cantina" :
                                            palabra === "Mercado" ? "/Nivel1Mercado" :
                                                palabra === "Trabajo" ? "/Nivel1Trabajo" :
                                                    palabra === "Tortilla" ? "/Nivel1Tortilla" :
                                                        palabra === "Leche" ? "/Nivel1Leche" :
                                                            palabra === "Guitarra" ? "/Nivel1Guitarra" :
                                                                palabra === "México" ? "/Nivel1Mexico" :
                                                                    `/Palabras/${palabra}`
        }
        className="palabra-link"
    >
        {palabra}
    </Link>
));

const Seleccion = () => {
    const { cambiar, nombre, apellidoPaterno, apellidoMaterno } = useContext(ContextApp);
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate();

    const cerrarSesion = () => {
        cambiar(false, '---', '---', '---', '---', '---', '---');
        navigate('/');
    }
    return (
        <>
            <div className="dashboard-wrapper">
                <div className="sidebar">
                    <div className="sidebar-logo">
                        <img src={Logo} alt="logo" style={{ width: '250px', height: 'auto' }} />

                        <div className="sidebar-header">
                            <h2>Gamificación</h2>
                        </div>
                        <div className="sidebar-user">
                            <p>{nombre} {apellidoPaterno} {apellidoMaterno}</p>
                        </div>
                        <ul className="sidebar-menu">
                            <li className="sidebar-item">
                                <a href="/Seleccion">
                                    Inicio
                                </a>
                            </li>
                            <li className="sidebar-item">
                                <a href="/Manual">
                                    Instrucciones
                                </a>
                            </li>
                            <li className="sidebar-item">
                                <a href="/Grafica">
                                    Avance
                                </a>
                            </li>
                            <li className="sidebar-item">
                                <a href="/Respuestas">
                                    Respuestas
                                </a>
                            </li>
                            <li onClick={cerrarSesion} className="sidebar-item">
                                <a href="/">
                                    Cerrar Sesión
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="main-content">
                    <div className="header">
                        <h1>Menú principal</h1>
                    </div>

                    <div className="seleccion-container">
                        <div className="seleccion-content">
                            <h1 className="seleccion-title">¡Selecciona una opción!</h1>
                            <p className="seleccion-text">Elige una palabra:</p>

                            <div className="palabras-container">
                                {palabraLinks}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Seleccion;
