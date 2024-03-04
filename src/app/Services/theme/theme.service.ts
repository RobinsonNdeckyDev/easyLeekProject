import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isNightMode = false;

  toggleMode() {
    this.isNightMode = !this.isNightMode;
    this.applyTheme();
  }

  private applyTheme() {
    if (this.isNightMode) {
      document.body.classList.add('night-mode');
    } else {
      document.body.classList.remove('night-mode');
    }
  }
}
