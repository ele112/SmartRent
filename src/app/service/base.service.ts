
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
// import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
// import { Observable } from 'rxjs';
// import 'rxjs/add/observable/fromPromise';

@Injectable()
export class BaseService {


    constructor() { 

    }

    getUsers(){
        // return new Observable(resolve) => {  

        // }));
        // this.firebase.list('users').snapshotChanges().subscribe(list => {
        //     console.log(list);

        // })
        // this.usersList = this.firebase.list('users');
        // return this.usersList.snapshotChanges();
    }



    async getListUsers(): Promise<any>{
        // this.getUsers().subscribe(list => {
        //     list.map(item => {
        //         return {
        //           $key: item.key,
        //           ...item.payload.val(),
        //         };
        //     });
      
        //   });
    }
    


}