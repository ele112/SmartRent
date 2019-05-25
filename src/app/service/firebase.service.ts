
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
// import {} from '';
@Injectable()
export class FirebaseService {


    constructor( public db: AngularFirestore, public auth: AngularFireAuth){

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

    
    getLoginUser(){
        return this.db.collection("/users").get();
    }


    getPublicactionForUser(id){
        // Recibe el ID del usuario y devuelve todas las solicitudes realizadas por usuario.

    }
    getAllPublications(){
        // Devuelve todas las publicaciones realizadas, para ser desplegadas en el catalogo.
       return this.db.collection('/publicaciones').snapshotChanges();
    }

    getPublicationsForFilter(filter: any){
        // Devuelve todas las publicaciones segun el filtro aplicado.

    }

    getRequestSendForUser(usekey: any){
        // Devuelve todas las solicitudes enviadas por un usuario.

    }

    getRequestReceivedForUser(userkey: any){
        // Devuelve todas las solicitudes enviadas por un usuario.

    }

    getUsers(){

        return this.db.collection('/users').snapshotChanges();
    }

    setNewPublicationInUser(pub){
        //ID del usuario para agregar como una publicacion de el
    }

    setAllPublicacion(){
        //Despues de agregar la publicacion al usuario se agrega en las generales

    }

    sendNewRequest(req){
        //Solicitudes enviadas por usuarios
    }

    setNewRequestInPublication(){
        // ID del usuario y ID de la publicacion. Solicitudes seteadas en las recibidas por usuario

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

    deletePublicaction(){
        //Recibe el ID del usuario
    }






}