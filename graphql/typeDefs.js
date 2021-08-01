import gql from 'graphql-tag'

const typeDefs = gql`
  type Query {
    sayHi: String!
  }
`

export default typeDefs