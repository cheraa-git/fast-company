import { useEffect, useState } from 'react'
import { validator } from '../../utils/validator'
import { TextField } from '../common/form/textField'
import api from '../../api'
import { SelectField } from '../common/form/selectField'
import { RadioField } from '../common/form/radioField'

export const RegisterForm = () => {
  const [data, setData] = useState({ email: '', password: '', profession: '', sex: 'male' })
  const [errors, setErrors] = useState({})
  const [professions, setProfessions] = useState()

  useEffect(() => {
    api.professions.fetchAll().then((professions) => setProfessions(professions))
  }, [])

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
    },
    profession: {
      isRequired: {
        message: 'Be sure to choose your profession'
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
      <SelectField
        name="profession"
        value={data.profession}
        onChange={handleChange}
        options={professions}
        error={errors.profession}
        label="Choose your profession"
        defaultOption="Choose..."
      />
      <RadioField
        options={[
          { name: 'Male', value: 'male' },
          { name: 'Female', value: 'female' },
          { name: 'Other', value: 'other' }
        ]}
        value={data.sex}
        name="sex"
        onChange={handleChange}
      />
      <button className="btn btn-primary w-100 mx-auto" disabled={!isValid}>Submit</button>
    </form>
  )
}
