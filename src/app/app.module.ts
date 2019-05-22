import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { HomeListComponent } from './layout/home-list/home-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MenuComponent } from './layout/menu/menu.component';
import { PublicarAvisoComponent } from './layout/publicar-aviso/publicar-aviso.component';
import { FichaVehiculoComponent } from './layout/ficha-vehiculo/ficha-vehiculo.component';
import { CrearSolicitudComponent } from './layout/crear-solicitud/crear-solicitud.component';
import { AvisosPublicadosComponent } from './layout/avisos-publicados/avisos-publicados.component';
import { SolicitudesComponent } from './layout/solicitudes/solicitudes.component';
import { PerfilComponent } from './layout/perfil/perfil.component';
import {ModelBD} from './service/modelBD';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';


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
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    
  ],
  providers: [ModelBD],
  bootstrap: [AppComponent]
})
export class AppModule { }
