import { useEffect, useState } from 'react'
import { validator } from '../../../utils/validator/validator'
import { TextField } from '../../common/form/textField'
import { CheckBoxField } from '../../common/form/checkBoxField'
import { loginValidatorConfig } from '../../../utils/validator/validatorConfigs'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../../store/users'

export const LoginForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [data, setData] = useState({ email: '', password: '', stayOn: false })
  const [errors, setErrors] = useState({})
  const [enterError, setEnterError] = useState(null)

  useEffect(() => {
    validate()
  }, [data])
  const handleChange = (target) => {
    setData(prev => ({ ...prev, [target.name]: target.value }))
    setEnterError(null)
  }

  const validate = () => {
    const errors = validator(data, loginValidatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    const redirect = history.location.state?.from?.pathname || '/'
    dispatch(login({ payload: data, redirect }))
    // history.push(history.location.state?.from?.pathname || '/')
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
      <p className="text-danger">{enterError}</p>
      <button className="btn btn-primary w-100 mx-auto" disabled={!isValid || !!enterError}>Submit</button>
    </form>
  )
}
