import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeListComponent } from './layout/home-list/index';
import { FichaVehiculoComponent } from './layout/ficha-vehiculo';
import { LoginComponent } from './layout/login';
import { PublicarAvisoComponent } from './layout/publicar-aviso/publicar-aviso.component';
import { SolicitudesComponent } from './layout/solicitudes/solicitudes.component';

const routes: Routes = [
  { path: '', component: HomeListComponent},
  { path: 'Login', component: LoginComponent},
  { path: 'Home', component: HomeListComponent},
  { path: 'Ficha', component: FichaVehiculoComponent},
  { path: 'Publicar', component: PublicarAvisoComponent},
  { path: 'Solicitudes', component: SolicitudesComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
