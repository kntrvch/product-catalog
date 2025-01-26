import { Component } from '@angular/core';
import { ApolloService } from '../../services/apollo.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Category } from '../models/category';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, RouterModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  categories$!: Observable<Category[]>;

  constructor(private apollo: ApolloService) {}

  ngOnInit() {
    this.categories$ = this.apollo.getCategories();
  }
}
