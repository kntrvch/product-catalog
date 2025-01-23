import { Component } from '@angular/core';
import { ApolloService } from '../../apollo.service';
import { catchError, map, Observable } from 'rxjs';
import { gql } from '@apollo/client/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

const GET_CATEGORIES = gql`
  query GetCategories {
    categories: getCategoryList {
      items {
        _id
        name
        slug
        products {
          items {
            _id
          }
        }
      }
    }
  }
`;

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
    this.categories$ = this.apollo.query<any>(GET_CATEGORIES).pipe(
      map((response: any) => {
        console.log(response);
        return response.categories.items.map((category: any) => ({
          id: category._id,
          name: category.name,
          slug: category.slug,
          productCount: category.products.items.length,
        }));
      }),
      catchError((error) => {
        console.error('Error fetching categories:', error);
        return [];
      })
    );
  }
}
