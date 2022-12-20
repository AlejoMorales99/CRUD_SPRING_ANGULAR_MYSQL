import { Component, OnInit } from '@angular/core';
import { ServicesCrudClienteService } from './services-crud-cliente.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit {
  constructor(
    private servicioCliente: ServicesCrudClienteService,
    private router: Router
  ) { }

  //guardo la data de lo que viene del springBoot
  guardarClientes: any;

  ngOnInit(): void {
    this.servicioCliente.getClientes().subscribe((res) => {
      console.log(res);
      this.guardarClientes = Object.values(res);
    });
  }

  //variables para buscar por id un cliente
  buscarClienteId: String = '';
  //---------------------------------------//

  //variables para insertar un cliente
  nombre: String = '';
  apellido: String = '';
  email: String = '';
  //-------------------------------------//

  crearCliente() {
    this.servicioCliente
      .postCliente(this.nombre, this.apellido, this.email)
      .subscribe((res) => {
        Swal.fire(
          'EXITO',
          `${this.nombre} - ${this.apellido} REGISTRADO`,
          'success'
        );

        this.ngOnInit();
      });
  }

  eliminarCliente(id: number) {
    Swal.fire({
      title: 'Eliminar',
      text: 'Estas seguro de eliminar al cliente con ID ' + id,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');

        this.servicioCliente.deleteClientes(id).subscribe((res) => {
          this.ngOnInit();
        });
      }
    });
  }

  buscarUnCliente() {
    this.servicioCliente
      .getOneCliente(Number(this.buscarClienteId))
      .subscribe((res) => {
        console.log(res);
      });
  }
}
