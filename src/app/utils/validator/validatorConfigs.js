export const loginValidatorConfig = {
  email: {
    isRequired: {
      message: 'Email is required'
    },
    isEmail: {
      message: 'Invalid email'
    }
  },
  password: {
    isRequired: {
      message: 'Password is required'
    },
    isCapitalSymbol: {
      message: 'The password must contain at least one uppercase character'
    },
    isContainDigit: {
      message: 'The password must contain at least one digit'
    },
    min: {
      message: 'The min password length is 8',
      value: 8
    }
  }
}

export const registerValidatorConfig = {
  email: {
    isRequired: {
      message: 'Email is required'
    },
    isEmail: {
      message: 'Invalid email'
    }
  },
  password: {
    isRequired: {
      message: 'Password is required'
    },
    isCapitalSymbol: {
      message: 'The password must contain at least one uppercase character'
    },
    isContainDigit: {
      message: 'The password must contain at least one digit'
    },
    min: {
      message: 'The min password length is 8',
      value: 8
    }
  },
  profession: {
    isRequired: {
      message: 'Be sure to choose your profession'
    }
  },
  license: {
    isRequired: {
      message: 'You cannot use this service without a license agreement'
    }
  }
}
