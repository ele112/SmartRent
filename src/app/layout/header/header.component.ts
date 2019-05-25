import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../service/firebase.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ImageSnippet, user} from '../../service/data-model';
import {
  AngularFireStorage,
  AngularFireUploadTask
} from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
declare var $: any;


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

  file1: any;
  file2: any;
  file3: any;

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  isHovering: boolean;
  progrees: any = '';

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
    this.progrees = 'Subiendo imágenes...';
    this.firstFormGroup = this.createMyForm();
    this.secondFormGroup = this.createMyform2();

    //Display Text por sesion
    let item = localStorage.getItem('userSession');
    console.log(item)
    if(item == null){
      
    }


  } 

  closeModal(){
    $(document).ready(function(){ 
      $("#exampleModal").modal("hide");
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
    });
  }

  startUpload(event: FileList){

    console.log(event.item(0))
    const file: File = event.item(0);
    const _reader = new FileReader();

    console.log("Fuera del reader")
    this.selectedFile1 = new ImageSnippet('', file);
    this.selectedFile1.pending = true;
    let base = _reader.result;
    console.log(base)
    // reader.addEventListener('load', (event: any) => {
      // console.log("EN");
      // this.selectedFile1 = new ImageSnippet(event.target.result, file);
      // this.selectedFile1.pending = true;

      // let base64 = reader.result;
      // console.log(base64)

      // this.imgURL1 = base64;
    // });

  }


  processFile(_event: FileList, imageInput: any, selected) {
    if( imageInput.files[0] != undefined ){
      const file: File = imageInput.files[0];
      const reader = new FileReader();
  
     reader.addEventListener('load', (event: any) => {
        console.log(event.result)
        
        if(selected == '1'){
        
          this.selectedFile1 = new ImageSnippet(event.target.result, file);
          this.selectedFile1.pending = true;

          this.file1 = _event.item(0);
    
          let base64 = reader.result;
          console.log(this.selectedFile1.file);

          this.imgURL1 = base64;
        }else if(selected == '2'){
          this.selectedFile2 = new ImageSnippet(event.target.result, file);
          this.selectedFile2.pending = true;
    
          this.file2 = _event.item(0);


          let base64 = reader.result;

          this.imgURL3 = base64;       
        }else{
          this.selectedFile3 = new ImageSnippet(event.target.result, file);
          this.selectedFile3.pending = true;

          this.file3 = _event.item(0);

    
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

    if(this.file1 != undefined && this.file2 != undefined && this.file3 != undefined){
      this.uploadImages(this.file1, this.file2, this.file3);
    }else{
      
    }



  }


  create(l,a,c){
    this.progrees = 'Registrando usuario...';

    console.log(l);
    console.log(a)
    console.log(c);

    let data = this.firstFormGroup.value;
    let us = new user();
    us.tipo =  data["tipo"];
    us.name = data["name"];
    us.rut = data["rut"];
    us.direccion = data["direccion"];
    us.celular = data["cel"];
    us.correo = data["email"];
    us.pass = data["pass"];
    us.licencia = l;
    us.antecedentes = a;
    us.carnet = c;

    this.fire.register(us).then((data) => {
      console.log(data);
      this.progrees = 'Login usuario...';
      //USUARIO CREADO, Falta hacer el login y cambiar ventanas

      // this.fire.loginInFirebase(data['email'], data["pass"])

    });
    

  }

  uploadImages(file1: any, file2: any, file3: any){

    let user = this.firstFormGroup.value["email"];

    const path1 = `photos/DocUser/${user}${new Date().getTime()}_${'Licencia'}`;
    const path2 = `photos/DocUser/${user}${new Date().getTime()}_${'Antecedentes'}`;
    const path3 = `photos/DocUser/${user}${new Date().getTime()}_${'Carnet'}`;

    let task1 = this.storage.upload(path1, file1);
    let task2 = this.storage.upload(path2, file2);
    let task3 = this.storage.upload(path3, file3);


    this.percentage = task3.percentageChanges();

    task1.then(() => {

      this.storage.ref(path1).getDownloadURL().subscribe(licencia => {
        
        task2.then(() => {
          this.storage.ref(path2).getDownloadURL().subscribe(antecedentes => {
            task3.then(() => {

              this.storage.ref(path3).getDownloadURL().subscribe(carnet => {
                this.create(licencia,antecedentes,carnet);


              });
        
            });


          });
    
        });


      });

    });



    

  }
  // Determines if the upload task is active
  isActive(snapshot) {
    return (
      snapshot.state === 'running' &&
      snapshot.bytesTransferred < snapshot.totalBytes
    );
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  private createMyForm() {
    return this._formBuilder.group({
      tipo: ['usuario', Validators.required],
      name: ['', Validators.required],
      rut: ['', Validators.required],
      email: ['', Validators.required],
      cel: ['', Validators.required],
      pass: ['', Validators.required],
      direccion: ['']

    });

  }

  private createMyform2(){
    return this._formBuilder.group({

    })
  }

  nextSubmit(){
    let a = this.firstFormGroup.value;
    console.log(a);
    
    // this.usuario = { tipo: '', name: '', rut: '', correo: '', celular: '', direccion: '',
    //  pass: '', licencia: '', antecedentes: '', carnet: ''};

    // this.usuario.;
    // let us = new user();
    // us.tipo = "HOLA";
    // console.log(us);
  
    // this.fire.register(us);
  }







  registro(){
    this.login = false;
  }

  predeterm(){
    this.login = true;
  }
  



}
