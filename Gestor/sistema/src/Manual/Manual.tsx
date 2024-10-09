import React from 'react'
import Navbar from '../Shared/Navbar'
import Logo from '../Img/Juegos.png'

const Manual = () => {
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="mb-4">Instrucciones de uso</h1>
                        <p className="mb-4">Para poder utilizar el sistema de manera correcta, se debe seguir los siguientes pasos:</p>
                        <li className="mb-4">En este tipo de juegos se debe de escribir la primera letra en mayuscula</li>
                        <img src={Logo} alt="Logo" style={{ width: '400px', height: 'auto', marginBottom: '20px' }} />

                        <li className="mb-4">El navbar se encuentra en la parte superior de la página. Contiene el logo, el nombre de quien está logeado, el botón de cerrar sesión y el avance del usuario.</li>
                        <nav className="navbar navbar-dark bg-dark mini-navbar mb-4">
                            <a className="navbar-brand" href="#">Logo</a>
                            <div className="form-inline">
                                <span className="navbar-text mr-5 mb-3 pr-3">Usuario </span>
                                <a className="navbar-text mr-5 mb-3 pr-3" href="#">Rol </a>
                                <a className="navbar-text mr-5 mb-3 pr-3" href="#">Avance </a>
                                <a className="navbar-text mr-5 mb-3 pr-3" href="#">Cerrar sesión</a>
                            </div>
                        </nav>
                        <li className="mb-4">El botón de avance muestra el progreso del usuario en el juego.</li>
                        <li className="mb-4">El botón de cerrar sesión permite al usuario salir de su cuenta.</li>
                        <li className="mb-4">El botón de inicio redirige al usuario a la página de selección de palabras.</li>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Manual