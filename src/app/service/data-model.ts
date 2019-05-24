export class user{
    tipo = "";
    name = "";
    rut = "";
    correo = "";
    celular = "";
    direccion = "";
    pass = "";
    licencia = "";
    antecedentes = "";
    carnet = "";
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
    lugarEntrega = "";
    fechaPublicacion = "";
    imagenUrl_1 = "";
    imagenUrl_2 = "";
    imagenUrl_3 = "";
    imagenUrl_4 = "";

}   

export class solicitud{
    publicante = "";
    solicitante = "";
    fechaSolicitud = "";
    Comentarios = "";
    contacto = "";
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
