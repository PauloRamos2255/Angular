import { Injectable } from '@angular/core';
import{HttpClient}from "@angular/common/http";
import { Observable , map} from 'rxjs';
import{environment} from "src/environments/environment";
import { ResponseApi } from '../Interfaces/response-api';
import { Villanos } from '../Interfaces/villanos';

@Injectable({
  providedIn: 'root'
})
export class VillanosService {

  private url:string = environment.endpoint +"/Villano.json"
  private url2:string = "https://tadiadmin-default-rtdb.firebaseio.com";
  constructor(private http:HttpClient) { }
  lista(){
    return this.http.get(`${this.url}/`)
     .pipe(
       map((resp:any)=>{
         const res:any=[];
         Object.keys(resp).forEach(key=>{
           const person:any=resp[key];
           person.id=key;
           res.push(person);
         })
         return res;
       })
     )
  }

  guardar(villano:any){
    return this.http.post(`${this.url}/`,villano)
  }

  seleccionPersonaje(id:any){
    return this.http.get(`${this.url2}/Villano/${id}.json`);
  }

  editar(Villano:any){
    const idTemp={
      ...Villano
    }

    delete idTemp.id;

    return this.http.put(`${this.url2}/Villano/${Villano.id}.json`,idTemp);
  }

  eliminar(id:any){
    return this.http.delete(`${this.url2}/Villano/${id}.json`);
  }
}
