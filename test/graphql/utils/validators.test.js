import { expect } from 'chai'

import {
  validateRegisterInput,
  validateLoginInput
} from '../../../graphql/utils/validators.js'

describe('register validators', () => {
  const input = {
    username: 'dummy',
    email: 'dummy@dummy.com',
    password: 'sadasd',
    confirmPassword: 'sadasd'
  }

  it('should have `valid` props', () => {
    expect(validateRegisterInput()).to.have.property('valid')
  })

  it('should have `errors` props', () => {
    expect(validateRegisterInput()).to.have.property('errors')
  })

  describe('when invalid', () => {
    it('should return valid = false', () => {
      expect(validateRegisterInput()).to.include({ valid: false })
    })
    it('should return errors with `username` props', () => {
      expect(validateRegisterInput().errors).to.have.property(
        'username'
      )
    })
    it('should return errors with `email` props', () => {
      expect(validateRegisterInput().errors).to.have.property('email')
    })
    it('should return errors with `password` props', () => {
      expect(validateRegisterInput().errors).to.have.property(
        'password'
      )
    })
    it('should return errors with `confirmPassword` props', () => {
      expect(
        validateRegisterInput('', '', 'dummy1', 'dummy2').errors
      ).to.have.property('confirmPassword')
    })
  })

  describe('when valid', () => {
    it('should return valid = true', () => {
      expect(
        validateRegisterInput(
          input.username,
          input.email,
          input.password,
          input.confirmPassword
        )
      ).to.include({ valid: true })
    })

    it('should return props errors with empty obj', () => {
      expect(
        validateRegisterInput(
          input.username,
          input.email,
          input.password,
          input.confirmPassword
        ).errors
      ).to.be.empty
    })
  })
})

describe('login validators', () => {
  it('should have `valid` props', () => {
    expect(validateLoginInput()).to.have.property('valid')
  })

  it('should have `errors` props', () => {
    expect(validateLoginInput()).to.have.property('errors')
  })

  describe('when invalid', () => {
    it('should return errors with `username` props', () => {
      expect(validateLoginInput().errors).to.have.property('username')
    })
    it('should return errors with `password` props', () => {
      expect(validateLoginInput().errors).to.have.property('password')
    })
  })

  describe('when valid', () => {
    const loginInput = {
      username: 'dummy',
      password: 'dummy'
    }

    it('should return `valid` props with value `true`', () => {
      expect(
        validateLoginInput(loginInput.username, loginInput.password)
      ).to.include({
        valid: true
      })
    })
    it('should return props errors with empty obj', () => {
      expect(
        validateLoginInput(loginInput.username, loginInput.password)
          .errors
      ).to.be.empty
    })
  })
})
