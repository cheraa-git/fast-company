import { useEffect, useState } from 'react'
import { TextField } from '../common/form/textField'
import { CheckBoxField } from '../common/form/checkBoxField'
import * as yup from 'yup'

export const LoginForm = () => {
  const [data, setData] = useState({ email: '', password: '', stayOn: false })
  const [errors, setErrors] = useState({})
  const validateScheme = yup.object({
    password: yup
      .string()
      .required('Password is required')
      .matches(/(?=.*[A-Z])/, 'The password must contain at least one uppercase character')
      .matches(/(?=.*[0-9])/, 'The password must contain at least one digit')
      .matches(/(?=.*[!@#$%^&*])/, 'The password must contain at least one of the special characters (!@#$%^&*)')
      .min(8, 'The min password length is 8'),
    email: yup.string().required('Email is required').email('Invalid email')
  })

  const handleChange = (target) => {
    setData(prev => ({ ...prev, [target.name]: target.value }))
  }

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    validateScheme.validate(data)
      .then(() => setErrors({}))
      .catch((err) => setErrors({ [err.path]: err.message }))
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
