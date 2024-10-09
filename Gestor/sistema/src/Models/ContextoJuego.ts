import React from 'react';
import { IJuego } from '../Juegos/IJuego';

interface IJuegoContext {
    juego: IJuego | null;
    setJuego: (juego: IJuego | null) => void;
}

const JuegoContext = React.createContext<IJuegoContext>({
    juego: null,
    setJuego: () => {},
});

export default JuegoContext;