import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { FirebaseService } from '../../service/firebase.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public UserName: any;
  login:boolean;
  constructor(private sharedService:SharedService, public fire: FirebaseService, ) { }

  ngOnInit() {
    this.UserName = 'Invitado';
    this.login = false;
    this.verifyStorage();
    this.sharedService.statusLogIn.subscribe((data) => {
      if (data['status'] != null && data['status'] == 'login'){
        this.login = true;
        this.UserName = data['name'];
      }else{
        this.login = false;
      }
  
    });
  }

  ngOnChange(){
    this.verifyStorage();
  }


  verifyStorage(){
    let logIn = localStorage.getItem('userLoged');
    let name = localStorage.getItem('userName');
    console.log(logIn);
    console.log(name)
    if (logIn != null && logIn == 'login'){
      this.login = true;
      this.UserName = name;
    }else{
      this.login = false;
    }
  }

  closeSesion(){
    this.fire.logoutFirebase().then(data => {
      console.log(data);
      localStorage.setItem('userLoged', null);
      localStorage.setItem('userName', null);
      localStorage.clear();

      location.reload();

    })

  }

}
