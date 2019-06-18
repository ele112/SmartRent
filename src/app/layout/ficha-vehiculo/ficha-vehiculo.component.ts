import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../service/firebase.service';
import { solicitud } from '../../service/data-model';

import swal from 'sweetalert';
@Component({
  selector: 'app-ficha-vehiculo',
  templateUrl: './ficha-vehiculo.component.html',
  styleUrls: ['./ficha-vehiculo.component.scss']
})
export class FichaVehiculoComponent implements OnInit {
  @ViewChild('comentario') text;
  itemData: any = [];
  itemNombre: any = "";

  img1: any ="";
  img2: any ="";
  img3: any ="";
  img4: any ="";

  images: any = [];
  constructor(private routes: ActivatedRoute, private fire: FirebaseService) { }


  ngOnInit() {
    let id =  this.routes.snapshot.paramMap.get('Id');
    this.fire.getFichaForId(id).subscribe((data) => {
      console.log(data)
      this.itemData = data[0];
      this.img1 = data[0]['img1'];
      this.img2 = data[0]['img2'];
      this.img3 = data[0]['img3'];
      this.img4 = data[0]['img4'];
      this.prepareImage();
      this.fire.getNameForRut(data[0]['publicante']).subscribe((d) => {
        this.itemNombre = d[0]['name'];
      })

    });
  }


  prepareImage(){
    let imgs = [];
    if(this.img1 != undefined && this.img1 != ""){
      imgs.push(this.img1);
    }
    if(this.img2 != undefined && this.img2 != ""){
      imgs.push(this.img2);
    }
    if(this.img3 != undefined && this.img3 != ""){
      imgs.push(this.img3);
    }
    if(this.img4 != undefined && this.img4 != ""){
      imgs.push(this.img4);
    }
    this.images = imgs;
  }

  crearSolicitud(){
    let n = this.text.nativeElement.value
    let loged = localStorage.getItem('userLoged');
    console.log(loged)
    if(loged == null || loged != "login"){
      swal('', 'Para crear una solicitud debe haber iniciado sesión', 'warning');

    }else if(n == "" || n == undefined){
      swal('', 'Para crear la solicitud debe añadir un comentario', 'info');
    }else{

      let rut = localStorage.getItem('userRut');
      let req  = this.fire.existRequest(this.itemData['id'], rut).subscribe((_data) => {
        console.log(_data);
        req.unsubscribe();
        setTimeout(()=>{
          if(_data.length > 0){
            swal('','Ya creo una solicitud a este vehiculo', 'warning')
  
          }else{
            let s = new solicitud();
            s.idPubl = this.itemData['id'];
            s.solicitante = rut;
            s.titulo = this.itemData['titulo'];
            s.fechaSolicitud = new Date().getDay()+'/'+new Date().getMonth()+'/'+new Date().getFullYear();
            s.estado = "null";
            s.comentario = n;
  
            this.fire.addRequest(s).then((data) => {
              swal('','Solicitud creada con exito', 'success');
            });
  
          }
        }, 300);
       

      });


    
      
  
    }
  }

}
