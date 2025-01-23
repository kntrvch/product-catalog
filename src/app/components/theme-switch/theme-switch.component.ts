import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-switch',
  imports: [],
  templateUrl: './theme-switch.component.html',
  styleUrl: './theme-switch.component.scss'
})
export class ThemeSwitchComponent {
  isDarkMode = false;

  constructor(private themeService: ThemeService) {
    this.isDarkMode = this.themeService.getCurrentTheme() === 'dark';
  }

  toggleTheme(event: Event): void {
    this.themeService.toggleTheme();
    this.isDarkMode = !this.isDarkMode;
  }
}
