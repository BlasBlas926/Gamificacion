using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Gamificacion.Models;
using Gamificacion.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Gamificacion.Controllers
{
    [ApiController]
    [Route("InicioSesion")]
    public class UsuarioController : ControllerBase
    {
        private IServicios servicios;
        public UsuarioController(IServicios servicios)
        {
            this.servicios = servicios;
        }
        [HttpPost("ValidarUsuario")]
        public IActionResult ValidarUsuario([FromBody] Usuario u)
        {
            Usuario respuesta = servicios.ValidarUsuario(u);
            return Ok(respuesta);

        }
        [HttpPost("RegistrarUsuario")]
        public IActionResult RegistrarUsuario([FromBody] Usuario u)
        {
            if (u.NombreUsuario == null)
            {
                return BadRequest("El nombre de usuario no puede ser nulo");
            }
            if (servicios.ExisteNombreUsuario(u.NombreUsuario))
            {
                return BadRequest("El nombre de usuario ya existe");
            }
            bool respuesta = servicios.RegistrarUsuario(u);
            return Ok(respuesta);
        }
        // Método para obtener un usuario
        [HttpGet("ObtenerUsuario/{id}")]
        public IActionResult ObtenerUsuario(string id)
        {
            Usuario respuesta = servicios.ObtenerUsuario(id);
            return Ok(respuesta);
        }

        // Método para actualizar un usuario
        [HttpPut("ActualizarUsuario/{id}")]
        public IActionResult ActualizarUsuario([FromBody] Usuario u)
        {
            bool respuesta = servicios.ActualizarUsuario(u);
            return Ok(respuesta);
        }

        // Método para eliminar un usuario
        [HttpDelete("EliminarUsuario/{id}")]
        public IActionResult EliminarUsuario(string id)
        {
            bool respuesta = servicios.EliminarUsuario(id);
            return Ok(respuesta);
        }

        [HttpGet("ObtenerTodosLosUsuarios")]
        public IActionResult ObtenerTodosLosUsuarios()
        {
            var usuarios = servicios.ObtenerTodosLosUsuarios();
            return Ok(usuarios);
        }
    }
}