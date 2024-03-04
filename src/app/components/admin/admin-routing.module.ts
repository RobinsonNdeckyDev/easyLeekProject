import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilAdminComponent } from './accueil-admin/accueil-admin.component';
import { MainAdminComponent } from './main-admin/main-admin.component';
import { CategoriesComponent } from './categories/categories.component';
import { ContactComponent } from './contact/contact.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { ClientsComponent } from './clients/clients.component';
import { AdminGuard } from 'src/app/guard/admin.guard';
import { ProfilAdminComponent } from './profil-admin/profil-admin.component';

const routes: Routes = [
  {
    path: '',
    component: MainAdminComponent,
    canActivate :[AdminGuard],
    children: [
      { path: 'accueilAdmin', component: AccueilAdminComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'clients', component: ClientsComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'restaurants', component: RestaurantsComponent },
      { path: 'profilAdmin', component: ProfilAdminComponent },
      { path: '', redirectTo: 'accueilAdmin', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
