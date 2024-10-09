using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Gamificacion.Models;
using MongoDB.Driver;

namespace Gamificacion.Services
{
    public class Servicios : IServicios
    {
        MongoClient cliente;
        IMongoDatabase db;
        IMongoCollection<Usuario> user;

        IMongoCollection<Juego> juego;

        public Servicios()
        {
            cliente = new MongoClient("mongodb+srv://blasblas92:blasblas5q@cluster0.x2f056t.mongodb.net/Gamificacion");
            db = cliente.GetDatabase("Gamificacion");
            user = db.GetCollection<Usuario>("Usuarios");
            juego = db.GetCollection<Juego>("Juegos");
        }

        //---------------------Inicio Sesion----------------------------------------------
        public Usuario ValidarUsuario(Usuario u)
        {
            Usuario usuario = user.Find(x => x.NombreUsuario == u.NombreUsuario && x.Pwd == u.Pwd).FirstOrDefault();
            return usuario;
        }



        public bool RegistrarUsuario(Usuario u)
        {
            bool resultado = false;
            try
            {
                user.InsertOne(u);
                resultado = true;
            }
            catch (System.Exception)
            {
                throw;
            }
            return resultado;
        }

        public bool ExisteNombreUsuario(string nombreUsuario)
        {
            return user.Find(x => x.NombreUsuario == nombreUsuario).Any();
        }
        // ------------------Usuarios------------------
        public Usuario ObtenerUsuario(string id)
        {
            Usuario usuario = user.Find(x => x.Id == id).FirstOrDefault();
            return usuario;
        }
        public bool EliminarUsuario(string id)
        {
            bool resultado = false;
            try
            {
                user.DeleteOne(ant => ant.Id == id);
                resultado = true;
            }
            catch (System.Exception)
            {
                throw;
            }
            return resultado;
        }
        public bool ActualizarUsuario(Usuario u)
        {
            bool resultado = false;
            try
            {
                user.ReplaceOne(ant => ant.Id == u.Id, u);
                resultado = true;
            }
            catch (System.Exception)
            {
                throw;
            }
            return resultado;
        }
        public List<Usuario> ObtenerTodosLosUsuarios()
        {
            return user.Find(usuario => true).ToList();
        }
        //------------------Juegos------------------
        public bool ActualizarJuego(Juego j)
        {
            bool resultado = false;
            try
            {
                juego.ReplaceOne(ant => ant.Id == j.Id, j);
                resultado = true;
            }
            catch (System.Exception)
            {
                throw;
            }
            return resultado;
        }
        public bool EliminarJuego(string Id)
        {
            bool resultado = false;
            try
            {
                juego.DeleteOne(ant => ant.Id == Id);
                resultado = true;
            }
            catch (System.Exception)
            {
                throw;
            }
            return resultado;
        }
        public string? InsertarJuego(Juego j)
        {
            string? idJuegoInsertado = null;
            try
            {
                juego.InsertOne(j);
                idJuegoInsertado = j.Id;
            }
            catch (System.Exception)
            {
                // Puedes manejar la excepción aquí si es necesario
            }
            return idJuegoInsertado;
        }

        public List<Juego> ObtenerJuegos()
        {
            List<Juego> juegos = juego.Find(x => true).ToList();
            return juegos;
        }
        public List<Juego> ObtenerJuegosPorUsuario(string usuarioId)
        {
            return juego.Find(j => j.UsuarioId == usuarioId).ToList();
        }
        public Juego ObtenerJuegoPorId(string id)
        {
            Juego juego = this.juego.Find(x => x.Id == id).FirstOrDefault();
            return juego;
        }
        public Juego ObtenerJuegoPorIdUsuario(string usuarioId, string id)
        {
            Juego juego = this.juego.Find(x => x.UsuarioId == usuarioId && x.Id == id).FirstOrDefault();
            return juego;
        }
    }
}