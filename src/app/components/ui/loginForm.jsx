import { useEffect, useState } from 'react'
import { validator } from '../../utils/validator'
import { TextField } from '../common/form/textField'

export const LoginForm = () => {
  const [data, setData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})

  const handleChange = ({ target }) => {
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
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <h3 className="mb-4">Login</h3>
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
            <button className="btn btn-primary w-100 mx-auto" disabled={!isValid}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}
