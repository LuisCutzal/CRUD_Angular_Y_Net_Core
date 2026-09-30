import { Component } from '@angular/core';
import { NgFor } from '@angular/common'; //es necesario en este caso importar NgFor
@Component({
  imports: [NgFor], //en imports tambien es necesario utilizarlo
  selector: 'app-tarjeta-credito', //este es el nombre que debemos de colocar para que renderice
  styleUrl: './tarjeta-credito.css',
  templateUrl: './tarjeta-credito.html',
})
export class TarjetaCredito {
  listarTarjetas: any[] = [ //esta es una lista de las tarjetas utilizada en tarjeta-credito.html
    {titulo:"Lucas Gonzales", numeroTarjeta:"123456789", fechaExpiracion: "29/09/2026", CVV: "123"},
    {titulo:"Juan Lopez", numeroTarjeta:"9876554721", fechaExpiracion: "10/09/2028", CVV: "555"}
  ];
}
