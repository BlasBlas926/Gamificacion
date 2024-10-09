import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ContextApp from "../Models/Contexto";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { bandera } = useContext(ContextApp);

  const handleGoBack = () => {
    navigate(-1); // Regresa a la página anterior
  };

  return (
    <div className="container-xxl container-p-y">
      <div className="misc-wrapper">
        {bandera ? (
          <h2 className="mb-2 mx-2">Página no encontrada para usuarios autenticados</h2>
        ) : (
          <h2 className="mb-2 mx-2">Página no encontrada</h2>
        )}
        <p className="mb-4 mx-2">
          {bandera
            ? "Lo sentimos, la URL solicitada no se encontró en este servidor para usuarios autenticados."
            : "Oops! 😖 La URL solicitada no se encontró en este servidor."}
        </p>
        <button onClick={handleGoBack} className="btn btn-primary">
          Regresar
        </button>
        <div className="mt-3">
          <img
            src="https://th.bing.com/th/id/OIP.aFdcaqODQm_PEmuyrL2XTAHaEL?pid=ImgDet&rs=1"
            alt="page-misc-error-light"
            width="500"
            className="img-fluid"
            data-app-dark-img="illustrations/page-misc-error-dark.png"
            data-app-light-img="illustrations/page-misc-error-light.png"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
