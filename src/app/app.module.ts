import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {  RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { ClientesComponent } from './clientes/clientes.component';
import { EditarClientesComponent } from './editar-clientes/editar-clientes.component';
import { ServicesCrudClienteService } from './clientes/services-crud-cliente.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


const appRoutes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'editarCliente/:id', component: EditarClientesComponent},

];

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ClientesComponent,
    EditarClientesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule
  ],
  providers: [ServicesCrudClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
