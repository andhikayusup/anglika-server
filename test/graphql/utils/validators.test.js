import { expect } from 'chai'

import { validateRegisterInput } from '../../../graphql/utils/validators.js'

describe('validators', () => {
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
})
