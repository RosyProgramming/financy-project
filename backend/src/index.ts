import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `
  type Query {
    helloworld: String!
  }
`;

async function bootstrap() {
    const server = new ApolloServer({
        typeDefs,
        resolvers: {
            Query: {
                helloworld: () => {
                    return 'Hello World!'
                },
            },
        },
    })

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    })

    console.log(`🚀 Server ready at: ${url}`)
}

bootstrap()