import { Component, OnInit } from '@angular/core';
// import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
// import {BaseService} from '../../service/fire.service';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss']
})
export class HomeListComponent implements OnInit {

  dataIN: any = [
    {
      n: 'sa'
    },
    {
      n: 'sa'
    },
    {
      n: 'sa'
    },
    {
      n: 'sa'
    },
    {
      n: 'sa'
    },
    {
      n: 'sa'
    },
    {
      n: 'sa'
    },
    {
      n: 'sa'
    },
    {
      n: 'sa'
    },
    

  ]


  comunas = [
    {
      "nombre": "Santiago",
      "id": 1,
    },
    {
      "nombre": "Cerrillos",
      "id": 2,
    },
    {
      "nombre": "Cerro Navia",
      "id": 1,
    },
    {
      "nombre": "El Bosque",
      "id": 1,
    },
    {
      "nombre": "Estación Central",
      "id": 1,
    },
    {
      "nombre": "Huechuraba",
      "id": 1,
    }
  ]

  vehiculo = [
    {
      "tipo": "Normal",
      "id": 1
    },
    {
      "tipo": "Carga Pesada",
      "id": 1
    },
    {
      "tipo": "Camion",
      "id": 1
    }
  ]
  constructor() { 
    // this.baseService.getUsers();

  }

  ngOnInit() {
  }

  comunaSelected(comuna){

  }
  solicitarArriendo(){
    
  }

}
