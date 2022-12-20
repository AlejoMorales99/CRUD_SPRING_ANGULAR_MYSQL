import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicesCrudClienteService } from '../clientes/services-crud-cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-clientes',
  templateUrl: './editar-clientes.component.html',
  styleUrls: ['./editar-clientes.component.css']
})
export class EditarClientesComponent implements OnInit {

  constructor(private router: Router,private parametro: ActivatedRoute, private servicio: ServicesCrudClienteService) { }

  idBuscarCliente: number = 0;
  guardarInformacionActualizar:any
  ngOnInit(): void {

    this.idBuscarCliente = this.parametro.snapshot.params['id'];

    this.servicio.getOneCliente(this.idBuscarCliente).subscribe(res => {
      this.guardarInformacionActualizar = Object.values(res);

      this.id = this.guardarInformacionActualizar[0];
      this.nombreActualizar = this.guardarInformacionActualizar[1];
      this.apellidoActualizar = this.guardarInformacionActualizar[2];
      this.emailActualizar = this.guardarInformacionActualizar[3];

    });
  }

  id: string = "";
  nombreActualizar: String = "";
  apellidoActualizar: String = "";
  emailActualizar: String = "";



  actualizarDatos() {
    this.servicio.putClientes(this.id, this.nombreActualizar, this.apellidoActualizar, this.emailActualizar).subscribe(res => {
      console.log(res);

      Swal.fire(
        'EXITO',
        `${this.nombreActualizar} - ${this.apellidoActualizar} ACTUALIZADO CON EXITO`,
        'success'
      )

      this.router.navigate(['/clientes']);

    });
  }


}
