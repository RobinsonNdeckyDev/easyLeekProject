import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { PanierService } from 'src/app/Services/panier.service';
import { ThemeService } from 'src/app/Services/theme/theme.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  public nombreArticlesDansPanier: number = 0;

  
  constructor(public authService: AuthService, private userService: UserService, private themeService: ThemeService, private panierService: PanierService) {
    // Update the property when the service updates it
    this.panierService.nombreArticlesDansPanier.subscribe((value) => {
      this.nombreArticlesDansPanier = value;
    });
  }

    toggleTheme() {
      this.themeService.toggleMode();
    }

  logout(): void {
    this.authService.logout();
  }
}
