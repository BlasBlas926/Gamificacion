import { IUsuario } from "../Inicio/IUsuario";
import { IJuego } from "./IJuego";

export interface IProgreso {
    id?: string;
    usuario: IUsuario | string | null | undefined;
    juego: IJuego | null | undefined;
    porcentaje: number;
  }