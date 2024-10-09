using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Gamificacion.Models
{
    public class Progreso
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("Usuario")]
        public Usuario? Usuario { get; set; }
        
        [BsonElement("Juego")]
        public Juego? Juego { get; set; }

        [BsonElement("porcentaje")]
        public int Porcentaje { get; set; }
    }
}