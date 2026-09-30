
using Microsoft.EntityFrameworkCore;

namespace Backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();

            builder.Services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DevConnection")));

            builder.Services.AddCors(options => options.AddPolicy("AllowWebApp",
                builder => builder.AllowAnyOrigin() //Permitir peticiones desde cualquier origen.
                .AllowAnyHeader() //permite cualquier encabezado HTTP que envíe el frontend.
                .AllowAnyMethod())); //Permite cualquier método HTTP:
            //esto se usa porque el front y el back estan en origenes diferentes

            /*
                     builder.Services.AddCors(options =>
                {
                    options.AddPolicy("AllowWebApp", policy =>
                    {
                        policy
                            .WithOrigins("https://mi-frontend.com")
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
                });

            //Así solamente ese frontend está autorizado.
             */

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors("AllowWebApp"); //Utiliza la política AllowWebApp para las peticiones que lleguen a este servidor.

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
