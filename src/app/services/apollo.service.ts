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
      headers: {
        Authorization: `Bearer ${this.getApiKey()}`,
      },
    });
  }

  private getApiKey(): string {
    return environment['GRAPHQL_API_KEY'] || '';
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
        getCategoryList {
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
    return this.executeQuery<{ getCategoryList: { items: Category[] } }>(
      GET_CATEGORIES
    ).pipe(
      map(
        (response) =>
          response?.getCategoryList.items.map((category) => ({
            ...category,
            productCount: category.products.items.length,
          })) || []
      )
    );
  }

  getCategory(id: string): Observable<Category> {
    const GET_CATEGORY = gql`
      query ($_id: ID!) {
        getCategory(_id: $_id) {
          _id
          name
          products {
            items {
              _id
              description
              name
              price
              slug
              image {
                sourceUrl
              }
            }
            total
          }
          slug
        }
      }
    `;
    return this.executeQuery<{ getCategory: Category }>(GET_CATEGORY, {
      _id: id,
    }).pipe(map((response) => response.getCategory));
  }

  getProduct(id: string): Observable<Product> {
    const GET_PRODUCT = gql`
      query ($_id: ID!) {
        getProduct(_id: $_id) {
          _id
          name
          description
          price
          slug
          image {
            sourceUrl
          }
          category {
            _id
            name
            slug
          }
        }
      }
    `;
    return this.executeQuery<{ getProduct: Product }>(GET_PRODUCT, {
      _id: id,
    }).pipe(
      map((response) => ({
        ...response.getProduct,
      }))
    );
  }

  getRelatedProducts(
    categoryId: string,
    productId: string,
    limit: number
  ): Observable<Product[]> {
    const GET_RELATED_PRODUCTS = gql`
      query ($categoryId: ID!) {
        getCategory(_id: $categoryId) {
          products {
            items {
              _id
              name
              image {
                sourceUrl
              }
            }
          }
        }
      }
    `;

    return this.executeQuery<{ getCategory: Category }>(GET_RELATED_PRODUCTS, {
      categoryId: categoryId,
    }).pipe(
      map((response) => {
        const products = response.getCategory.products.items;

        const relatedProducts = products.filter(
          (product: Product) => product._id !== productId
        );

        return relatedProducts.slice(0, limit);
      })
    );
  }
}
