export class user{
    tipo: string;
    name: string;
    rut: string;
    correo: string;
    celular: string;
    direccion: string;
    pass: string;
    licencia: string;
    antecedentes: string;
    carnet: string;

    constructor(){ }
}

export class publicacion{
    publicante = "";
    categoria = "";
    patente = "";
    modelo = "";
    marca = "";
    anio = "";
    combustible = "";
    transmision = "";
    cilindraje = "";
    capacidadCarga = "";
    valorDia = "";
    valorHora = "";
    fechaPublicacion = "";
    imagenUrl_1 = "";
    imagenUrl_2 = ""; 
    imagenUrl_3 = "";
    imagenUrl_4 = "";

}   

export class solicitud{
    idPubl = "";
    idSol = "";
    solicitante = "";
    fechaSolicitud = "";
    comentario = "";
    titulo = "";
    estado = "";
}


export class ImageSnippet {
    pending: boolean = false;
    status: string = 'init';
  
    constructor(public src: string, public file: File) {}
}
  
export class ImageUpload {
    $key: string;
    file: File;
    name: string;
    url: string;
    progress: number;
    createdAt: Date = new Date();

    constructor(file: File){
        this.file = file;
    }
}
