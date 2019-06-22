import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../service/firebase.service';
import { solicitud } from '../../service/data-model';
import * as moment from 'moment';

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

  img1: any = "";
  img2: any = "";
  img3: any = "";
  img4: any = "";

  images: any = [];
  solicitud: any = [];
  docId: any = "";
  rutPersona: any ="";
  constructor(private routes: ActivatedRoute,
      private router: Router,
     private fire: FirebaseService) { }


  ngOnInit() {
    let id = this.routes.snapshot.paramMap.get('Id');
    this.rutPersona = localStorage.getItem('userRut');
    console.log(this.rutPersona)
    let req = this.fire.getFichaForId(id).subscribe((data) => {
      req.unsubscribe();
      console.log(data)
      this.itemData = data[0];
      this.img1 = data[0]['img1'];
      this.img2 = data[0]['img2'];
      this.img3 = data[0]['img3'];
      this.img4 = data[0]['img4'];
      this.prepareImage(id);
      this.fire.getNameForRut(data[0]['publicante']).subscribe((d) => {
        this.itemNombre = d[0]['name'];
      })

    });

  }


  prepareImage(id) {
    let imgs = [];
    if (this.img1 != undefined && this.img1 != "") {
      imgs.push(this.img1);
    }
    if (this.img2 != undefined && this.img2 != "") {
      imgs.push(this.img2);
    }
    if (this.img3 != undefined && this.img3 != "") {
      imgs.push(this.img3);
    }
    if (this.img4 != undefined && this.img4 != "") {
      imgs.push(this.img4);
    }
    this.images = imgs;

    let req = this.fire.getDocumentId(id).subscribe((data) => {
      req.unsubscribe();
      this.docId = data[0]['payload']['doc']['id'];
    });
  }


  crearSolicitud(){
    let n = this.text.nativeElement.value;
    let loged = localStorage.getItem('userLoged');
    if(this.itemData['publicante'] == this.rutPersona){
      swal('', 'No puedes realizar una solicitud a una de tus publicaciones', 'info');
    }else if (loged == null || loged != "login") {
      swal('', 'Para crear una solicitud debe haber iniciado sesión', 'warning');

    } else if (n == "" || n == undefined) {
      swal('', 'Para crear la solicitud debe añadir un comentario', 'info');

    } else {
      let rut = localStorage.getItem('userRut');
      let data = this.itemData;

      let solicitudes = data['solicitudes'];
      let existe: boolean = false;

      if(solicitudes != undefined){
        solicitudes.forEach(element => {
          if(element['rutSolicitante'] == rut){
            existe = true;
          }
        });

      }else {
        existe = false;
      }

      if (existe) {
        swal('', 'Ya creo una solicitud a este vehículo', 'warning');
      }else{

        console.log(this.itemData)
        let element = {
          idSolicitud: this.random(),
          idPublicacion: this.itemData['id'],
          rutSolicitante: rut,
          tituloPublicacion: this.itemData['titulo'],
          fechaSolicitud: moment().format("DD/MM/YYYY"),
          estado: "null",
          comentarioSolicitud: n
        }
        console.log(element)
        if(solicitudes != undefined){
          solicitudes.push(element);
        }else{
          let e = [];
          e.push(element);
          solicitudes = e;
        }

        this.fire.addRequest(this.docId, solicitudes).then(() => {
          swal('', 'Solicitud creada con éxito', 'success').then(() => {
            this.router.navigate(['/Home']);
          });
        });
        this.fire.addNewRequest(element);

      }
    }

  }



  random() {
    return (Math.floor((Math.random() * 10000) + 1)).toString();
  }

}
