
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class FirebaseService {


    constructor( public db: AngularFirestore, public auth: AngularFireAuth){

    }

    loginInFirebase(email, pass){
        this.auth.auth.signInWithEmailAndPassword(email, pass).then(data => {
            console.log(data)
        });
    }

    logoutFirebase(){
        this.auth.auth.signOut().then(data => {
            console.log(data)
        });
    }

    createUserAccount(user, pass){
        this.auth.auth.createUserWithEmailAndPassword(user, pass).then(data => {
            console.log(data)
        });
    }

    stateLogin(){
        this.auth.authState.subscribe( data => {
            console.log(data);
        })
    }

    getLoginUser(){
        // Retorna si el login es correcto
        
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

    getUsersForEmail(email: any){
        // Devuelve un usuario buscado por el email, con el fin de obtener su id
        
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