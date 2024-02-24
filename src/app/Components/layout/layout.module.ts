import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { HeroesComponent } from './Pages/heroes/heroes.component';
import { VillanosComponent } from './Pages/villanos/villanos.component';
import { SharedModule } from 'src/app/Reutilizable/shared/shared.module';
import { ModalHeroesComponent } from './Nodales/modal-heroes/modal-heroes.component';
import { ModalVillanoComponent } from './Nodales/modal-villano/modal-villano.component';


@NgModule({
  declarations: [
    HeroesComponent,
    VillanosComponent,
    ModalHeroesComponent,
    ModalVillanoComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule
  ]
})
export class LayoutModule { }
