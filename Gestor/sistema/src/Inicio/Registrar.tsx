import React, { useContext, useState } from 'react';
import ContextApp from '../Models/Contexto';
import { IUsuario } from './IUsuario';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { ErrorMessage, Form, Formik, Field } from 'formik';


const RegistrarUsuario = () => {
    const { cambiar } = useContext(ContextApp);
    const navegacion = useNavigate();
    const usuarioInicial: IUsuario = {
        nombreUsuario: '',
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        email: '',
        pwd: '',
        rol: 'Alumno',
    };
    const [usuario, setUsuario] = useState(usuarioInicial);
    const validaciones = Yup.object({
        nombreUsuario: Yup.string()
            .required('El nombre de usuario es requerido')
            .max(20, 'Máximo 10 caracteres')
            .min(3, 'Mínimo 3 caracteres')
            .test('no-groserias', 'El nombre de usuario contiene palabras no permitidas', function (value) {
                const palabrasProhibidas = ['groseria', 'groseria2']; // Agrega aquí las palabras prohibidas
                return !palabrasProhibidas.some(palabra => value.includes(palabra));
            }),
        nombre: Yup.string()
            .required('El nombre es requerido')
            .max(30, 'Máximo 30 caracteres')
            .min(3, 'Mínimo 3 caracteres'),
        apellidoPaterno: Yup.string()
            .required('El apellido paterno es requerido')
            .max(30, 'Máximo 30 caracteres')
            .min(3, 'Mínimo 3 caracteres'),
        apellidoMaterno: Yup.string()
            .required('El apellido materno es requerido')
            .max(30, 'Máximo 30 caracteres')
            .min(3, 'Mínimo 3 caracteres'),
        email: Yup.string()
            .required('El email es requerido')
            .email('El email debe ser válido'),
        pwd: Yup.string()
            .required('La contraseña es requerida')
            .max(20, 'Máximo 20 caracteres')
            .min(4, 'Mínimo 4 caracteres'),
    });
    const Registrar = async (usuario: IUsuario) => {
        try {
            // Primero, obtén todos los usuarios
            const respuestaUsuarios = await fetch(`https://localhost:7034/InicioSesion/ObtenerTodosLosUsuarios`);

            if (!respuestaUsuarios.ok) {
                alert('Error de conexión al obtener usuarios');
                return false;
            }

            const usuarios = await respuestaUsuarios.json();

            // Verifica si el nombre de usuario ya existe
            if (usuarios.some((u: IUsuario) => u.nombreUsuario === usuario.nombreUsuario)) {
                alert('El nombre de usuario ya existe');
                return false;
            }

            // Si el nombre de usuario no existe, procede a registrarlo
            const response = await fetch("https://localhost:7034/InicioSesion/RegistrarUsuario", {
                method: "post",
                body: JSON.stringify(usuario),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            });

            if (!response.ok) {
                throw new Error('Error al registrar el usuario');
            }

            alert('Usuario registrado con éxito');
            return true;
        } catch (error) {
            console.error('Error:', error);
            alert('Error de conexión al registrar el usuario');
            return false;
        }
    }

    return (
        <>
            <div className="container-xxl">
                <div className="authentication-wrapper authentication-basic container-p-y">
                    <div className="authentication-inner">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="mb-2">Bienvenido a Gamificación</h4>
                                <p className="mb-4">Registro de Usuario</p>
                                <Formik
                                    initialValues={usuario}
                                    onSubmit={async (values) => {
                                        const registroExitoso = await Registrar(values);
                                        if (registroExitoso) {
                                            navegacion("/");
                                        }
                                    }}
                                    validationSchema={validaciones}
                                >
                                    {({ touched, errors }) => (
                                        <Form>
                                            <div className="mb-3">
                                                <div className="row">
                                                    <div className="col">
                                                        <label htmlFor="nombreUsuario" className="form-label">Nombre de Usuario</label>
                                                        <Field
                                                            type="text"
                                                            name="nombreUsuario"
                                                            className={`form-control ${touched.nombreUsuario && errors.nombreUsuario ? 'is-invalid' : ''}`}
                                                        />
                                                        <ErrorMessage name="nombreUsuario" component="div" className="invalid-feedback" />
                                                    </div>
                                                    <div className="col">
                                                        <label htmlFor="nombre" className="form-label">Nombre</label>
                                                        <Field
                                                            type="text"
                                                            name="nombre"
                                                            className={`form-control ${touched.nombre && errors.nombre ? 'is-invalid' : ''}`}
                                                        />
                                                        <ErrorMessage name="nombre" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <div className="row">
                                                    <div className="col">
                                                        <label htmlFor="apellidoPaterno" className="form-label">Apellido Paterno</label>
                                                        <Field
                                                            type="text"
                                                            name="apellidoPaterno"
                                                            className={`form-control ${touched.apellidoPaterno && errors.apellidoPaterno ? 'is-invalid' : ''}`}
                                                        />
                                                        <ErrorMessage name="apellidoPaterno" component="div" className="invalid-feedback" />
                                                    </div>
                                                    <div className="col">
                                                        <label htmlFor="apellidoMaterno" className="form-label">Apellido Materno</label>
                                                        <Field
                                                            type="text"
                                                            name="apellidoMaterno"
                                                            className={`form-control ${touched.apellidoMaterno && errors.apellidoMaterno ? 'is-invalid' : ''}`}
                                                        />
                                                        <ErrorMessage name="apellidoMaterno" component="div" className="invalid-feedback" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="email" className="form-label">Email</label>
                                                <Field
                                                    type="text"
                                                    name="email"
                                                    className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                                                />
                                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="pwd" className="form-label">Contraseña</label>
                                                <Field
                                                    type="password"
                                                    name="pwd"
                                                    className={`form-control ${touched.pwd && errors.pwd ? 'is-invalid' : ''}`}
                                                />
                                                <ErrorMessage name="pwd" component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="mb-3">
                                                <button className="btn btn-dark d-grid w-100" type="submit">Registrar</button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                                <div className="mb-3">
                                    <NavLink to="/">
                                        <span>Ya tienes cuenta?</span>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


export default RegistrarUsuario;