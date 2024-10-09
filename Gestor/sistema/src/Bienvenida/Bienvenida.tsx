import React, { useContext, useState, useEffect } from 'react';
import ContextApp from '../Models/Contexto';
import './Bienvenida.css'; // Agrega un archivo CSS personalizado
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Logo/alfa.jpg';


export const Bienvenida = () => {
  const { cambiar, bandera, nombre, rol, } = useContext(ContextApp);
  const navigate = useNavigate();

  useEffect(() => {
    // Si el usuario no es un alumno...
    if (rol !== 'Alumno') {
      // Redirige al usuario a la página de inicio
      navigate('/MenuPrincipal');
    }
  }, [navigate, rol]);

  return (
    <div className="welcome-container">
      {/* Aplica la clase de estilo a la imagen */}
      <img src={Logo} alt="Logo" className="welcome-image" />
      <Link to="./Seleccion" className="btn btn-primary">
        Iniciar
      </Link>
    </div>
  );
};