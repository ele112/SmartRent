import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  btnAccionModal:any;
  login:boolean = true;
  constructor() { 

  }

  ngOnInit() {

  }
  
  registro(){
    this.login = false;
  }

  



}
