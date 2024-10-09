using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Gamificacion.Models;

namespace Gamificacion.Services
{
    public interface IServicios
    {
        //-----------------Inicio Sesion----------
        Usuario ValidarUsuario(Usuario u);
        bool RegistrarUsuario(Usuario u);
         bool ExisteNombreUsuario(string nombreUsuario);
        // Métodos para usuarios
        Usuario ObtenerUsuario(string id);
        bool ActualizarUsuario(Usuario u);
        bool EliminarUsuario(string id);
        List<Usuario> ObtenerTodosLosUsuarios();

        // //-----------------Juego-----------------
        string? InsertarJuego(Juego j);
        List<Juego> ObtenerJuegos();
        bool ActualizarJuego(Juego j);
        bool EliminarJuego(string Id);

        Juego ObtenerJuegoPorId(string id);
        List<Juego> ObtenerJuegosPorUsuario(string usuarioId);

        Juego ObtenerJuegoPorIdUsuario(string usuarioId, string id);
    }
}