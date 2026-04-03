import 'reflect-metadata'
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { ApolloServer } from '@apollo/server'
import { buildSchema } from 'type-graphql'
import { expressMiddleware } from '@as-integrations/express5'
import { AuthResolver } from './resolvers/auth.resolver'
import { UserResolver } from './resolvers/user.resolver'
import { buildContext } from './graphql/context'
import { TransactionResolver } from './resolvers/transaction.resolver'
import { CategoryResolver } from './resolvers/category.resolver'
import { DashboardResolver } from './resolvers/dashboard.resolver'


async function bootstrap() {
    
   const app = express()

    app.use(cors({
        origin: "http://localhost:5173", // seu frontend
        credentials: true
    }))
    
   const schema = await buildSchema({
        resolvers: [
            AuthResolver,
            UserResolver,
            TransactionResolver,
            CategoryResolver,
            DashboardResolver

        ],
        validate: false,
        emitSchemaFile: './schema.graphql'
   })

   const server = new ApolloServer({
        schema
   })

   await server.start()

   app.use(
        '/graphql', 
        express.json(),
        expressMiddleware(server, {
            context: buildContext,
        })
    )

    app.listen({
        port: 4000
    }, () => {
        console.log('Servidor iniciado na porta 4000')
    })
}

bootstrap()