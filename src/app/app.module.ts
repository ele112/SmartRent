import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { HomeListComponent } from './layout/home-list/home-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
// import { AngularFireModule } from 'angularfire2';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { BaseService } from './service/base.service';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MenuComponent } from './layout/menu/menu.component';
import { PublicarAvisoComponent } from './layout/publicar-aviso/publicar-aviso.component';
import { FichaVehiculoComponent } from './layout/ficha-vehiculo/ficha-vehiculo.component';
import { CrearSolicitudComponent } from './layout/crear-solicitud/crear-solicitud.component';
import { AvisosPublicadosComponent } from './layout/avisos-publicados/avisos-publicados.component';
import { SolicitudesComponent } from './layout/solicitudes/solicitudes.component';
import { PerfilComponent } from './layout/perfil/perfil.component';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeListComponent,
    MenuComponent,
    PublicarAvisoComponent,
    FichaVehiculoComponent,
    CrearSolicitudComponent,
    AvisosPublicadosComponent,
    SolicitudesComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [BaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
