import gql from 'graphql-tag'

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    token: String!
    createdAt: String!
    active: Boolean!
  }
  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }
  input LoginInput {
    username: String!
    password: String!
  }
  type Query {
    getUser: User!
    sayHi: String!
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(loginInput: LoginInput): User!
  }
`

export default typeDefs
