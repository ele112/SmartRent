import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ImageSnippet, user} from '../../service/data-model';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from '../../service/firebase.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login:boolean;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  loginFormGroup: FormGroup;
  progrees: string;

  imgURL1: any = '';
  imgURL2: any = '';
  imgURL3: any = '';
  selectedFile1: ImageSnippet;
  selectedFile2: ImageSnippet;
  selectedFile3: ImageSnippet;
  file1: any;
  file2: any;
  file3: any;

  constructor(private sharedService:SharedService, 
          private _formBuilder: FormBuilder,
          public fire: FirebaseService, 
          private storage: AngularFireStorage,
          private route: ActivatedRoute,
          private router: Router,
          private db: AngularFirestore, ) {
            // this.fire.getUsers().subscribe((data) => {
            //   console.log(data);
            //   console.log(data['payload'].['doc'].data())
            // })
  }

  ngOnInit() {
    this.sharedService.statusPanel.next(false);
    this.login = true;
    this.firstFormGroup = this.createForm1();
    this.secondFormGroup = this.createForm2();
    this.loginFormGroup = this.createForm3();
    this.progrees = 'Subiendo imágenes...';

  }

  ngOnDestroy(){
    this.sharedService.statusPanel.next(true);
  }

  registro(){
    this.login = false;
  }

  private createForm1(){
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

  private createForm2(){
    return this._formBuilder.group({});
  }

  private createForm3(){
    return this._formBuilder.group({
      email: ['', Validators.required],
      pass: ['', Validators.required]
    })
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
      });
      reader.readAsDataURL(file);
    }
  
  }

  
  createAccount(){
    if(this.file1 != undefined && this.file2 != undefined && this.file3 != undefined){
      this.uploadImages(this.file1, this.file2, this.file3);
    }else{
      
    }
  }

  uploadImages(file1: any, file2: any, file3: any){

    let user = this.firstFormGroup.value["email"];

    const path1 = `photos/DocUser/${user}${new Date().getTime()}_${'Licencia'}`;
    const path2 = `photos/DocUser/${user}${new Date().getTime()}_${'Antecedentes'}`;
    const path3 = `photos/DocUser/${user}${new Date().getTime()}_${'Carnet'}`;
    let task1 = this.storage.upload(path1, file1);
    let task2 = this.storage.upload(path2, file2);
    let task3 = this.storage.upload(path3, file3);

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
      console.log(us.correo);
      console.log(us.pass);
      console.log(us.name);

      this.fire.createUserAccount(us.correo, us.pass).then((data) => {

          console.log(data);
          console.log(data.user);
          console.log(data.user.uid);

          this.fire.loginInFirebase(us.correo, us.pass).then((data2) => {
            console.log(data2);
  
            let log = {status: 'login', name: us.name};
            this.sharedService.statusLogIn.next(log);
            localStorage.setItem('userLoged', 'login');
            localStorage.setItem('userName', us.name);
            this.router.navigate(['/Home']);
  
          });

        


      }, err => {
        console.log(err)
        console.log(err['code']);
        if(err['code'] == 'auth/email-already-in-use'){
          swal('No se logro crear su cuenta', 'el correo ingresado ya se encuentra en uso', 'warning').then(() =>{
              location.reload();

          });

        }
      });
    });
    
  }

  iniciarSesion(){
    let data = this.loginFormGroup.value;
    this.fire.loginInFirebase(data['email'], data['pass']).then(user => {
      console.log(user);
      console.log(user['uid']);

      // this.fire.getAllPublications


    })
  }




}
