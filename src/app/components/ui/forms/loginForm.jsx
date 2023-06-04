import { useEffect, useState } from 'react'
import { validator } from '../../../utils/validator/validator'
import { TextField } from '../../common/form/textField'
import { CheckBoxField } from '../../common/form/checkBoxField'
import { loginValidatorConfig } from '../../../utils/validator/validatorConfigs'
import { useAuth } from '../../../hooks/useAuth'
import { useHistory } from 'react-router-dom'

export const LoginForm = () => {
  const history = useHistory()
  const { signIn } = useAuth()
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    try {
      await signIn(data)
      history.push(history.location.state?.from?.pathname || '/')
    } catch (error) {
      setEnterError(error.message)
    }
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
