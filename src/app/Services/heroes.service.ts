import { Injectable } from '@angular/core';

import{HttpClient}from "@angular/common/http";
import { Observable, map } from 'rxjs';
import{environment} from "src/environments/environment";
import { ResponseApi } from '../Interfaces/response-api';
import { Heroes } from '../Interfaces/heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url:string = environment.endpoint +"/Heores.json"
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

  guardar(heroes:any){
    return this.http.post(`${this.url}/`,heroes)
  }

  seleccionPersonaje(id:any){
    return this.http.get(`${this.url2}/Heores/${id}.json`);
  }

  editar(Heroes:any){
    const idTemp={
      ...Heroes
    }

    delete idTemp.id;

    return this.http.put(`${this.url2}/Heores/${Heroes.id}.json`,idTemp);
  }

  eliminar(id:any){
    return this.http.delete(`${this.url2}/Heores/${id}.json`);
  }

}
