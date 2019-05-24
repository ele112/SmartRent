import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../service/firebase.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ImageSnippet } from '../../service/data-model';
import {
  AngularFireStorage,
  AngularFireUploadTask
} from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})



export class HeaderComponent implements OnInit {
  btnAccionModal:any;
  login:boolean = true;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  imgURL1: any = '';
  imgURL2: any = '';
  imgURL3: any = '';
  
  selectedFile1: ImageSnippet;
  selectedFile2: ImageSnippet;
  selectedFile3: ImageSnippet;

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;

  constructor(public fire: FirebaseService, 
          private storage: AngularFireStorage,
          private db: AngularFirestore,
          private _formBuilder: FormBuilder) { 
    // this.fire.loginInFirebase('alfonso.pareja@hotmail.com','123456');
    this.fire.logoutFirebase();
    // this.fire.createUserAccount('ele.alfonso112@gmail.com', '123456');
    // this.fire.stateLogin();
  }

  ngOnInit() {
    this.firstFormGroup = this.createMyForm();
    this.secondFormGroup = this.createMyform2();

  } 

  processFile(imageInput: any, selected) {
    if( imageInput.files[0] != undefined ){
      const file: File = imageInput.files[0];
      const reader = new FileReader();
  
      reader.addEventListener('load', (event: any) => {
  
        
        if(selected == '1'){
          this.selectedFile1 = new ImageSnippet(event.target.result, file);
          this.selectedFile1.pending = true;
    
          let base64 = reader.result;
          console.log(this.selectedFile1.file);

          this.imgURL1 = base64;
        }else if(selected == '2'){
          this.selectedFile2 = new ImageSnippet(event.target.result, file);
          this.selectedFile2.pending = true;
    
          let base64 = reader.result;

          this.imgURL3 = base64;       
        }else{
          this.selectedFile3 = new ImageSnippet(event.target.result, file);
          this.selectedFile3.pending = true;
    
          let base64 = reader.result;

          this.imgURL3 = base64;      
        }
        
        // console.log(reader.result);
  
      });
  
  
  
      reader.readAsDataURL(file);
    }
  
  }

  createAccount(){

    // Subir archivos a firebaseStorage




  }


  uploadImages(){
    


  }


  private createMyForm() {
    return this._formBuilder.group({
      tipo: ['usuario', Validators.required],
      name: ['', Validators.required],
      rut: ['', Validators.required],
      email: ['', Validators.required],
      cel: ['', Validators.required],
      pass: ['', Validators.required],

    });

  }

  private createMyform2(){
    return this._formBuilder.group({

    })
  }

  nextSubmit(){
    let a = this.firstFormGroup.value;
    console.log(a);
  }







  registro(){
    this.login = false;
  }

  predeterm(){
    this.login = true;
  }
  



}
