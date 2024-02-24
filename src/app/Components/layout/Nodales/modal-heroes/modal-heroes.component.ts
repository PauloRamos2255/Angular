import { Component, OnInit ,Inject, inject, Input} from '@angular/core';
import { FormBuilder,FormGroup,Validators} from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroes } from 'src/app/Interfaces/heroes';
import { HeroesService } from 'src/app/Services/heroes.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({

  selector: 'app-modal-heroes',
  templateUrl: './modal-heroes.component.html',
  styleUrls: ['./modal-heroes.component.css']
})
export class ModalHeroesComponent implements OnInit {
  data:any[]=[];
  id:any
  formularioHeoes:FormGroup;
  tituloAccion:string ="Agregar";
  botonAccion:string = "Guardar";
  constructor(
    private modalActual:MatDialogRef<ModalHeroesComponent>,
    @Inject(MAT_DIALOG_DATA) public datosHeroes:Heroes,
    private fb:FormBuilder,
    private _heroeServicio:HeroesService,
    private _utilidadServicio:UtilidadService,
    private cdr: ChangeDetectorRef

  ) { 
    this.formularioHeoes = this.fb.group({
      nombre: ['',Validators.required],
      seudonimo: ['',Validators.required],
      Poder: ['',Validators.required],
    });

    if(this.datosHeroes != null){
      this.tituloAccion = "Editar";
      this.botonAccion = "Actulizar";
    }

  }

  ngOnInit(): void {
    if(this.datosHeroes != null){
      this.formularioHeoes.patchValue({
        nombre: this.datosHeroes.nombre,
        seudonimo: this.datosHeroes.seudonimo,
        Poder: this.datosHeroes.Poder,
      })
    }
    this.cargarHeroes();
  }

  guardarEditar_Heroe(id: any) {
    if (!this.formularioHeoes.valid) {
      this.formularioHeoes.markAllAsTouched();
      return;
    }
  
    const personaje: any = {
      nombre: this.formularioHeoes.value.nombre,
      seudonimo: this.formularioHeoes.value.seudonimo,
      Poder: this.formularioHeoes.value.Poder,
    };
  
    if (this.datosHeroes != null) {
      personaje.id = id;
       console.log(id)
      this._heroeServicio.editar(personaje).subscribe(resp => {
        this._utilidadServicio.mostrarAlerta("Heroe Actualizado", "Exito");
        this.modalActual.close("true");
      });
    } else {
      this._heroeServicio.guardar(personaje).subscribe(resp => {
        // Llama a cargarHeroes() después de guardar
        this.cargarHeroes();
        this._utilidadServicio.mostrarAlerta("Heroe Registrado", "Exito");
        this.modalActual.close("true");
      });
    }
  }
  
  
  
  

  cargarHeroes() {
    this._heroeServicio.lista().subscribe((resp: any) => {
      this.data = resp;
      console.log(this.data);
      this.cdr.detectChanges(); // Forzar la detección de cambios
    });
  }
  

}


//   const _heroes:Heroes={
  //     idHeroes: this.datosHeroes == null?0:this.datosHeroes.idHeroes,
  //     nombre : this.formularioHeoes.value.nombre,
  //     seudonimo : this.formularioHeoes.value.seudonimo,
  //     poder : this.formularioHeoes.value.poder
  //   }
  //   if(this.datosHeroes == null){
  //     this._heroeServicio.guardar(_heroes).subscribe({
  //       next:(data) => {
  //         if(data.status){
  //           this._utilidadServicio.mostrarAlerta("El usuario fue registrado","Exito");
  //           this.modalActual.close("true")
  //         }else{
  //           this._utilidadServicio.mostrarAlerta("No se puso registrar el Heroe","Error")
  //         }
  //       },
  //       error:(e) => {}
  //     })
  //   }else{
  //     this._heroeServicio.editar(_heroes).subscribe({
  //       next:(data) => {
  //         if(data.status){
  //           this._utilidadServicio.mostrarAlerta("El usuario fue actulizado","Exito");
  //           this.modalActual.close("true")
  //         }else{
  //           this._utilidadServicio.mostrarAlerta("No se puso actulizar el Heroe","Error")
  //         }
  //       },
  //       error:(e) => {}
  //     })
  //   }
  // }