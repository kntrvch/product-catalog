import { Component } from '@angular/core';
import { ThemeSwitchComponent } from '../theme-switch/theme-switch.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CollapseModule, RouterModule, ThemeSwitchComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isCollapsed = true;
}
