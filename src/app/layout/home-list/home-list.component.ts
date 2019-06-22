import { Component, OnInit, ViewChild } from '@angular/core';
// import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import {FirebaseService} from '../../service/firebase.service';
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss']
})
export class HomeListComponent implements OnInit {
  @ViewChild('comuna') comuna;
  @ViewChild('categoria') categoria;

  dataIN: any;
   
  constructor(private firebase: FirebaseService,  private router: Router) { 
    // this.baseService.getUsers();
    // this.firebase.getForQuery().valueChanges().subscribe((data) => {
    //   console.log(data)
    // });
    this.searchAll();


  }

  ngOnInit() {
    this.dataIN = [];
  }

  buscar(){
    console.log(this.comuna);
    console.log(this.categoria);

    if(this.comuna != "" && this.comuna != null){

      if(this.categoria != "" && this.categoria != null){
        
        let r = this.firebase.searchPublished(this.comuna, this.categoria).subscribe((data) => {
          r.unsubscribe();
          this.dataIN = data;
        });

      }else{
        swal('','Debe seleccionar una categoria', 'info');
      }

    }else{
      swal('','Debe seleccionar una comuna', 'info');
    }

  }

  searchAll(){
    this.firebase.getAllPublications().subscribe((data) => {
      this.dataIN = data;
    })
  }

  verFicha(id){
    this.router.navigate(['/Ficha', {Id: id}]);
  }


}
