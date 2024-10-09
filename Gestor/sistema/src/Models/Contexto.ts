import React from 'react';

interface IContextApp {
    id: string;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    nombreUsuario: string;
    bandera: boolean;
    rol: string;
  
    cambiar: (bandera: boolean, nombre: string, rol: string, nombreUsuario: string, id: string, apellidoMaterno: string, apellidoPaterno: string) => void;
    isLoading: boolean;
}

const ContextApp = React.createContext<IContextApp>({
    id: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    bandera: false,
    rol: '',
    nombreUsuario: '',
    cambiar: () => { },
    isLoading: true,
});

export default ContextApp;
