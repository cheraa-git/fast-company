import { useEffect, useState } from 'react'
import { validator } from '../../utils/validator'
import { TextField } from '../common/form/textField'
import { CheckBoxField } from '../common/form/checkBoxField'

export const LoginForm = () => {
  const [data, setData] = useState({ email: '', password: '', stayOn: false })
  const [errors, setErrors] = useState({})

  const handleChange = (target) => {
    setData(prev => ({ ...prev, [target.name]: target.value }))
  }

  const validatorConfig = {
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

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    console.log(data)
  }

  const isValid = Object.keys(errors).length === 0
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <CheckBoxField value={data.stayOn} onChange={handleChange} name="stayOn">
        Stay logged in
      </CheckBoxField>
      <button className="btn btn-primary w-100 mx-auto" disabled={!isValid}>Submit</button>
    </form>
  )
}
