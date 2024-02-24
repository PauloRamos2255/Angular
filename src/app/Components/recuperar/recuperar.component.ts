import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { Router } from '@angular/router';
import { FirebaseCodeErrorService } from 'src/app/Services/firebase-code-error.service';


@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})
export class RecuperarComponent implements OnInit {
 
  recuperar:FormGroup
  constructor(private fb:FormBuilder , 
    private afAuth:AngularFireAuth , 
    private _utilidadServicio:UtilidadService,
    private router:Router ,
    private firebaseError:FirebaseCodeErrorService) { 
      this.recuperar = this.fb.group({
        email: ['',[Validators.required , Validators.email]],
      })
    }

  ngOnInit(): void {
  }


  Recuperar(){
    const email = this.recuperar.value.email;
    this.afAuth.sendPasswordResetEmail(email).then(()=>{
      this._utilidadServicio.mostrarAlerta('Recupecion de Contraseña',"Exitosa")
      this.router.navigate(['/'])
    }).catch((error)=>{
       this._utilidadServicio.mostrarAlerta(this.firebaseError.firebaseError(error.code),"Error");
    } )
  }

}
