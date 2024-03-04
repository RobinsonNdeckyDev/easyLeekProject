import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainRestaurantComponent } from './main-restaurant/main-restaurant.component';
import { AccueilRestaurantComponent } from './accueil-restaurant/accueil-restaurant.component';
import { AvisComponent } from './avis/avis.component';
import { CommandesComponent } from './commandes/commandes.component';
import { MenusComponent } from './menus/menus.component';
import { PlatsComponent } from './plats/plats.component';
import { RestaurantGuard } from 'src/app/guard/restaurant.guard';
import { ProfilRestoComponent } from './profil-resto/profil-resto.component';

const routes: Routes = [
  {
    path: '',
    component: MainRestaurantComponent,
    canActivate :[RestaurantGuard],
    children: [
      { path: 'accueilRestaurant', component: AccueilRestaurantComponent },
      { path: 'avis', component: AvisComponent },
      { path: 'commandes', component: CommandesComponent },
      { path: 'menus', component: MenusComponent },
      { path: 'plats', component: PlatsComponent },
      { path: 'profilResto', component: ProfilRestoComponent },
      { path: '', redirectTo: 'accueilRestaurant', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule { }
