import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeKey = 'app-theme';
  private isDarkMode = false;

  constructor() {
    const savedTheme = localStorage.getItem(this.themeKey);
    if (savedTheme === 'dark') {
      this.isDarkMode = true;
      document.body.setAttribute('data-theme', 'dark');
    } else {
      this.isDarkMode = false;
      document.body.removeAttribute('data-theme');
    }
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.setAttribute('data-theme', 'dark');
      localStorage.setItem(this.themeKey, 'dark');
    } else {
      document.body.removeAttribute('data-theme');
      localStorage.setItem(this.themeKey, 'light');
    }
  }

  getCurrentTheme(): string {
    return this.isDarkMode ? 'dark' : 'light';
  }
}
