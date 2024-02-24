import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './Components/layout/layout.component';
import { LoginComponent } from './Components/login/login.component';
import { RecuperarComponent } from './Components/recuperar/recuperar.component';
import { RegistrarComponent } from './Components/registrar/registrar.component';

const routes: Routes = [
  {path:'',component:LoginComponent,pathMatch:"full"},
  {path:'login',component:LoginComponent,pathMatch:"full"},
  {path:'registrar',component:RegistrarComponent,pathMatch:"full"},
  {path:"recuperar",component:RecuperarComponent,pathMatch:"full"},
  {path:'pages',loadChildren: () => import("./Components/layout/layout.module").then(m => m.LayoutModule)},
  {path:'**',redirectTo:'login',pathMatch:"full"}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
 export class AppRoutingModule { }
