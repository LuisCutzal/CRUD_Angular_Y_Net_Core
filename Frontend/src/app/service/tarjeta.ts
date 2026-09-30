import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Service()
export class Tarjeta {

    // los servicios se usan para: hacer peticiones http hacia el backend
    // reutilizacion de codigo entre componentes
    // comunicacion de datos entre componentes
    private http = inject(HttpClient);

    private myAppURL = "https://localhost:7156/";
    private myAPIURL = "api/Tarjeta/";


    getListadoTarjetas(): Observable<any> {
        return this.http.get(this.myAppURL + this.myAPIURL); //devuelve un observable en formato json
    }


    deleteTarjeta(id: number): Observable<any> {
        return this.http.delete(this.myAppURL + this.myAPIURL + id); //devuelve un observable en formato json

    }
}
