import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './Components/layout/layout.component';
import { SharedModule } from './Reutilizable/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './Components/login/login.component';
import {AngularFireModule} from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { RegistrarComponent } from './Components/registrar/registrar.component';
import { RecuperarComponent } from './Components/recuperar/recuperar.component';



@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent,
    RegistrarComponent,
    RecuperarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl:'never'}),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
