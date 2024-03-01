import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RestaurantGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  
  canActivate(): boolean {
    if (this.authService.isRestaurant() && !this.authService.isAdmin()) {
      // Autoriser l'accès si l'utilisateur est un acheteur
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}