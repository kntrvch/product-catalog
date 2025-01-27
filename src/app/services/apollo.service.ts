import { Injectable } from '@angular/core';
import { ApolloClient, gql, InMemoryCache } from '@apollo/client/core';
import { catchError, from, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../components/models/product';
import { Category } from '../components/models/category';

@Injectable({
  providedIn: 'root',
})
export class ApolloService {
  private client: ApolloClient<any>;

  constructor() {
    this.client = new ApolloClient({
      uri: `${this.getApiUri()}`,
      cache: new InMemoryCache(),
    });
  }

  private getApiUri(): string {
    return environment['GRAPHQL_API_URI'] || '';
  }

  private executeQuery<T>(query: any, variables?: any): Observable<T> {
    return from(this.client.query<T>({ query, variables })).pipe(
      map((result) => result.data),
      catchError((error) => {
        console.error(error);
        return of(null as T);
      })
    );
  }

  getCategories(): Observable<Category[]> {
    const GET_CATEGORIES = gql`
      query getCategories {
        categories {
          id
          name
          slug
          products {
            ... on Product {
              id
            }
          }
        }
      }
    `;
    return this.executeQuery<{ categories: Category[] }>(GET_CATEGORIES).pipe(
      map(
        (response) =>
          response.categories.map((category) => ({
            ...category,
            productCount: category.products.length,
          })) || []
      )
    );
  }

  getCategory(slug: string): Observable<Category> {
    const GET_CATEGORY = gql`
      query ($slug: String!) {
        category(where: { slug: $slug }) {
          id
          name
          products {
            ... on Product {
              id
              name
              slug
              image {
                url
              }
              price
            }
          }
        }
      }
    `;
    return this.executeQuery<{ category: Category }>(GET_CATEGORY, {
      slug,
    }).pipe(map((response) => response.category));
  }

  getProduct(slug: string): Observable<Product> {
    const GET_PRODUCT = gql`
      query ($slug: String!) {
        product(where: { slug: $slug }) {
          id
          name
          description
          price
          slug
          image {
            url
          }
          category {
            ... on Category {
              id
              name
              slug
            }
          }
        }
      }
    `;
    return this.executeQuery<{ product: Product }>(GET_PRODUCT, {
      slug,
    }).pipe(
      map((response) => ({
        ...response.product,
      }))
    );
  }

  getRelatedProducts(
    categorySlug: string,
    productSlug: string,
    limit: number
  ): Observable<Product[]> {
    const GET_RELATED_PRODUCTS = gql`
      query ($categorySlug: String!) {
        category(where: { slug: $categorySlug }) {
          products {
            ... on Product {
              id
              name
              slug
              image {
                url
              }
              price
            }
          }
        }
      }
    `;

    return this.executeQuery<{ category: Category }>(GET_RELATED_PRODUCTS, {
      categorySlug,
    }).pipe(
      map((response) => {
        const products = response.category.products;

        const relatedProducts = products.filter(
          (product: Product) => product.slug !== productSlug
        );

        return relatedProducts.slice(0, limit);
      })
    );
  }
}
