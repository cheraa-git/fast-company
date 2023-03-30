export const validateRules = {
  isRequired: (value) => {
    if (typeof value === 'boolean') return value
    return value.trim() !== ''
  },
  isEmail: (value) => /^\S+@\S+\.\S+$/g.test(value),
  isCapitalSymbol: (value) => /[A-Z]+/g.test(value),
  isContainDigit: (value) => /\d+/g.test(value),
  min: (value, length) => value.length >= length
}
