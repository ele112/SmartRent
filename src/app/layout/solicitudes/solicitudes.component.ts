import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../service/firebase.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';
declare var $window: any;
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
  constructor(private fire: FirebaseService, private router: Router) { }

  ngOnInit() {
    this.solicitudesR = false;
    this.solicitudesE = false;
    this._solicitudesR = [];
    this._solicitudesE = []
    this.getAllRequest();
  }

  getAllRequest(){
    let rut = localStorage.getItem('userRut');
    let q = this.fire.requestSended(rut).subscribe((data) => {
      q.unsubscribe();
      console.log(data);
      this._solicitudesE = data;
    });
    let r = this.fire.getPublishForRut(rut).subscribe((data) => {
      r.unsubscribe();
      console.log(data);
      this.prepare(data);
    });
    
  }
  prepare(data){
    let solicitudes = [];
    data.forEach(element => {
      if(element['solicitudes'] != undefined){
        let dat = element['solicitudes'];
        dat.forEach(i => {
          solicitudes.push(i);
        });
      }
    });

    this._solicitudesR = solicitudes;
    console.log(solicitudes);
  }

  solicitudEstado(data){
    let email = localStorage.getItem('userMail');
    let subject = "Solicitud arriendo vehículo";
    let msg = 'Hola! te contacto para solicitar arriendo del vehiculo publicado '+
    data['tituloPublicacion']+'. Contactame al +569 XXXXXXXX %0D%0A %0D%0APublicacion: %0D%0A';
    let url = "https://aa-aa12.herokuapp.com/Ficha;Id="+data["idPublicacion"]+" %0D%0A%0D%0A"
    // console.log(data)
    location.href = "mailto:"+email+"?subject="+subject+"&body="+msg+"\n"+url;

    // location.href = "mailto:veron@gmail.com?subject=hello&body=fggf"



  }

  delete(data) {
    let id = data['idPublicacion'];
    let idR = data['idSolicitud'];
    let r = this.fire.getFichaForId(id).subscribe((data) => {
      r.unsubscribe();
      let solAct = data[0]['solicitudes'];
      let p = 0;
      for (let i = 0; i < solAct.length; i++) {
        if (solAct[i]['idPublicacion'] == id) {
          p = i;
          break;
        }
      }
      solAct.splice(p,p+1);

      console.log(solAct);


      let e = this.fire.getDocumentId(id).subscribe((data) => {
        e.unsubscribe();
        let docId = data[0]['payload']['doc']['id'];
        this.fire.addRequest(docId, solAct).then(() => {
          swal('','Solicitud eliminada', 'success');
          this.getAllRequest();  

        });
      });

      let s = this.fire.getDocumentIdRequest(idR).subscribe((data) => {
        s.unsubscribe();
        let docId = data[0]['payload']['doc']['id'];
        this.fire.removeSolicitud(docId);
      });

      // this.fire.getDocumentId()

      // solAct.push({id: 22});

      // console.log(solAct);


      // if (solAct.length == 1) {
      //   solAct = [];
      // }else{
      //   solAct.splice(i,i)
      // }
    });



  }

}
