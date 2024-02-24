import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { HeroesComponent } from './Pages/heroes/heroes.component';
import { VillanosComponent } from './Pages/villanos/villanos.component';

const routes: Routes = [{
  path:'',
  component:LayoutComponent,
  children:[
    {
      path:"Heroes",component:HeroesComponent
    },
    {
      path:"Villanos",component:VillanosComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
