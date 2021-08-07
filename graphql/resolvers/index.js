import { usersResolvers } from './users.js'

export const resolvers = {
  Query: {
    ...usersResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation
  }
}
