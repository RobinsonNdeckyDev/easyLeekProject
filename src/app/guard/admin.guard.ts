import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.isAdmin() ) {
      // Autoriser l'accès si l'utilisateur est un administrateur
      return true;
    } else {
      // Si l'utilisateur n'a pas le role admin l'envoyer sur la page login
      this.router.navigate(['/login']);
      return false;
    }
  }
}