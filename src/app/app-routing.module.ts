import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{LoginComponent} from '../app/login/login.component';
import{RegisterComponent} from '../app/register/register.component';
import {AppComponent} from '../app/app.component';
import { MarcheeComponent } from './marchee/marchee.component';
import { PortfeuilleComponent } from './portfeuille/portfeuille.component';
import { CointableComponent } from './cointable/cointable.component';

const routes: Routes = [
  { path:'', component:CointableComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'portfolio', component:PortfeuilleComponent},
  {path:'coin/:id', component:MarcheeComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
