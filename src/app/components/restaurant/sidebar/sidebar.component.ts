import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Output() toggleSidebarEvent = new EventEmitter<void>();

  constructor(private authService: AuthService){}

  toggleSidebar() {
    this.toggleSidebarEvent.emit();
  }
  logout(): void {
    this.authService.logout();
  }
}
