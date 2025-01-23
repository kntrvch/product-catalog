import { Injectable } from '@angular/core';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { from, map, Observable } from 'rxjs';

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
}
