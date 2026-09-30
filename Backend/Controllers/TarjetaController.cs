using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TarjetaController : ControllerBase
    {
        //variable privada

        private readonly ApplicationDbContext _context;

        //creamos un constructor

        public TarjetaController(ApplicationDbContext context) {
            _context = context;
        }


        // GET: api/<TarjetaController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            //return new string[] { "value1", "value2" };
            try {
                var listaTarjetas = await _context.TarjetaCredito.ToListAsync();
                return Ok(listaTarjetas);
            }
            catch (Exception ex){ return BadRequest(ex.Message); }
        }

        // GET api/<TarjetaController>/5
        //este es para obtener una tarjeta en base a su Id de la bd
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try {
                var tarjeta = await _context.TarjetaCredito.FirstOrDefaultAsync(trjt => trjt.Id == id);
                //FirstOrDefaultAsync -> Busca el primer elemento que cumpla la condición. Si no encuentra ninguno, devuelve null
                //la funcion lambda: trjt => trjt.Id == id quiere decir: para cada tarjeta, verifica si tarjeta.Id es igual a id
                if (tarjeta == null) 
                { return NotFound(); }
                return Ok(tarjeta);
            }
            catch (Exception ex) { return BadRequest(ex.Message); }
        }

        // POST api/<TarjetaController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TarjetaCredito tarjeta)
        {
            try {
                _context.Add(tarjeta);
                await _context.SaveChangesAsync();
                return Ok(tarjeta);
            }
            catch (Exception ex) { return BadRequest(ex.Message); }
        }

        // PUT api/<TarjetaController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] TarjetaCredito value)
        {
            try {
                var tarjeta = await _context.TarjetaCredito.FirstOrDefaultAsync(trjt => trjt.Id==id);
                if (tarjeta == null) { return NotFound(); }
                else {
                    tarjeta.Titulo = value.Titulo;
                    tarjeta.numeroTarjeta = value.numeroTarjeta;
                    tarjeta.fechaExpiracion = value.fechaExpiracion;
                    tarjeta.cvv = value.cvv;
                    //despues de todo debemos de agregar nuevamente a la bd
                    await _context.SaveChangesAsync();
                    return Ok(tarjeta);
                }

            }
            catch (Exception ex) { return BadRequest(ex.Message); }
        }

        // DELETE api/<TarjetaController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try { 
                var tarjeta = await _context.TarjetaCredito.FirstOrDefaultAsync(trjt => trjt.Id==id);
                if (tarjeta == null) { return NotFound(); }
                else
                {
                    _context.TarjetaCredito.Remove(tarjeta);
                    //Remove() no necesita ser asíncrono.
                    await _context.SaveChangesAsync();
                    return Ok();
                }
            }
            catch (Exception ex) { return BadRequest(ex.Message); }
        }
    }
}
