import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import {BaseService} from '../../service/base.service';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss']
})
export class HomeListComponent implements OnInit {

  dataIN: any = [
    {
      n: 'sa'
    },
    {
      n: 'sa'
    },
    {
      n: 'sa'
    },
    {
      n: 'sa'
    },
    {
      n: 'sa'
    },
    {
      n: 'sa'
    },
    {
      n: 'sa'
    },
    {
      n: 'sa'
    },
    {
      n: 'sa'
    },
    

  ]



  constructor(private baseService: BaseService) { 
    this.baseService.getUsers();

  }

  ngOnInit() {
  }

}
