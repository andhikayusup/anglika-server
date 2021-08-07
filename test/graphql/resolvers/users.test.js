import { expect } from 'chai'

import conn from '../../../db/index.js'
import {
  usersResolvers,
  generateToken
} from '../../../graphql/resolvers/users.js'
import User from '../../../db/models/User.js'

describe('usersResolvers', () => {
  before((done) => {
    conn
      .connect()
      .then(() => done())
      .catch((err) => done(err))
  })

  after((done) => {
    conn
      .close()
      .then(() => done())
      .catch((err) => done(err))
  })

  describe('Query', () => {
    describe('getUsers', () => {
      it('should return user', async () => {
        const newUser = new User({
          email: 'dummy@dummy.com',
          username: 'dummy',
          password: 'dummy',
          createdAt: new Date().toISOString(),
          active: false
        })

        const res = await newUser.save()
        const token = generateToken(res)
        const context = {
          req: {
            headers: {
              authorization: `Bearer ${token}`
            }
          }
        }

        const query = await usersResolvers.Query.getUser(
          {},
          {},
          context
        )

        expect(query).to.include({
          email: 'dummy@dummy.com',
          username: 'dummy',
          password: 'dummy',
          active: false
        })
      })
    })
  })

  describe('Mutation', () => {
    describe('register', () => {
      const registerInput = {
        email: 'dummy@dummy.com',
        username: 'dummy',
        password: 'dummy',
        confirmPassword: 'dummy'
      }

      const res = usersResolvers.Mutation.register(registerInput)

      it('should save user input to database', async () => {
        const user = await User.findOne({
          username: registerInput.username
        })

        expect(user).to.not.undefined
      })
      it('should return users JWT token', () => {
        expect(res).to.have.property('token')
      })
    })
  })
})
