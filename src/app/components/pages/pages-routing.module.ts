import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { RestoComponent } from './resto/resto.component';
import { PanierComponent } from './panier/panier.component';
import { ProfilComponent } from './profil/profil.component';
import { ClientGuard } from 'src/app/guard/client.guard';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    // canActivate:[ClientGuard],
    children: [
      { path: 'accueil', component: AccueilComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'resto', component: RestoComponent },
      { path: 'restaurant/:id', component: RestoComponent },
      { path: 'panier', component : PanierComponent},
      { path: 'profil', component : ProfilComponent ,canActivate :[ClientGuard]},
      { path: '', redirectTo: 'accueil', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }


