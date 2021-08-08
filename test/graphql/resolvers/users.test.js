import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { UserInputError } from 'apollo-server-errors'

import conn from '../../../db/index.js'
import {
  usersResolvers,
  generateToken
} from '../../../graphql/resolvers/users.js'
import User from '../../../db/models/User.js'

const expect = chai.expect
chai.use(chaiAsPromised)

describe('usersResolvers', () => {
  beforeEach((done) => {
    conn
      .connect()
      .then(() => done())
      .catch((err) => done(err))
  })

  afterEach((done) => {
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
    const registerInput = {
      email: 'dummy@dummy.com',
      username: 'dummy',
      password: 'dummy',
      confirmPassword: 'dummy'
    }

    describe('register', () => {
      it('should save user input to database', async () => {
        await usersResolvers.Mutation.register({}, { registerInput })
        const user = await User.findOne({
          username: registerInput.username
        })

        expect(user).to.not.undefined
      })

      it('should return users JWT token', async () => {
        const res = await usersResolvers.Mutation.register(
          {},
          { registerInput }
        )

        expect(res).to.have.property('token')
      })

      describe('when username is taken', () => {
        it('should throws UserInputError', async () => {
          await new User({
            email: 'dummy@dummy.com',
            username: 'dummy',
            password: 'dummy',
            createdAt: new Date().toISOString(),
            active: false
          }).save()

          await expect(
            usersResolvers.Mutation.register({}, { registerInput })
          ).to.be.rejectedWith(UserInputError, 'Username is taken')
        })
      })
    })

    describe('login', () => {
      it('should return users JWT token', async () => {
        await usersResolvers.Mutation.register({}, { registerInput })

        const loginInput = {
          username: 'dummy',
          password: 'dummy'
        }

        const res = await usersResolvers.Mutation.login(
          {},
          { loginInput }
        )
        expect(res).to.have.property('token')
      })
    })
  })
})
