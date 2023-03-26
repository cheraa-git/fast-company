import { validateRules } from './validateRules'

export function validator(data, config) {
  const errors = {}
  const validate = (validateMethod, data, config) => {
    const rule = validateRules[validateMethod]
    if (rule && !rule(data, config.value)) return config.message
  }
  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(validateMethod, data[fieldName], config[fieldName][validateMethod])
      if (error && !errors[fieldName]) {
        errors[fieldName] = error
      }
    }
  }
  return errors
}
