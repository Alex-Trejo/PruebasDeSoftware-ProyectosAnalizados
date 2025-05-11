import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { ApplicationConfig } from '@angular/core';
import { ApolloClientOptions, DefaultOptions, InMemoryCache } from '@apollo/client/core';



const defaultOptions: DefaultOptions = {
  query: {
    fetchPolicy: 'no-cache', // No almacenar las respuestas de las consultas
  },
  mutate: {
    fetchPolicy: 'no-cache', // No almacenar las respuestas de las mutaciones
  },
};



export function apolloOptionsFactory(): ApolloClientOptions<any> {
  return {
    uri: 'http://localhost:8080/graphql',
    //dont save cache
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
  };
}

export const graphqlProvider: ApplicationConfig['providers'] = [
  Apollo,
  {
    provide: APOLLO_OPTIONS,
    useFactory: apolloOptionsFactory, // Usar la fábrica de opciones de Apollo
  },
];