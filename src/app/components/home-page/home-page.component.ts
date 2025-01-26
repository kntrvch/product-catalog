import { Component } from '@angular/core';
import { ApolloService } from '../../services/apollo.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, RouterModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  categories$!: Observable<any[]>;

  constructor(private apollo: ApolloService) {}

  ngOnInit() {
    this.categories$ = this.apollo.getCategories();
  }
}
