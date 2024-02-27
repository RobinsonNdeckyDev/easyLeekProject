import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor( private authService:AuthService , private router:Router) {}
  
  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn.pipe(
      take(1),
      map((isLoggedIn) => {
        if (isLoggedIn) {
          // Utilisateur connecté, redirigez vers /profil
          this.router.navigate(['/profil']);
          return false; // Retourne false car la navigation est déjà gérée
        } else {
          // Utilisateur non connecté, redirigez vers /login
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
  
}
