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
    [Route("Juegos")]
    public class JuegoController : ControllerBase
    {
        private IServicios servicios;

        public JuegoController(IServicios servicios)
        {
            this.servicios = servicios;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var juegos = servicios.ObtenerJuegos();
            return Ok(juegos);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            var juego = servicios.ObtenerJuegoPorId(id);

            if (juego == null)
            {
                return NotFound();
            }

            return Ok(juego);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Juego j)
        {
            string? idJuegoInsertado = servicios.InsertarJuego(j);

            if (string.IsNullOrEmpty(idJuegoInsertado))
            {
                return BadRequest(); // Devuelve 400 si la inserción no fue exitosa
            }

            return Ok(new { IdJuego = idJuegoInsertado });
        }


        [HttpPut]
        public IActionResult Put([FromBody] Juego j)
        {
            bool respuesta = servicios.ActualizarJuego(j);
            return Ok(respuesta);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            bool respuesta = servicios.EliminarJuego(id);

            if (!respuesta)
            {
                return NotFound(); // Devuelve 404 si el juego no se encuentra
            }

            return Ok(respuesta);
        }

        [HttpGet("Usuario/{usuarioId}")]
        public IActionResult GetByUsuarioId(string usuarioId)
        {
            var juegos = servicios.ObtenerJuegosPorUsuario(usuarioId);
            return Ok(juegos);
        }
        [HttpGet("Usuario/{usuarioId}/{id}")]
        public IActionResult GetByUsuarioId(string usuarioId, string id)
        {
            var juego = servicios.ObtenerJuegoPorIdUsuario(usuarioId, id);

            if (juego == null)
            {
                return NotFound();
            }

            return Ok(juego);
        }
       
    }
}