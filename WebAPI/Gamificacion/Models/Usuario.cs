using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Gamificacion.Models
{
    public class Usuario
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("nombreUsuario")]
        public string? NombreUsuario { get; set; }

        [BsonElement("nombre")]
        public string? Nombre { get; set; }

        [BsonElement("apellidoPaterno")]
        public string? ApellidoPaterno { get; set; }

        [BsonElement("apellidoMaterno")]
        public string? ApellidoMaterno { get; set; }

        [BsonElement("email")]
        public string? Email { get; set; }

        [BsonElement("pwd")]
        public string? Pwd { get; set; }
        [BsonElement("rol")]
        public string? Rol { get; set; }
    }
}