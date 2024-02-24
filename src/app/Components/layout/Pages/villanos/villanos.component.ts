import { Component, OnInit } from '@angular/core';
import { VillanosService } from 'src/app/Services/villanos.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import Swal from 'sweetalert2';
import { ModalVillanoComponent } from '../../Nodales/modal-villano/modal-villano.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-villanos',
  templateUrl: './villanos.component.html',
  styleUrls: ['./villanos.component.css']
})
export class VillanosComponent implements OnInit {

  data:any[]=[];
  info:any={};
  infos:any={};
  id:any;
  constructor( private villanoService:VillanosService , private dialog:MatDialog , private utilidad:UtilidadService) {
    this.Villano();
   }

  ngOnInit(): void {
  }


  Villano(){
    this.villanoService.lista().subscribe((resp:any) =>{
      this.data=resp;
      console.log(this.data);
    })
    
  }

  

  seleccionarVillano(id: any) {
    this.villanoService.seleccionPersonaje(id)
      .subscribe((resp: any) => {
        this.info = resp;
        this.id = id;
  
        // Abre el modal y pasa los datos como datos de entrada
        const dialogRef = this.dialog.open(ModalVillanoComponent, {
          disableClose: true,
          id: this.id,
          data: this.info 
        });
      });
  }
  



nuevoVillano(){
 this.dialog.open(ModalVillanoComponent,{
  disableClose:true
}).afterClosed()
}




EliminarVillano(id:any,x:number){
 Swal.fire({
  title:"¿Desea eliminar el villano?",
  icon:"warning",
  confirmButtonColor:'#3085d6',
  confirmButtonText: 'Si,eliminar',
  showCancelButton:true,
  cancelButtonColor:'#d33',
  cancelButtonText:'No,volver'
 }).then((resultado)=> {
  if(resultado.isConfirmed){
    this.data.splice(x,1);
    this.villanoService.eliminar(id)
  .subscribe(resp=> this.utilidad.mostrarAlerta("Villano Eliminado","Exito"));
  }
 })
}


}



