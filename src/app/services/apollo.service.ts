import { Injectable } from '@angular/core';
import { ApolloClient, gql, InMemoryCache } from '@apollo/client/core';
import { catchError, from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApolloService {
  client: ApolloClient<any>;

  constructor() {
    this.client = new ApolloClient({
      uri: 'https://api.takeshape.io/project/0b04a83c-2b46-402d-8230-9e5ec900d824/graphql',
      cache: new InMemoryCache(),
      headers: {
        Authorization: 'Bearer b73ff63e39ba491eafc5e94f238e2c73',
      },
    });
  }

  query<T>(query: any, variables?: any): Observable<T> {
    return from(this.client.query<T>({ query, variables })).pipe(
      map((result) => result.data)
    );
  }

  getCategories(): Observable<any> {
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

    return from(
      this.client.watchQuery({
        query: GET_CATEGORIES,
      })
    ).pipe(
      map((response: any) => {
        console.log(response);
        return response.data.getCategoryList.items.map((category: any) => ({
          ...category,
          productCount: category.products.items.length,
        }));
      }),
      catchError((error) => {
        console.error('Error fetching categories:', error);
        return [];
      })
    );
  }

  getCategory(id: string): Observable<any> {
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

    return from(
      this.client.watchQuery({
        query: GET_CATEGORY,
        variables: { _id: id },
      })
    ).pipe(
      map((response: any) => {
        console.log(response);
        return response.data.getCategory;
      }),
      catchError((error) => {
        console.error('Error fetching category:', error);
        return [];
      })
    );
  }

  getProduct(id: string): Observable<any> {
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
        }
      }
    `;

    return from(
      this.client.watchQuery({
        query: GET_PRODUCT,
        variables: { _id: id },
      })
    ).pipe(
      map((response: any) => {
        console.log(response);
        const product = response.data.getProduct;
        return {
          id: product._id,
          name: product.name,
          description: product.description,
          price: product.price,
          slug: product.slug,
          image: product.image.sourceUrl,
        };
      }),
      catchError((error) => {
        console.error('Error fetching product:', error);
        return [];
      })
    );
  }
}
