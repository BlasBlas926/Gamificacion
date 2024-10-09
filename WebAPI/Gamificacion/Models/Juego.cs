using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Libmongocrypt;

namespace Gamificacion.Models
{
    public class Juego
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("nombre")]
        public string? Nombre { get; set; }

        [BsonElement("dificultad")]
        public string? Dificultad { get; set; }

        [BsonElement("puntosAcomulados")]
        public int PuntosAcomulados { get; set; }

        [BsonElement("retroalimentacion")]
        public string? Retroalimentacion { get; set; }

        [BsonElement("intentos")]
        public int Intentos { get; set; }

        [BsonElement("porcentaje")]
        public int porcentaje { get; set; }

        [BsonElement("palabra")]
       public List<string>? Palabra { get; set; }

        [BsonElement("usuarioId")]
        public string? UsuarioId { get; set; }
    }
}