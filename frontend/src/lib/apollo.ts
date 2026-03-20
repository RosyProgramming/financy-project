import { ApolloClient, HttpLink, ApolloLink, InMemoryCache } from '@apollo/client';

const httpLink = new HttpLink({
    uri:"http://localhost:4000/graphql",
})

export const apolloClient = new ApolloClient({
    link: ApolloLink.from([httpLink]),
    cache: new InMemoryCache()
})