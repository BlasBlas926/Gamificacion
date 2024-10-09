export interface IJuego {
    id?: string;
    nombre: string;
    dificultad: string;
    puntosAcomulados: number;
    retroalimentacion: string;
    intentos: number;
    porcentaje?: number;
    palabra: string[];
    usuarioId?: string;
    
}