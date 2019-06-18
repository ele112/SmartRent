import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss']
})
export class SolicitudesComponent implements OnInit {

  solicitudesR: any;
  solicitudesE: any;
  _solicitudesR: any;
  _solicitudesE: any;
  constructor() { }

  ngOnInit() {
    this.solicitudesR = false;
    this.solicitudesE = false;
    this._solicitudesR = [
      {id: "1", titulo: 'Mazda 3 Arriendo', comentario: 'Lorem ipsum dolor sit amet consectetur'+
      'adipisicing elit. Dolore, eum. Possimus veniam necessitatibus, '+
      'in voluptates quas voluptatem harum illum doloremque commodi corporis aut eius, '+
      'impedit maxime mollitia quisquam! Aut, maiores?', solcitante: ''},
      {id: "2", titulo: 'Mazda 3 Arriendo', comentario: 'Lorem ipsum dolor sit amet consectetur'+
      'adipisicing elit. Dolore, eum. Possimus veniam necessitatibus, '+
      'in voluptates quas voluptatem harum illum doloremque commodi corporis aut eius, '+
      'impedit maxime mollitia quisquam! Aut, maiores?', solcitante: ''},
      {id: "3", titulo: 'Mazda 3 Arriendo', comentario: 'Lorem ipsum dolor sit amet consectetur'+
      'adipisicing elit. Dolore, eum. Possimus veniam necessitatibus, '+
      'in voluptates quas voluptatem harum illum doloremque commodi corporis aut eius, '+
      'impedit maxime mollitia quisquam! Aut, maiores?', solcitante: ''},
      {id: "4", titulo: 'Mazda 3 Arriendo', comentario: 'Lorem ipsum dolor sit amet consectetur'+
      'adipisicing elit. Dolore, eum. Possimus veniam necessitatibus, '+
      'in voluptates quas voluptatem harum illum doloremque commodi corporis aut eius, '+
      'impedit maxime mollitia quisquam! Aut, maiores?', solcitante: ''},
      {id: "5", titulo: 'Mazda 3 Arriendo', comentario: 'Lorem ipsum dolor sit amet consectetur'+
      'adipisicing elit. Dolore, eum. Possimus veniam necessitatibus, '+
      'in voluptates quas voluptatem harum illum doloremque commodi corporis aut eius, '+
      'impedit maxime mollitia quisquam! Aut, maiores?', solcitante: ''},
      {id: "6", titulo: 'Mazda 3 Arriendo', comentario: 'Lorem ipsum dolor sit amet consectetur'+
      'adipisicing elit. Dolore, eum. Possimus veniam necessitatibus, '+
      'in voluptates quas voluptatem harum illum doloremque commodi corporis aut eius, '+
      'impedit maxime mollitia quisquam! Aut, maiores?', solcitante: ''},

    ];
    this._solicitudesE = [
      {id: "1", titulo: 'Mazda 3 Arriendo', comentario: 'Lorem ipsum dolor sit amet consectetur'+
      'adipisicing elit. Dolore, eum. Possimus veniam necessitatibus, '+
      'in voluptates quas voluptatem harum illum doloremque commodi corporis aut eius, '+
      'impedit maxime mollitia quisquam! Aut, maiores?', publicacion: '145'},
    ]
    
  }

}
