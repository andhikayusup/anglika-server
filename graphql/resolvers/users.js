import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserInputError } from 'apollo-server-errors'

import { validateRegisterInput } from '../utils/validators.js'
import { SECRET_KEY } from '../../config.js'
import User from '../../db/models/User.js'
import { checkAuth } from '../utils/check-auth.js'

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username
    },
    SECRET_KEY,
    { expiresIn: '1h' }
  )
}

export const usersResolvers = {
  Query: {
    async getUser(_, __, context) {
      const { id } = checkAuth(context)

      try {
        const user = await User.findById(id)
        return user
      } catch (err) {
        throw new Error(err)
      }
    }
  },
  Mutation: {
    async register(
      _,
      {
        registerInput: { username, email, password, confirmPassword }
      }
    ) {
      const { errors, valid } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      )

      if (!valid) {
        throw new UserInputError('Errors', { errors })
      }

      const user = await User.findOne({ username })
      if (user) {
        throw new UserInputError('Username is taken', {
          errors: {
            username: 'This username is taken'
          }
        })
      }

      password = await bcrypt.hash(password, 12)

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
        active: false
      })

      const res = await newUser.save()

      const token = generateToken(res)

      return {
        ...res._doc,
        id: res._id,
        token
      }
    }
  }
}
