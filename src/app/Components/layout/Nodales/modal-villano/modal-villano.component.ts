import { Component, OnInit , Inject} from '@angular/core';
import { FormBuilder,FormGroup,Validators} from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VillanosService } from 'src/app/Services/villanos.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { ChangeDetectorRef } from '@angular/core';
import { Villanos } from 'src/app/Interfaces/villanos';



@Component({
  selector: 'app-modal-villano',
  templateUrl: './modal-villano.component.html',
  styleUrls: ['./modal-villano.component.css']
})
export class ModalVillanoComponent implements OnInit {

  data:any[]=[];
  id:any
  formularioVillano:FormGroup;
  tituloAccion:string ="Agregar";
  botonAccion:string = "Guardar";
  constructor(
    private modalActual:MatDialogRef<ModalVillanoComponent>,
    @Inject(MAT_DIALOG_DATA) public datosVillanos:Villanos,
    private fb:FormBuilder,
    private villano:VillanosService,
    private _utilidadServicio:UtilidadService,
    private cdr: ChangeDetectorRef

  ) { 
    this.formularioVillano = this.fb.group({
      nombre: ['',Validators.required],
      seudonimo: ['',Validators.required],
      objetivo: ['',Validators.required],
    });

    if(this.datosVillanos != null){
      this.tituloAccion = "Editar";
      this.botonAccion = "Actulizar";
    }

  }

  ngOnInit(): void {
    
    if(this.datosVillanos != null){
      this.formularioVillano.patchValue({
        nombre: this.datosVillanos.nombre,
        seudonimo: this.datosVillanos.seudonimo,
        objetivo: this.datosVillanos.objetivo,
      })
    }
    this.cargarVillano();
  }

  guardarEditar_Villano(id: any) {
    if (!this.formularioVillano.valid) {
      this.formularioVillano.markAllAsTouched();
      return;
    }
  
    const personaje: any = {
      nombre: this.formularioVillano.value.nombre,
      seudonimo: this.formularioVillano.value.seudonimo,
      objetivo: this.formularioVillano.value.objetivo,
    };
  
    if (this.datosVillanos != null) {
      personaje.id = id;
       console.log(id)
      this.villano.editar(personaje).subscribe(resp => {
        this._utilidadServicio.mostrarAlerta("Heroe Actualizado", "Exito");
        this.modalActual.close("true");
      });
    } else {
      this.villano.guardar(personaje).subscribe(resp => {
        // Llama a cargarHeroes() después de guardar
        this._utilidadServicio.mostrarAlerta("Heroe Registrado", "Exito");
        this.modalActual.close("true");
      });
    }
  }
  


  cargarVillano() {
    this.villano.lista().subscribe((resp: any) => {
      this.data = resp;
      console.log(this.data);
      this.cdr.detectChanges(); // Forzar la detección de cambios
    });
  }

}
