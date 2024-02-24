import { Component, OnInit, AfterViewInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ModalHeroesComponent } from '../../Nodales/modal-heroes/modal-heroes.component';
import { Heroes } from 'src/app/Interfaces/heroes';
import { HeroesService } from 'src/app/Services/heroes.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent  {
  data:any[]=[];
  info:any={};
  infos:any={};
  id:any;
  iddata:any[]=[]
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(private dialog:MatDialog,
    private _heroesServicio: HeroesService,
    private _utilidadServicio: UtilidadService) { 
      this.Heroes();
    }

    Heroes(){
      this._heroesServicio.lista().subscribe((resp:any) =>{
        this.data=resp;
        console.log(this.data);
      })
      
    }

    
    // seleccionarHeroes(id: any) {
    //   this._heroesServicio.seleccionPersonaje(id).subscribe((resp: any) => {
    //     const info = resp;
    //     console.log(info);
    //     const dialogRef = this.dialog.open(ModalHeroesComponent, {
    //       disableClose: true,
    //       data: info, // Pasar la respuesta del servicio al diálogo modal
    //     });
    
    //     dialogRef.afterClosed().subscribe(result => {
    //       if (result) {
    //         this.Heroes();
    //       }
    //     });
    //   });
    // }

    seleccionarHeroes(id: any) {
      this._heroesServicio.seleccionPersonaje(id)
        .subscribe((resp: any) => {
          this.info = resp;
          this.id = id;
    
          // Abre el modal y pasa los datos como datos de entrada
          const dialogRef = this.dialog.open(ModalHeroesComponent, {
            disableClose: true,
            id: this.id,
            data: this.info 
            
          });
        });
    }
    



  nuevoHeroe(){
   this.dialog.open(ModalHeroesComponent,{
    disableClose:true
  }).afterClosed()
  }

  


 EliminarHeroe(id:any,x:number){
   Swal.fire({
    title:"¿Desea eliminar el heroe?",
    icon:"warning",
    confirmButtonColor:'#3085d6',
    confirmButtonText: 'Si,eliminar',
    showCancelButton:true,
    cancelButtonColor:'#d33',
    cancelButtonText:'No,volver'
   }).then((resultado)=> {
    if(resultado.isConfirmed){
      this.data.splice(x,1);
      this._heroesServicio.eliminar(id)
    .subscribe(resp=> this._utilidadServicio.mostrarAlerta("Heroe Eliminado","Exito"));
    }
   })
 }


}
