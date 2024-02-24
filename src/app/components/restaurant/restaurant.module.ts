import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantRoutingModule } from './restaurant-routing.module';
import { MainRestaurantComponent } from './main-restaurant/main-restaurant.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AccueilRestaurantComponent } from './accueil-restaurant/accueil-restaurant.component';
import { MenusComponent } from './menus/menus.component';
import { PlatsComponent } from './plats/plats.component';
import { CommandesComponent } from './commandes/commandes.component';
import { AvisComponent } from './avis/avis.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MainRestaurantComponent,
    NavbarComponent,
    SidebarComponent,
    AccueilRestaurantComponent,
    MenusComponent,
    PlatsComponent,
    CommandesComponent,
    AvisComponent
  ],
  imports: [
    CommonModule,
    RestaurantRoutingModule,
    FormsModule
  ]
})
export class RestaurantModule { }
