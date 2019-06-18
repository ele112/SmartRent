import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-publicar-aviso',
  templateUrl: './publicar-aviso.component.html',
  styleUrls: ['./publicar-aviso.component.scss']
})
export class PublicarAvisoComponent implements OnInit {


  publishForm: FormGroup;
  buttonPublish: any;
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.publishForm = this.createForm();
    this.buttonPublish = false;
  }

  private createForm(){
    return this._formBuilder.group({
      titulo: ['', Validators.required],
      categoria: ['', Validators.required],
      patente: ['', Validators.required],
      modelo: ['',Validators.required],
      marca: ['', Validators.required],
      anio: ['', Validators.required],
      combustible: ['', Validators.required],
      transmision: [''],
      cilindraje: ['', Validators.required],
      carga: [''],
      valorDia: ['', Validators.required],
      valorHora: ['', Validators.required],
      descripcion: ['']
    });
  }



  publish(){
    
  }


}
