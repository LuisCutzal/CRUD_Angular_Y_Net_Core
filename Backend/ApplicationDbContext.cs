using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend
{
    public class ApplicationDbContext: DbContext
    {
        //debemos de poder mapear nuestro modelo con las tablas de la bd

        DbSet<TarjetaCredito> TarjetaCredito { get; set; }
            //nombre de la bd que estamos utilizando

        //nuestra clase debe heredar de DbContext para poder trabajar con sql

        //creamos un controlador
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options) {
            //DbContextOptions<ApplicationDbContext> -> contiene la configuración que Entity Framework necesita para crear el contexto.


        }
    }
}
