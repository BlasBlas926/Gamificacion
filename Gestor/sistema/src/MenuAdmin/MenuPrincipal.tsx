import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ContextApp from '../Models/Contexto';
import Navbar from '../Shared/Navbar';
import { useNavigate, useLocation } from 'react-router-dom';
import { IUsuario } from '../Inicio/IUsuario';
import './MenuPrincipal.css';

export const Menuprincipal = () => {
  const { cambiar, bandera, nombre, rol } = useContext(ContextApp);
  const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); // Cambiado a 3 elementos por página
  const [editingUser, setEditingUser] = useState<IUsuario | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [bgColor, setBgColor] = useState('');


  useEffect(() => {
    if (!bandera || rol !== 'Administrador') {
      navigate('/');
    }
  }, [bandera, rol, navigate]);

  useEffect(() => {
    const table = document.querySelector('.styled-table') as HTMLElement;
    const randomColor = 'rgb(' +
      Math.floor(Math.random() * 256) + ',' +
      Math.floor(Math.random() * 256) + ',' +
      Math.floor(Math.random() * 256) + ')';
    if (table) {
      table.style.backgroundColor = randomColor;
    }
  });

  useEffect(() => {
    // ... (resto del código)

    return () => {
      window.onpopstate = null;
    };
  }, [navigate, rol, location.pathname]);

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const response = await axios.get('https://localhost:7034/InicioSesion/ObtenerTodosLosUsuarios');
      setUsuarios(response.data);
    } catch (error) {
      console.error('Hubo un error al obtener los datos de los usuarios:', error);
    }
  };

  const filteredUsers = usuarios.filter((usuario) =>
    usuario.nombreUsuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.apellidoPaterno?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.apellidoMaterno?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.pwd?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleUpdate = async (usuario: IUsuario) => {
    if (editingUser && editingUser.nombreUsuario === usuario.nombreUsuario) {
      try {
        await axios.put(`https://localhost:7034/InicioSesion/ActualizarUsuario/${usuario.id}`, editingUser);
        console.log(`Actualizar usuario: ${usuario.nombreUsuario}`);
        obtenerUsuarios();
        setEditingUser(null);
      } catch (error) {
        console.error('Error al actualizar el usuario:', error);
      }
    } else {
      setEditingUser(usuario);
    }
  };

  const handleDelete = async (usuario: IUsuario) => {
    try {
      await axios.delete(`https://localhost:7034/InicioSesion/EliminarUsuario/${usuario.id}`);
      console.log(`Eliminar usuario: ${usuario.nombreUsuario}`);
      obtenerUsuarios();
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <input
          type="text"
          placeholder="Buscar..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <table className="styled-table">
          <thead>
            <tr>
              <th>Nombre de usuario</th>
              <th>Nombre</th>
              <th>Apellido Paterno</th>
              <th>Apellido Materno</th>
              <th>Email</th>
              <th>Contraseña</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((usuario) => (
              <tr key={usuario.nombreUsuario}>
                <td>{usuario.nombreUsuario}</td>

                <td>
                  {editingUser && editingUser.nombreUsuario === usuario.nombreUsuario ? (
                    <input
                      type="text"
                      value={editingUser.nombre ?? ''}
                      onChange={(e) => setEditingUser({ ...editingUser, nombre: e.target.value })}
                    />
                  ) : (
                    usuario.nombre
                  )}
                </td>

                <td>
                  {editingUser && editingUser.nombreUsuario === usuario.nombreUsuario ? (
                    <input
                      type="text"
                      value={editingUser.apellidoPaterno ?? ''}
                      onChange={(e) => setEditingUser({ ...editingUser, apellidoPaterno: e.target.value })}
                    />
                  ) : (
                    usuario.apellidoPaterno
                  )}
                </td>

                <td>
                  {editingUser && editingUser.nombreUsuario === usuario.nombreUsuario ? (
                    <input
                      type="text"
                      value={editingUser.apellidoMaterno ?? ''}
                      onChange={(e) => setEditingUser({ ...editingUser, apellidoMaterno: e.target.value })}
                    />
                  ) : (
                    usuario.apellidoMaterno
                  )}
                </td>

                <td>
                  {editingUser && editingUser.nombreUsuario === usuario.nombreUsuario ? (
                    <input
                      type="text"
                      value={editingUser.email ?? ''}
                      onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    />
                  ) : (
                    usuario.email ?? 'N/A'
                  )}
                </td>

                <td>
                  {editingUser && editingUser.nombreUsuario === usuario.nombreUsuario ? (
                    <input
                      type="password"
                      value={editingUser.pwd ?? ''}
                      onChange={(e) => setEditingUser({ ...editingUser, pwd: e.target.value })}
                    />
                  ) : (
                    '******'
                  )}
                </td>

                <td>
                  <div className="action-button-container">
                    <button className="action-button" onClick={() => handleUpdate(usuario)}>
                      {editingUser && editingUser.nombreUsuario === usuario.nombreUsuario
                        ? 'Guardar' : 'Actualizar'}
                    </button>
                    <button className="action-button" onClick={() => handleDelete(usuario)}>
                      Eliminar
                    </button>
                  </div>

                </td>
              </tr>
            ))}
          </tbody>
          {/* Paginación */}
          <tfoot>
            <tr>
              <td colSpan={7}>
                <div className="pagination">
                  {Array.from({ length: Math.ceil(filteredUsers.length / itemsPerPage) }, (_, index) => (
                    <button key={index + 1} onClick={() => paginate(index + 1)}>
                      {index + 1}
                    </button>
                  ))}
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>

  );
};
