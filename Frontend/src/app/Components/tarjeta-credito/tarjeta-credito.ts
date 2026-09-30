import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common'; //es necesario en este caso importar NgFor
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from '@openng/ngx-toastr';
import { Tarjeta } from '../../service/tarjeta';
@Component({
  imports: [NgFor,
    ReactiveFormsModule //formularios reactivos
  ], //en imports tambien es necesario utilizarlo
  selector: 'app-tarjeta-credito', //este es el nombre que debemos de colocar para que renderice
  styleUrl: './tarjeta-credito.css',
  templateUrl: './tarjeta-credito.html',
})
export class TarjetaCredito {
  // listarTarjetas: any[] = [ //esta es una lista de las tarjetas utilizada en tarjeta-credito.html
  //   { titulo: "Lucas Gonzales", numeroTarjeta: "123456789", fechaExpiracion: "09/2026", CVV: "123" },
  //   { titulo: "Juan Lopez", numeroTarjeta: "9876554721", fechaExpiracion: "09/2028", CVV: "555" }
  // ];

  listarTarjetas: any[] = [];


  private toastr = inject(ToastrService); //inyeccion mediante inject
  private tarjetaService = inject(Tarjeta);//inyeccion mediante inject

  form: FormGroup; //agruparemos una serie de elementos ya que el formulario tiene varios elementos

  constructor(private fb: FormBuilder,
  ) { //creamos una inyeccion por constructor de dependencias
    this.form = this.fb.group(
      {
        titulo: ["", Validators.required],
        numeroTarjeta: ["", [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
        //cuando colocamos varias validaciones, es necesario colocarlo como un array
        fechaExpiracion: ["", [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
        cvv: ["", [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
      }

    )
  }

  // private toastr = inject(ToastrService);
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
    this.toastr.success(
      'La tarjeta se agregó correctamente',
      'Tarjeta registrada con exito'
    );
    //esto recibe un mensaje y un titulo

    //luego reseteamos el formulario esto con el fin de poner los campos del formulario en blanco
    this.form.reset();
  }

  eliminarTarjeta(index: number) {
    //console.log(index);
    this.listarTarjetas.splice(index, 1);
    //splice() permite eliminar desde una posición específica, necesita parametros: que elemento queremos remover y la cantidad de elementos
    //no usamos pop porque siempre elimina el último elemento.
    //no usamos shift porque siempre elimina el primer elemento
    this.toastr.error(
      'La tarjeta fue eliminada con exito',
      'Tarjeta eliminada'
    );

    this.tarjetaService.deleteTarjeta(index).subscribe(data => {
      this.toastr.error(
        'La tarjeta fue eliminada con exito',
        'Tarjeta eliminada');
    }, error => {
      console.log(error);
    }
    )
  }

  obtenerTarjetas() {
    this.tarjetaService.getListadoTarjetas().subscribe(data => {
      console.log(data);
      this.listarTarjetas = data;
    }, error => {
      console.log(error);
    }
    )
  }


  ngOnInit(): void {
    this.obtenerTarjetas();
  }

}
