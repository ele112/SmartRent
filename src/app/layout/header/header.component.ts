import { Component, OnInit } from '@angular/core';
import {ModelBD} from '../../service/modelBD';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  btnAccionModal:any;
  login:boolean = true;
  constructor(public bd: ModelBD) { 
    this.bd.getP();
  }

  ngOnInit() {

  }
  
  registro(){
    this.login = false;
  }

}
