import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../service/firebase.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import swal from 'sweetalert';

@Component({
  selector: 'app-publicacion-user',
  templateUrl: './publicacion-user.component.html',
  styleUrls: ['./publicacion-user.component.scss']
})
export class PublicacionUserComponent implements OnInit {
  dataIN = [];
  hData: any
  constructor(private firebase: FirebaseService,  private router: Router, private spinner: NgxSpinnerService,) { }

  ngOnInit() {
    let rut  = localStorage.getItem('userRut');
    let e = this.firebase.searchForRut(rut).subscribe((data) => {
      e.unsubscribe();
      console.log(data);
      this.dataIN = data;
    });
  }

  delete(id){
    this.spinner.show();
    this.firebase.removePublish(id).then((result) => {
      this.spinner.hide();
      console.log(result);
      if(result == 'OK'){
        swal('','Vehiculo eliminado','success').then(()=> {
          window.location.reload();
        });
      }else{
        swal('', 'Ocurrio un error al eliminar', 'warning');
      }
    });
  }

}
