import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './components/auth/connexion/connexion.component';

const routes: Routes = [
  { path: 'login', component: ConnexionComponent },
  {
    path: 'admin',
    loadChildren: () =>
      import('./components/admin/admin.module').then((m) => m.AdminModule),
    // canActivate: [AdminGuard],
  },
  {
    path: 'restaurant',
    loadChildren: () =>
      import('./components/restaurant/restaurant.module').then(
        (m) => m.RestaurantModule
      ),
    // canActivate: [ProprietaireGard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./components/pages/pages.module').then((m) => m.PagesModule),
    // canActivate: [AcheteurGuard],
  },
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
