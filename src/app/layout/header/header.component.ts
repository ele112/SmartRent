import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../service/firebase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  btnAccionModal:any;
  login:boolean = true;
  constructor(public fire: FirebaseService) { 
    // this.fire.loginInFirebase('alfonso.pareja@hotmail.com','123456');
    this.fire.logoutFirebase();
    // this.fire.createUserAccount('ele.alfonso112@gmail.com', '123456');
    // this.fire.stateLogin();
  }

  ngOnInit() {
  } 

  ngAfterViewInit(){
    this.login = true;

  }


  registro(){
    this.login = false;
  }

  



}
