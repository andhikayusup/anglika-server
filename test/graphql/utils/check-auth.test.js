import jwt from 'jsonwebtoken'
import { expect } from 'chai'
import { AuthenticationError } from 'apollo-server-errors'

import { checkAuth } from '../../../graphql/utils/check-auth.js'
import { SECRET_KEY } from '../../../config.js'

describe('check-auth middleware', () => {
  const user = {
    id: 'dummy',
    email: 'dummy@dummy.com',
    username: 'dummy'
  }
  describe('when valid', () => {
    const context = {
      req: {
        headers: {
          authorization: `Bearer ${jwt.sign(user, SECRET_KEY)}`
        }
      }
    }

    it('should return user', () => {
      expect(checkAuth(context)).to.include(user)
    })
  })

  describe('when invalid', () => {
    it('should throw AuthenticationError', () => {
      let context = {
        req: {
          headers: {
            authorization: 'Bearer invalidkey'
          }
        }
      }

      expect(() => checkAuth(context)).to.throw(
        AuthenticationError,
        'Invalid/Expired token'
      )

      context = {
        req: {
          headers: ''
        }
      }

      expect(() => checkAuth(context)).to.throw(
        AuthenticationError,
        'Authorization must be provided'
      )
    })
  })
})
