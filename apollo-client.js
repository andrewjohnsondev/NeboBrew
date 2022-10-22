// ./apollo-client.js

import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_SANITY_URI,
  cache: new InMemoryCache(),
});

export default client;
