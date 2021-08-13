import { ApolloServer } from 'apollo-server'

import db from './db/index.js'
import { resolvers } from './graphql/resolvers/index.js'
import typeDefs from './graphql/typeDefs.js'
import { PORT } from './config.js'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
})

db.connect()
  .then(() => {
    console.log('MongoDB Connected')
    return server.listen({ port: PORT })
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`)
  })
