import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { TarjetaCredito } from './Components/tarjeta-credito/tarjeta-credito';
import { HttpClientModule } from '@angular/common/http';
@Component({
  // imports: [RouterOutlet,TarjetaCredito],
  imports: [TarjetaCredito, HttpClientModule ],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Frontend');
}
