import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Output() toggleSidebarEvent = new EventEmitter<void>();
user: any;

  toggleSidebar() {
    this.toggleSidebarEvent.emit();
  }
  constructor(private authService: AuthService){}

  logout(): void {
    this.authService.logout();
  }
  }
