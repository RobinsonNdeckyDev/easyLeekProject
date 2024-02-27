import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
// import { LoginComponent } from '../auth/login/login.component';
import { RestoComponent } from './resto/resto.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      { path: 'accueil', component: AccueilComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'resto', component: RestoComponent },
      // { path: 'login', component: LoginComponent },
      { path: '', redirectTo: 'accueil', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }


