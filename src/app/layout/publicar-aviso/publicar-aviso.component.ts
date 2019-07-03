import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImageSnippet, publicacion } from '../../service/data-model';
import {FirebaseService} from '../../service/firebase.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { NgxSpinnerService } from 'ngx-spinner';

import * as moment from 'moment';

import swal from 'sweetalert';

@Component({
  selector: 'app-publicar-aviso',
  templateUrl: './publicar-aviso.component.html',
  styleUrls: ['./publicar-aviso.component.scss']
})
export class PublicarAvisoComponent implements OnInit {


  publishForm: FormGroup;
  buttonPublish: any;
  selectedFile1: ImageSnippet;
  selectedFile2: ImageSnippet;
  selectedFile3: ImageSnippet;
  selectedFile4: ImageSnippet;
  selectedFile: boolean;

  imgURL1: any = '';
  imgURL2: any = '';
  imgURL3: any = '';
  imgURL4: any = '';
  file1: any;
  file2: any;
  file3: any;
  file4: any;

  _button: boolean;
  cilin: any ='';
  _valorH: any  = '';
  _valorD: any  = '';
  constructor(private _formBuilder: FormBuilder,
    private storage: AngularFireStorage,
    private router: Router,
    private spinner: NgxSpinnerService,
     private fire: FirebaseService,) { }

  ngOnInit() {
    this.publishForm = this.createForm();
    this.buttonPublish = false;
    this.selectedFile = false;
    this._button = false;
  }

  preventInput(event, ti){
    if(ti == 'c'){
      let value=this.cilin;
      if (value >= 99999){
        event.preventDefault()
        this.cilin = parseInt(value.toString().substring(0,5));
      }

    }else if(ti == 'vH'){
      let value2 = this._valorH;
      if (value2 >= 999999999){
        event.preventDefault()
        this._valorH = parseInt(value2.toString().substring(0,7));
      }
    }else if(ti == 'vD'){
      let value3 = this._valorD;
      if (value3 >= 9999999999){
        event.preventDefault()
        this._valorD = parseInt(value3.toString().substring(0,10));
      }
    }

  }

  private createForm() {
    return this._formBuilder.group({
      titulo: ['', Validators.required],
      comuna: ['', Validators.required],
      categoria: ['', Validators.required],
      patente: ['', Validators.required],
      modelo: ['', Validators.required],
      marca: ['', Validators.required],
      anio: ['', Validators.required],
      combustible: ['', Validators.required],
      transmision: [''],
      cilindraje: [''],
      carga: [''],
      valorDia: ['', Validators.required],
      valorHora: ['', Validators.required],
      descripcion: ['']
    });
  }
  
  processFile(_event: FileList, imageInput: any, selected) {
    if (imageInput.files[0] != undefined) {
      const file: File = imageInput.files[0];
      const reader = new FileReader();

      reader.addEventListener('load', (event: any) => {
        console.log(event.result);
        this.selectedFile = true;

        if (selected == '1') {

          this.selectedFile1 = new ImageSnippet(event.target.result, file);
          this.selectedFile1.pending = true;
          this.file1 = _event.item(0);
          let base64 = reader.result;
          this.imgURL1 = base64;

        } else if (selected == '2') {

          this.selectedFile2 = new ImageSnippet(event.target.result, file);
          this.selectedFile2.pending = true;
          this.file2 = _event.item(0);
          let base64 = reader.result;
          this.imgURL2 = base64;

        } else if (selected == '3') {

          this.selectedFile3 = new ImageSnippet(event.target.result, file);
          this.selectedFile3.pending = true;
          this.file3 = _event.item(0);
          let base64 = reader.result;
          this.imgURL3 = base64;

        } else {

          this.selectedFile4 = new ImageSnippet(event.target.result, file);
          this.selectedFile4.pending = true;
          this.file4 = _event.item(0);
          let base64 = reader.result;
          this.imgURL4 = base64;
          this._button = true;

        }

      });

      reader.readAsDataURL(file);

    }

  }


  validaPatente(patente) {
    let combinacion = "";
    patente = patente.trim();
    for (var i = 0; i < patente.length; i++) {
      if (!isNaN(parseInt(patente[i]))) {
        combinacion = combinacion + "N";
      } else {
        combinacion = combinacion + "L";
      }
    }
    console.log(combinacion);
    if (combinacion == "LLNNNN" || combinacion == "LLLLNN" || combinacion == "LLLNNN" || combinacion == "LLNNN") {
      return true;
    } else {
      return false;
    }

  }



  publish() {
    let data = this.publishForm.value;
    console.log(data);
    if (this.file1 != undefined && this.file2 != undefined && this.file3 != undefined && this.file4 != undefined) {
      if (data['titulo'] != "" && data['categoria'] != "" && data['modelo'] != "" &&
        data['marca'] != "" && data['anio'] != "" && data['valorDia'] != "" && data['valorHora'] != "" &&
        data['titulo'] != "") {

        let valida = this.validaPatente(data['patente']);
        if (valida) {

          this.spinner.show();
          //Subiendo Imagenes
          const path1 = `photos/DocPublish/${new Date().getTime()}_${'photo1'}`;
          const path2 = `photos/DocPublish/${new Date().getTime()}_${'photo2'}`;
          const path3 = `photos/DocPublish/${new Date().getTime()}_${'photo3'}`;
          const path4 = `photos/DocPublish/${new Date().getTime()}_${'photo4'}`;

          let task1 = this.storage.upload(path1, this.file1);
          let task2 = this.storage.upload(path2, this.file2);
          let task3 = this.storage.upload(path3, this.file3);
          let task4 = this.storage.upload(path4, this.file4);

          let tasks = []
          task1.then(() => {
            let a1 = this.storage.ref(path1).getDownloadURL().subscribe(data1 => {
              a1.unsubscribe();
              tasks.push({ task1: 'OK', image1: data1 }); this.create(tasks)
            });
          });
          task2.then(() => {
            let a2 = this.storage.ref(path2).getDownloadURL().subscribe(data2 => {
              a2.unsubscribe();
              tasks.push({ task2: 'OK', image2: data2 }); this.create(tasks)
            });
          });
          task3.then(() => {
            let a3 = this.storage.ref(path3).getDownloadURL().subscribe(data3 => {
              a3.unsubscribe();
              tasks.push({ task3: 'OK', image3: data3 }); this.create(tasks)
            });
          });

          task4.then(() => {
            let a4 = this.storage.ref(path4).getDownloadURL().subscribe(data4 => {
              a4.unsubscribe();
              tasks.push({ task4: 'OK', image4: data4 }); this.create(tasks)
            });
          });


        } else {
          swal('', 'Patente no valida', 'warning');
        }


      } else {
        console.log("FAltan campos")
      }



    } else {
      swal('', 'Debe seleccionar todas las imagenes', 'info');
    }


  }

  create(task){

    if(task.length == 4){
      let img1;
      let img2;
      let img3;
      let img4;
      task.forEach(element => {
          if(element['image1'] != undefined){
            img1 = element['image1']

          }else if(element['image2'] != undefined){
            img2 = element['image2']

          }else if(element['image3'] != undefined){
            img3 = element['image3']

          }else{
            img4 = element['image4']
          }
      });

      let item = {image1: img1, image2: img2, image3: img3, image4: img4}

      console.log("creando publicacion");
      let data = this.publishForm.value;

      let pub = new publicacion;
      pub.id = this.random();
      pub.titulo = data['titulo'];
      pub.comuna = data['comuna'];
      pub.categoria = data['categoria'];
      pub.patente = data['patente'];
      pub.modelo = data['modelo'];
      pub.marca = data['marca'];
      pub.anio = data['anio'];
      pub.combustible = data['combustible'];
      pub.transmision = data['transmision'];
      pub.cilindraje = data['cilindraje'];
      pub.capacidad = data['carga'];
      pub.valorDia = data['valorDia'];
      pub.valorHora = data['valorHora'];
      pub.descripcion = data['descripcion'];
      pub.fechaPublicacion = moment().format("DD/MM/YYYY");
      pub.publicante = localStorage.getItem('userRut');
      pub.img1 = item['image1'];
      pub.img2 = item['image2'];
      pub.img3 = item['image3'];
      pub.img4 = item['image4'];

      console.log(pub);
      this.spinner.hide();
      this.fire.addPublish(pub).then(() => {
        swal('','Publicación creada con éxito!', 'success').then(() =>{
          this.router.navigate(['/Home']);
        })
      })


    }


  }


  random() {
    return (Math.floor((Math.random() * 10000) + 1)).toString();
  }





}
