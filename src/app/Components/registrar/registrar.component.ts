import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormBuilder , Validators} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { Router } from '@angular/router';
import { FirebaseCodeErrorService } from 'src/app/Services/firebase-code-error.service';


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  registrarUsuario:FormGroup;

  constructor(private fb:FormBuilder ,
    private _utilidadServicio:UtilidadService, 
    private afAuth:AngularFireAuth , 
    private router:Router,
    private FirebaseError : FirebaseCodeErrorService ) { 

    this.registrarUsuario = this.fb.group({
      email: ['',[Validators.required , Validators.email]],
      password: ['',[Validators.required,Validators.minLength(6)]],
      repetirPassword: ['',[Validators.required ,Validators.minLength(6) ]],
    })

  }

  ngOnInit(): void {
  }

  registrar(){
    const email = this.registrarUsuario.value.email;
    const password = this.registrarUsuario.value.password;
    const repetirPassword = this.registrarUsuario.value.repetirPassword;

    if(password != repetirPassword){
      return this._utilidadServicio.mostrarAlerta("Las contraseñas no coincienden","Error")
    }

    this.afAuth.createUserWithEmailAndPassword(email , password).then((user) =>{
      this._utilidadServicio.mostrarAlerta("Usuario Registrado","Exito");
      this.router.navigate(['/']);
      console.log(user);
    }).catch((error) =>{
      console.log(error);
       this._utilidadServicio.mostrarAlerta(this.FirebaseError.firebaseError(error.code),"Error")
    }
    );
  }

  

}
