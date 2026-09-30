using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class TarjetaCredito
    {
        //esta es la clave primaria de nuesto modelo
        public int Id { get; set; } //la llave primaria automaticamente es NOT NULL

        [Required] //esto es para hacer que el campo titulo sea NOT NULL
        public string Titulo { get; set; }

        [Required] //esto es para hacer que el campo numeroTarjeta sea NOT NULL

        public string numeroTarjeta { get; set; }

        [Required] //esto es para hacer que el campo fechaExpiracion sea NOT NULL

        public string fechaExpiracion { get; set; }

        [Required] //esto es para hacer que el campo cvv sea NOT NULL

        public string cvv {  get; set; }
    }
}
