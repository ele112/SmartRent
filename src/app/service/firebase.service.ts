
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

// import {} from '';
@Injectable()
export class FirebaseService {


    constructor( public db: AngularFirestore,
         public auth: AngularFireAuth){

    }

    loginInFirebase(email, pass){
        return this.auth.auth.signInWithEmailAndPassword(email, pass);
    }

    logoutFirebase(){
        return this.auth.auth.signOut();
    }

    createUserAccount(user, pass){
        return this.auth.auth.createUserWithEmailAndPassword(user, pass);
    
    }

    stateLogin(){
        this.auth.authState.subscribe( data => {
            console.log(data);
        })
    }

    register(user){
       console.log(user)
        return this.db.collection('users').add({
            type: user.tipo,
            name: user.name,
            rut: user.rut,
            mail: user.correo,
            phone: user.celular,
            address: user.direccion,
            passwd: user.pass,
            URL_licencia: user.licencia,
            URL_antecedentes: user.antecedentes,
            URL_carnet: user.carnet
        })
    }


    addPublish(pub){
        return this.db.collection('publicaciones').add({
            id: pub.id,
            titulo: pub.titulo,
            categoria: pub.categoria,
            comuna: pub.comuna,
            patente: pub.patente,
            modelo: pub.modelo, 
            marca: pub.marca, 
            anio: pub.anio, 
            combustible: pub.combustible,
            transmision: pub.transmision,
            cilindraje: pub.cilindraje,
            capacidad: pub.capacidad,
            valorDia: pub.valorDia,
            valorHora: pub.valorHora,
            descripcion: pub.descripcion,
            fechaPublicacion: pub.fechaPublicacion,
            publicante: pub.publicante,
            img1: pub.img1, 
            img2: pub.img2,
            img3: pub.img3, 
            img4: pub.img4 
        })
    }
    
    getLoginUser(){
        return this.db.collection("/users").get();
    }

    getForQuery(){
        return this.db.collection('/publicaciones', ref => ref.where('publicante','==','193454542'));
    }

    getFichaForId(id){
        return this.db.collection('/publicaciones', ref => ref.where('id','==',id)).valueChanges();
    }
    getNameForRut(rut){
        return this.db.collection('/users', ref => ref.where('rut','==', rut)).valueChanges();
    }

    /**
     * 
     * @param id Id de la publicacion
     * @param rut rut del solicitante
     */
    addRequest(docId, data){

        return this.db.doc('/publicaciones/'+docId).update({
            solicitudes: data
        });
    }



    removeSolicitud(docId){
        return this.db.doc('/solicitudes/'+docId).delete();
    }

    getDocumentIdRequest(id){
        return this.db.collection('/solicitudes', ref => ref.where('idSolicitud','==', id)).snapshotChanges();
    }


    existMail(mail){
        return this.db.collection('/users', ref => ref.where('mail','==', mail)).valueChanges();
    }

    requestSended(rut){
        return this.db.collection('/solicitudes', ref => ref.where('rutSolicitante', '==', rut)).valueChanges();
    }

    getPublishForRut(rut){
        return this.db.collection('/publicaciones', ref => ref.where('publicante','==', rut)).valueChanges();

    }

    getDocumentId(id){
        return this.db.collection('/publicaciones', ref => ref.where('id','==', id)).snapshotChanges();
    }

    searchForRut(rut){
        return this.db.collection('/publicaciones', ref => ref.where('publicante', '==', rut)).valueChanges();
    }

    searchForCategoria(categoria){
        return this.db.collection('/publicaciones', ref => ref.where('categoria','==',categoria)
        .orderBy('fechaPublicacion', 'desc')).valueChanges();
    }
    searchForComuna(comuna){
        return this.db.collection('/publicaciones', ref => ref.where('comuna','==',comuna)
        .orderBy('fechaPublicacion', 'desc')).valueChanges();
    }

    searchPublished(comuna, categoria){
        return this.db.collection('/publicaciones', ref => ref.where('comuna','==',comuna).where('categoria','==',categoria)
        .orderBy('fechaPublicacion', 'desc')).valueChanges();
    }

    addNewRequest(el){
        return this.db.collection('/solicitudes').add({
            idSolicitud: el.idSolicitud,
            idPublicacion: el.idPublicacion,
            rutSolicitante: el.rutSolicitante,
            tituloPublicacion: el.tituloPublicacion,
            fechaSolicitud: el.fechaSolicitud,
            estado: el.estado,
            comentarioSolicitud: el.comentarioSolicitud,
        });
    }

    removePublish(id){
        let self = this;
        return new Promise(function(resolve, reject){
            let rr = self.db.collection('/publicaciones', ref => ref.where('id', '==', id)).snapshotChanges().subscribe((data) =>{
                rr.unsubscribe();
                let docId = data[0]['payload']['doc']['id'];
                console.log(docId);
                self.db.doc('/publicaciones/'+docId).delete().then(() => {
                    resolve('OK');
                }, (err) => {
                    reject('Error '+err);
                });
            })
        });
      
    }

    // return this.db.doc('/solicitudes/'+docId).delete();

    getAllPublications(){
        // Devuelve todas las publicaciones realizadas, para ser desplegadas en el catalogo.
       return this.db.collection('/publicaciones', ref => ref.orderBy('fechaPublicacion', 'desc')).valueChanges();
    }


    getUsers(){

        return this.db.collection('/users').snapshotChanges();
    }


    setNewUser(us){
        // Registra un nuevo usuario
       return this.db.collection('users').add({
            usuarioTipo: us.tipo,
            usuarioName: us.name,
            usuarioRut: us.rut,
            usuarioCorreo: us.correo,
            usuarioCelular: us.celular,
            usuarioDireccion: us.direccion,
            usuarioPass: us.pass,
            usuarioUrlLicencia: us.licencia,
            usuarioUrlAntecedentes: us.antecedentes,
            usuarioUrlCarnet: us.carnet
        });
    }



}