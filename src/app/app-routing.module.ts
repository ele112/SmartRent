import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeListComponent } from './layout/home-list/index';
import { FichaVehiculoComponent } from './layout/ficha-vehiculo';
import { LoginComponent } from './layout/login';

const routes: Routes = [
  { path: '', component: HomeListComponent},
  { path: 'Login', component: LoginComponent},
  { path: 'Home', component: HomeListComponent},
  { path: 'Ficha', component: FichaVehiculoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
