import React, { useContext, useState } from 'react';
import ContextApp from '../Models/Contexto';
import { IUsuario } from './IUsuario';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export const IniciarSesion = () => {
  const { cambiar } = useContext(ContextApp);
  const [error, setError] = useState(false);
  const usuarioInicial: IUsuario = {
    nombreUsuario: '',
    pwd: '',
    rol: ''
  };


  const [usuario, setUsuario] = useState<IUsuario>(usuarioInicial);
  const navigate = useNavigate();

  const validaciones = Yup.object({
    nombreUsuario: Yup.string().required("El nombre de usuario es requerido").max(100, "Máximo 100 caracteres").min(4, "Mínimo 4 caracteres"),
    pwd: Yup.string().required("La contraseña es requerida").max(20, "Máximo 20 caracteres").min(4, "Mínimo 4 caracteres"),
  });

  const Validar = async (usuario: IUsuario) => {
    try {
      const respuesta = await fetch("https://localhost:7034/InicioSesion/ValidarUsuario", {
        method: "post",
        body: JSON.stringify(usuario),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      const data = await respuesta.json();

      console.log('Respuesta de la API:', data);

      if (data.nombre && data.rol && data.nombreUsuario && data.id && data.apellidoMaterno && data.apellidoPaterno){
        cambiar(true, data.nombre, data.rol, data.nombreUsuario, data.id, data.apellidoMaterno, data.apellidoPaterno)
        setError(false);
        if (data.rol === 'Administrador') {
          navigate('/MenuPrincipal');
        }
      } else {
        console.error('Datos del usuario incompletos en la respuesta de la API');
        setError(true);
      }
    } catch (error) {
      console.error('Error al validar el usuario:', error);
      setError(true);
    }
  }

  return (
    <div className="container-xxl">
      <div className="authentication-wrapper authentication-basic container-p-y">
        <div className="authentication-inner">

          <div className="card">
            <div className="card-body">
              <h4 className="mb-2">Bienvenido a Gamificación</h4>
              <p className="mb-4">Inicie sesión</p>
              <Formik
                initialValues={usuario}
                onSubmit={async (values, { setSubmitting }) => {
                  await Validar(values);
                  setSubmitting(false);
                }}
                validationSchema={validaciones}
              >
                <Form>
                  {error && <p className="text-danger">Usuario o contraseña incorrectos</p>}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Usuario</label>
                    <Field
                      type="text"
                      className="form-control"
                      id="email"
                      name="nombreUsuario"
                      placeholder="Ingrese su usuario"
                      autoFocus
                    />
                    <ErrorMessage name="nombreUsuario" component="div" className="text-danger" />
                  </div>
                  <div className="mb-3 form-password-toggle">
                    <div className="d-flex justify-content-between">
                      <label className="form-label" htmlFor="password">Contraseña</label>
                      <NavLink to="/Recuperacion">
                        <small>Olvidó su contraseña?</small>
                      </NavLink>
                    </div>
                    <div className="input-group input-group-merge form-password-toggle">
                      <Field
                        type="password"
                        className="form-control form-control-merge"
                        id="password"
                        name="pwd"
                        placeholder="Ingrese su contraseña"
                      />
                      <span className="input-group-text cursor-pointer"><i className="bx bx-hide"></i></span>
                    </div>
                    <ErrorMessage name="pwd" component="div" className="text-danger" />
                  </div>

                  <div className="mb-3">
                    <button type="submit" className="btn btn-dark d-grid w-100">Iniciar sesión</button>
                  </div>
                </Form>
              </Formik>
              <p className="text-center">
                <span>¿Aún no tienes cuenta?</span>
                <NavLink to="/Registrar">
                  <span>Crear cuenta</span>
                </NavLink>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
