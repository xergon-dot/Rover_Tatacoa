import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CamarasComponent } from './components/camaras/camaras.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { SensoresComponent } from './components/sensores/sensores.component';

const routes: Routes = [
  {path: 'home', component: MainPageComponent},
  {path: 'cameras', component: CamarasComponent},
  {path: 'sensors', component: SensoresComponent},
  {path: 'map', component: MapaComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
