import { ApolloClient, HttpLink } from "@apollo/client/core";
import { InMemoryCache } from "@apollo/client/cache";
const httpLink = new HttpLink({
  uri: import.meta.env.VITE_APOLLO as string,
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies:{
       Query:{
         fields:{
          users:{
            merge(existing, incoming, { mergeObjects }) {
              return incoming;
            },
          }
         }
       },
    }
  }),
});
