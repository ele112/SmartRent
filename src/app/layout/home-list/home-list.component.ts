import { Component, OnInit } from '@angular/core';
// import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import {FirebaseService} from '../../service/firebase.service';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss']
})
export class HomeListComponent implements OnInit {

  dataIN: any;
  comuna: any;

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
  
  
  
  
  
  constructor(private firebase: FirebaseService) { 
    // this.baseService.getUsers();
    // this.firebase.getForQuery().valueChanges().subscribe((data) => {
    //   console.log(data)
    // });
    this.firebase.getAllPublications().subscribe((data) => {
      // console.log(data);
      this.dataIN = data;
    })

  }

  ngOnInit() {
    this.dataIN = [];
  }

  comunaSelected(comuna){

  }
  solicitarArriendo(){
    
  }

}
