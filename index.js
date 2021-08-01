import { ApolloServer } from 'apollo-server'
import mongoose from 'mongoose'

import { MONGODB } from './config.js'
import { resolvers } from './graphql/resolvers/index.js'
import typeDefs from './graphql/typeDefs.js'

const PORT = process.env.port || 5000

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
})

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected')
    return server.listen({ port: PORT })
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`)
  })
