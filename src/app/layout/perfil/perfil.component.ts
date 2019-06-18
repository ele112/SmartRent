import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../service/firebase.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  constructor(private routes: ActivatedRoute, private fire: FirebaseService) { }

  itemData: any = [];
  ngOnInit() {
    let rut = this.routes.snapshot.paramMap.get('Id');
    this.fire.getNameForRut(rut).subscribe((data) => {
      console.log(data)
      this.itemData = data[0];
    });
  }

  openURl(url){
    window.open(url, '_blank');
  }

}
