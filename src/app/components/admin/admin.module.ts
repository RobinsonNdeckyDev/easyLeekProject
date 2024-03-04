import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MainAdminComponent } from './main-admin/main-admin.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AccueilAdminComponent } from './accueil-admin/accueil-admin.component';
import { CategoriesComponent } from './categories/categories.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule } from '@angular/forms';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { ClientsComponent } from './clients/clients.component';
import { DataTablesModule } from 'angular-datatables';
import { ProfilAdminComponent } from './profil-admin/profil-admin.component';

@NgModule({
  declarations: [
    MainAdminComponent,
    SidebarComponent,
    NavbarComponent,
    AccueilAdminComponent,
    CategoriesComponent,
    ContactComponent,
    RestaurantsComponent,
    ClientsComponent,
    ProfilAdminComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, FormsModule, DataTablesModule],
})
export class AdminModule {}
