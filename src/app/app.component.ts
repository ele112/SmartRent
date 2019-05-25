import { Component } from '@angular/core';
import { SharedService } from './shared/shared.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'smartRent';
  panel: any;
  constructor(private sharedService:SharedService){

  }


  ngOnInit(){
    this.panel = true;
    this.sharedService.statusPanel.subscribe((data) => {
      this.panel = data
    });

  }




}
