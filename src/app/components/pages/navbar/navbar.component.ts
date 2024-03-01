import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { ThemeService } from 'src/app/Services/theme/theme.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {


  constructor(public authService: AuthService
    , private userService: UserService, private themeService:ThemeService) { }


    toggleTheme() {
      this.themeService.toggleMode();
    }

  logout(): void {
    this.authService.logout();
  }
}
