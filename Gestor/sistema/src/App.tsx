import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Outlet, Route, Routes, BrowserRouter, useNavigate } from "react-router-dom";
import ContextApp from './Models/Contexto';
import './App.css';
import { IniciarSesion } from './Inicio/IniciarSesion';
import Registrar from './Inicio/Registrar';
import { Bienvenida } from './Bienvenida/Bienvenida';
import NotFound from './ERROR/NotFound';
import Seleccion from './Palabras/Seleccion';
import { Menuprincipal } from './MenuAdmin/MenuPrincipal';


import { Nivel1Pala } from './Pala/Nivel1';
import { Nivel2Pala } from './Pala/Nivel2';
import { Nivel3Pala } from './Pala/Nivel3';

import { Nivel1Piñata } from './Piñata/Nivel1';
import { Nivel2Piñata } from './Piñata/Nivel2';
import { Nivel3Piñata } from './Piñata/Nivel3';

import { Nivel1Familia } from './Familia/Nivel1';
import { Nivel2Familia } from './Familia/Nivel2';
import { Nivel3Familia } from './Familia/Nivel3';

import { Nivel1Basura } from './Basura/Nivel1';
import { Nivel2Basura } from './Basura/Nivel2';
import { Nivel3Basura } from './Basura/Nivel3';

import { Nivel1Medicina } from './Medicina/Nivel1';
import { Nivel2Medicina } from './Medicina/Nivel2';
import { Nivel3Medicina } from './Medicina/Nivel3';

import { Nivel1Casa } from './Casa/Nivel1';
import { Nivel2Casa } from './Casa/Nivel2';
import { Nivel3Casa } from './Casa/Nivel3';

import { Nivel1Vacuna } from './Vacuna/Nivel1';
import { Nivel2Vacuna } from './Vacuna/Nivel2';
import { Nivel3Vacuna } from './Vacuna/Nivel3';

import { Nivel1Cantina } from './Cantina/Nivel1';
import { Nivel2Cantina } from './Cantina/Nivel2';
import { Nivel3Cantina } from './Cantina/Nivel3';

import { Nivel1Mercado } from './Mercado/Nivel1';
import { Nivel2Mercado } from './Mercado/Nivel2';
import { Nivel3Mercado } from './Mercado/Nivel3';

import { Nivel1Trabajo } from './Trabajo/Nivel1';
import { Nivel2Trabajo } from './Trabajo/Nivel2';
import { Nivel3Trabajo } from './Trabajo/Nivel3';

import { Nivel1Tortilla } from './Tortilla/Nivel1';
import { Nivel2Tortilla } from './Tortilla/Nivel2';
import { Nivel3Tortilla } from './Tortilla/Nivel3';

import { Nivel1Leche } from './Leche/Nivel1';
import { Nivel2Leche } from './Leche/Nivel2';
import { Nivel3Leche } from './Leche/Nivel3';

import { Nivel1Guitarra } from './Guitarra/Nivel1';
import { Nivel2Guitarra } from './Guitarra/Nivel2';
import { Nivel3Guitarra } from './Guitarra/Nivel3';

import { Nivel1Mexico } from './Mexico/Nivel1';
import { Nivel2Mexico } from './Mexico/Nivel2';
import { Nivel3Mexico } from './Mexico/Nivel3';
import Grafica from './Grafica/Grafica';
import withAuth from './Rutas/PrivateRoute';
import { IJuego } from './Juegos/IJuego';
import Manual from './Manual/Manual';
import Respuestas from './Respuestas/Respuestas';


function App() {
  const [nombre, setNombre] = useState<string>('---')
  const [bandera, setBandera] = useState<boolean>(false)
  const [rol, setRol] = useState<string>('---')
  const [nombreUsuario, setNombreUsuario] = useState<string>('---')
  const [id, setId] = useState<string>('---');
  const [apellidoMaterno, setApellidoMaterno] = useState<string>('---')
  const [apellidoPaterno, setApellidoPaterno] = useState<string>('---')
  const [juego, setJuego] = useState<IJuego | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  // Rest of the code...



  useEffect(() => {
    const session = localStorage.getItem('session');
    if (session) {
      const { nombre, bandera, rol, nombreUsuario, id, apellidoPaterno, apellidoMaterno } = JSON.parse(session);
      setNombre(nombre);
      setBandera(bandera);
      setRol(rol);
      setNombreUsuario(nombreUsuario);
      setId(id);
      setApellidoPaterno(apellidoPaterno);
      setApellidoMaterno(apellidoMaterno);
    }
    setIsLoading(false);
  }, []);

  function cambiar(b: boolean, n: string, r: string, nombreUsuario: string, id: string, apellidoMaterno: string, apellidoPaterno: string) {
    setNombre(n);
    setBandera(b);
    setRol(r);
    setNombreUsuario(nombreUsuario);
    setId(id);
    setApellidoPaterno(apellidoPaterno);
    setApellidoMaterno(apellidoMaterno);


    localStorage.setItem('session', JSON.stringify({ nombre: n, bandera: b, rol: r, nombreUsuario: nombreUsuario, id: id, apellidoMaterno: apellidoMaterno, apellidoPaterno: apellidoPaterno }));
  }
  const ProtectedMenuPrincipal = withAuth(Menuprincipal);
  const protectedBienvenida = withAuth(Bienvenida);

  const ProtectedNivel1Pala = withAuth(Nivel1Pala);
  const ProtectedNivel2Pala = withAuth(Nivel2Pala);
  const ProtectedNivel3Pala = withAuth(Nivel3Pala);
  // Haz lo mismo para todos tus otros componentes...
  const ProtectedNivel1Piñata = withAuth(Nivel1Piñata);
  const ProtectedNivel2Piñata = withAuth(Nivel2Piñata);
  const ProtectedNivel3Piñata = withAuth(Nivel3Piñata);

  const ProtectedNivel1Familia = withAuth(Nivel1Familia);
  const ProtectedNivel2Familia = withAuth(Nivel2Familia);
  const ProtectedNivel3Familia = withAuth(Nivel3Familia);

  const ProtectedNivel1Basura = withAuth(Nivel1Basura);
  const ProtectedNivel2Basura = withAuth(Nivel2Basura);
  const ProtectedNivel3Basura = withAuth(Nivel3Basura);

  const ProtectedNivel1Medicina = withAuth(Nivel1Medicina);
  const ProtectedNivel2Medicina = withAuth(Nivel2Medicina);
  const ProtectedNivel3Medicina = withAuth(Nivel3Medicina);

  const ProtectedNivel1Casa = withAuth(Nivel1Casa);
  const ProtectedNivel2Casa = withAuth(Nivel2Casa);
  const ProtectedNivel3Casa = withAuth(Nivel3Casa);

  const ProtectedNivel1Vacuna = withAuth(Nivel1Vacuna);
  const ProtectedNivel2Vacuna = withAuth(Nivel2Vacuna);
  const ProtectedNivel3Vacuna = withAuth(Nivel3Vacuna);

  const ProtectedNivel1Cantina = withAuth(Nivel1Cantina);
  const ProtectedNivel2Cantina = withAuth(Nivel2Cantina);
  const ProtectedNivel3Cantina = withAuth(Nivel3Cantina);

  const ProtectedNivel1Mercado = withAuth(Nivel1Mercado);
  const ProtectedNivel2Mercado = withAuth(Nivel2Mercado);
  const ProtectedNivel3Mercado = withAuth(Nivel3Mercado);

  const ProtectedNivel1Trabajo = withAuth(Nivel1Trabajo);
  const ProtectedNivel2Trabajo = withAuth(Nivel2Trabajo);
  const ProtectedNivel3Trabajo = withAuth(Nivel3Trabajo);

  const ProtectedNivel1Tortilla = withAuth(Nivel1Tortilla);
  const ProtectedNivel2Tortilla = withAuth(Nivel2Tortilla);
  const ProtectedNivel3Tortilla = withAuth(Nivel3Tortilla);

  const ProtectedNivel1Leche = withAuth(Nivel1Leche);
  const ProtectedNivel2Leche = withAuth(Nivel2Leche);
  const ProtectedNivel3Leche = withAuth(Nivel3Leche);

  const ProtectedNivel1Guitarra = withAuth(Nivel1Guitarra);
  const ProtectedNivel2Guitarra = withAuth(Nivel2Guitarra);
  const ProtectedNivel3Guitarra = withAuth(Nivel3Guitarra);

  const ProtectedNivel1Mexico = withAuth(Nivel1Mexico);
  const ProtectedNivel2Mexico = withAuth(Nivel2Mexico);
  const ProtectedNivel3Mexico = withAuth(Nivel3Mexico);

  const ProtectedSeleccion = withAuth(Seleccion);

  const ProtectedGrafica = withAuth(Grafica);

  const ProtectedRespuestas = withAuth(Respuestas);

  const ProtectedManual = withAuth(Manual);


  return (
    <div className="App">
      <>
        <BrowserRouter>
          <ContextApp.Provider value={{ nombre, bandera, rol, nombreUsuario, id, apellidoPaterno, apellidoMaterno, cambiar, isLoading }}>
              <Routes>
                <Route path='/Registrar' element={<Registrar />}></Route>


                <Route path="/" element={bandera ? <Bienvenida /> : <IniciarSesion />} />


                {/* Niveles de pala */}
                <Route path='/Nivel1Pala' element={<ProtectedNivel1Pala />}></Route>
                <Route path='/Nivel2Pala' element={<ProtectedNivel2Pala />}></Route>
                <Route path='/Nivel3Pala' element={<ProtectedNivel3Pala />}></Route>


                {/* Niveles de piñata */}
                <Route path='/Nivel1Piñata' element={<ProtectedNivel1Piñata />}></Route>
                <Route path='/Nivel2Piñata' element={<ProtectedNivel2Piñata />}></Route>
                <Route path='/Nivel3Piñata' element={<ProtectedNivel3Piñata />}></Route>

                {/* Niveles de familia */}
                <Route path='/Nivel1Familia' element={<ProtectedNivel1Familia />}></Route>
                <Route path='/Nivel2Familia' element={<ProtectedNivel2Familia />}></Route>
                <Route path='/Nivel3Familia' element={<ProtectedNivel3Familia />}></Route>

                {/* Niveles de basura */}
                <Route path='/Nivel1Basura' element={<ProtectedNivel1Basura />}></Route>
                <Route path='/Nivel2Basura' element={<ProtectedNivel2Basura />}></Route>
                <Route path='/Nivel3Basura' element={<ProtectedNivel3Basura />}></Route>

                {/* Niveles de medicina */}
                <Route path='/Nivel1Medicina' element={<ProtectedNivel1Medicina />}></Route>
                <Route path='/Nivel2Medicina' element={<ProtectedNivel2Medicina />}></Route>
                <Route path='/Nivel3Medicina' element={<ProtectedNivel3Medicina />}></Route>

                {/* Niveles de casa */}
                <Route path='/Nivel1Casa' element={<ProtectedNivel1Casa />}></Route>
                <Route path='/Nivel2Casa' element={<ProtectedNivel2Casa />}></Route>
                <Route path='/Nivel3Casa' element={<ProtectedNivel3Casa />}></Route>

                {/* Niveles de vacuna */}
                <Route path='/Nivel1Vacuna' element={<ProtectedNivel1Vacuna />}></Route>
                <Route path='/Nivel2Vacuna' element={<ProtectedNivel2Vacuna />}></Route>
                <Route path='/Nivel3Vacuna' element={<ProtectedNivel3Vacuna />}></Route>

                {/* Niveles de cantina */}
                <Route path='/Nivel1Cantina' element={<ProtectedNivel1Cantina />}></Route>
                <Route path='/Nivel2Cantina' element={<ProtectedNivel2Cantina />}></Route>
                <Route path='/Nivel3Cantina' element={<ProtectedNivel3Cantina />}></Route>

                {/* Niveles de mercado */}
                <Route path='/Nivel1Mercado' element={<ProtectedNivel1Mercado />}></Route>
                <Route path='/Nivel2Mercado' element={<ProtectedNivel2Mercado />}></Route>
                <Route path='/Nivel3Mercado' element={<ProtectedNivel3Mercado />}></Route>

                {/* Niveles de trabajo */}
                <Route path='/Nivel1Trabajo' element={<ProtectedNivel1Trabajo />}></Route>
                <Route path='/Nivel2Trabajo' element={<ProtectedNivel2Trabajo />}></Route>
                <Route path='/Nivel3Trabajo' element={<ProtectedNivel3Trabajo />}></Route>

                {/* Niveles de tortilla */}
                <Route path='/Nivel1Tortilla' element={<ProtectedNivel1Tortilla />}></Route>
                <Route path='/Nivel2Tortilla' element={<ProtectedNivel2Tortilla />}></Route>
                <Route path='/Nivel3Tortilla' element={<ProtectedNivel3Tortilla />}></Route>

                {/* Niveles de leche */}
                <Route path='/Nivel1Leche' element={<ProtectedNivel1Leche />}></Route>
                <Route path='/Nivel2Leche' element={<ProtectedNivel2Leche />}></Route>
                <Route path='/Nivel3Leche' element={<ProtectedNivel3Leche />}></Route>

                {/* Niveles de guitarra */}
                <Route path='/Nivel1Guitarra' element={<ProtectedNivel1Guitarra />}></Route>
                <Route path='/Nivel2Guitarra' element={<ProtectedNivel2Guitarra />}></Route>
                <Route path='/Nivel3Guitarra' element={<ProtectedNivel3Guitarra />}></Route>

                {/* Niveles de mexico */}
                <Route path='/Nivel1Mexico' element={<ProtectedNivel1Mexico />}></Route>
                <Route path='/Nivel2Mexico' element={<ProtectedNivel2Mexico />}></Route>
                <Route path='/Nivel3Mexico' element={<ProtectedNivel3Mexico />}></Route>
                <Route path='/Grafica' element={<ProtectedGrafica />}></Route>

                <Route path='*' element={<NotFound />} />
                <Route path='/Seleccion' element={<ProtectedSeleccion />}></Route>

                <Route path='/MenuPrincipal' element={<ProtectedMenuPrincipal />}></Route>
                <Route path='/Manual' element={<ProtectedManual />}></Route>
                <Route path='/Respuestas' element={<ProtectedRespuestas />}></Route>
              </Routes>
          </ContextApp.Provider>
        </BrowserRouter>
      </>
    </div>
  );
}

export default App;
