import { Injectable } from '@angular/core';
import { FirebaseCodeErrorEnmu } from '../Utils/firebase-code-error';

@Injectable({
  providedIn: 'root'
})
export class FirebaseCodeErrorService {

  constructor() { }

  firebaseError(code : string){
    switch(code){
      case FirebaseCodeErrorEnmu.EmailAlreadyInUse :
        return 'El usuario ys exite'
      case FirebaseCodeErrorEnmu.WeakPassword:
        return 'La contraseña es muy debil'
      case FirebaseCodeErrorEnmu.InvalidEmail:
        return 'Correo invalido'
      case FirebaseCodeErrorEnmu.WrongPassword :
       return 'Contraseña incorrecta'
      case FirebaseCodeErrorEnmu.UserNotFount:
        return 'El usuario no exite'
      case FirebaseCodeErrorEnmu.MissingPassword:
        return 'Completar los datos'
      default:
       return 'Error desconocido'
    }
}


}
