import { Component } from '@angular/core';
import { NgFor } from '@angular/common'; //es necesario en este caso importar NgFor
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  imports: [NgFor,
    ReactiveFormsModule //formularios reactivos
  ], //en imports tambien es necesario utilizarlo
  selector: 'app-tarjeta-credito', //este es el nombre que debemos de colocar para que renderice
  styleUrl: './tarjeta-credito.css',
  templateUrl: './tarjeta-credito.html',
})
export class TarjetaCredito {
  listarTarjetas: any[] = [ //esta es una lista de las tarjetas utilizada en tarjeta-credito.html
    { titulo: "Lucas Gonzales", numeroTarjeta: "123456789", fechaExpiracion: "09/2026", CVV: "123" },
    { titulo: "Juan Lopez", numeroTarjeta: "9876554721", fechaExpiracion: "09/2028", CVV: "555" }
  ];

  form: FormGroup; //agruparemos una serie de elementos ya que el formulario tiene varios elementos

  constructor(private fb: FormBuilder) { //creamos una inyeccion de dependencias
    this.form = this.fb.group(
      {
        titulo: [""],
        numeroTarjeta: [""],
        fechaExpiracion: [""],
        cvv: [""]
      }

    )
  }
  agregarTarjeta() {

    const tarjeta: any = {
      //tenemos que obtener los datos del formulario
      titulo: this.form.get("titulo")?.value,
      //Obtén el control titulo. Si existe, obtén su value; si no existe, devuelve undefined en lugar de lanzar un error.
      numeroTarjeta: this.form.get("numeroTarjeta")?.value,
      fechaExpiracion: this.form.get("fechaExpiracion")?.value,
      cvv: this.form.get("cvv")?.value,
    }
    console.log(tarjeta);

    //ahora agregaremos la tarjeta en el listado de tarjeta

    this.listarTarjetas.push(tarjeta);

    //luego reseteamos el formulario esto con el fin de poner los campos del formulario en blanco
    this.form.reset();
  }
}
