import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import ContextApp from '../Models/Contexto';
import Logo from '../Logo/alfa.jpg';

const Navbar = () => {
  const { cambiar, bandera, nombre, rol, nombreUsuario, apellidoPaterno, apellidoMaterno } = useContext(ContextApp);
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const toggleNav = () => {
    setIsActive(!isActive);
  };

  const cerrarSesion = () => {
    cambiar(false, '---', '---', '---', '---', '---', '---');
    navigate('/');
  };

  return (
    <>
      <nav className="navbar navbar-expand-sm bg-dark navbar-primary">
        <img src={Logo} alt="Logo" width="200" height="69" />
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="">{nombre} {apellidoPaterno} {apellidoMaterno}</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="">{rol}</a>
            </li>
            {rol === 'Alumno' && (
              <li className="nav-item">
                <Link to="/Seleccion" className="nav-link">Inicio</Link>
              </li>
            )}
            {rol === 'Administrador' && (
              <li className="nav-item">
                <Link to="/MenuPrincipal" className="nav-link">Inicio</Link>
              </li>
            )}
            {rol == 'Alumno' && (
              <li className='nav-item'>
                <Link to='/Grafica' className='nav-link'>Avances</Link>
              </li>)}
            <li className="nav-item">
              <a onClick={cerrarSesion} className="nav-link" style={{ cursor: 'pointer' }}>
                Cerrar Sesión
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;