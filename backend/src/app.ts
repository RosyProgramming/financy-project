import 'reflect-metadata'
import 'dotenv/config'

import express from 'express'
import cors from 'cors'

import { ApolloServer } from '@apollo/server'
import { buildSchema } from 'type-graphql'
import { expressMiddleware } from '@as-integrations/express5'

import { AuthResolver } from './resolvers/auth.resolver.js'
import { UserResolver } from './resolvers/user.resolver.js'
import { TransactionResolver } from './resolvers/transaction.resolver.js'
import { CategoryResolver } from './resolvers/category.resolver.js'
import { DashboardResolver } from './resolvers/dashboard.resolver.js'

import { buildContext } from './graphql/context.js'

export async function createApp() {
  const app = express()

  app.use(
    cors({
      origin: [
        'http://localhost:5173',
        'https://financy-project.vercel.app',
        'https://financy-project-chi.vercel.app'
      ],
      credentials: true
    })
  )

  const schema = await buildSchema({
    resolvers: [
      AuthResolver,
      UserResolver,
      TransactionResolver,
      CategoryResolver,
      DashboardResolver
    ],
    validate: false
  })

  const server = new ApolloServer({
    schema
  })

  await server.start()

  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(server, {
      context: buildContext
    })
  )

  return app
}