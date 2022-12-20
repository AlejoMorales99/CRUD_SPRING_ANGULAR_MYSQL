import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ServicesCrudClienteService {

  constructor(private http: HttpClient, private rout: Router ) { }

  private idParsear: number = 0;
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  getClientes() {
    return this.http.get("http://localhost:8080/api/clientes").pipe(
      catchError(e => {
        this.rout.navigate(['/clientes']);
        console.log(e);
        Swal.fire('error al traer los datos', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  postCliente(nombre:String,apellido:String,email:String) {
    
    return this.http.post("http://localhost:8080/api/clientes", { nombre: nombre, apellido: apellido, email: email }, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire('error al crear al cliente ', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }


  getOneCliente(buscarClienteId: number) {
  
    return this.http.get(`http://localhost:8080/api/clientes/${buscarClienteId}`).pipe(
      catchError(e => {
        this.rout.navigate(['/clientes']);
        console.log(e);
        Swal.fire('error al traer los datos', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }


  putClientes(id: String, nombre: String, apellido: String, email: String) {
    
    this.idParsear = Number(id);

    return this.http.put(`http://localhost:8080/api/clientes/${this.idParsear}`,{nombre: nombre, apellido: apellido, email: email });
  }

  deleteClientes(id:number) {
    return this.http.delete(`http://localhost:8080/api/clientes/${id}`);
  }


}
