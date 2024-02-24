import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder , FormGroup , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { FirebaseCodeErrorService } from 'src/app/Services/firebase-code-error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUsuario:FormGroup;
  constructor(private fb:FormBuilder , 
    private afAuth:AngularFireAuth , 
    private _utilidadServicio:UtilidadService,
    private router:Router ,
    private firebaseError:FirebaseCodeErrorService) { 
   this.loginUsuario = this.fb.group({
    email:['',Validators.required],
    password: ['',Validators.required]
   })
  }

  ngOnInit(): void {
  }

  login(){
    const email = this.loginUsuario.value.email;
    const password = this.loginUsuario.value.password;

    this.afAuth.signInWithEmailAndPassword(email , password).then((user)=>{
      console.log(user);
      this.router.navigate(['/pages/Heroes'])
    }).catch((error)=>{
      this._utilidadServicio.mostrarAlerta(this.firebaseError.firebaseError(error.code),"Error")
      console.log(error)
    })

  }
}
