import { useEffect, useState } from 'react'
import { validator } from '../../../utils/validator/validator'
import { TextField } from '../../common/form/textField'
import { SelectField } from '../../common/form/selectField'
import { RadioField } from '../../common/form/radioField'
import { MultiSelectField } from '../../common/form/multiSelectField'
import { CheckBoxField } from '../../common/form/checkBoxField'
import { registerValidatorConfig } from '../../../utils/validator/validatorConfigs'
import query from '../../../utils/query'


export const RegisterForm = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    profession: '',
    sex: 'male',
    qualities: [],
    license: false
  })
  const [errors, setErrors] = useState({})
  const [professions, setProfessions] = useState([])
  const [qualities, setQualities] = useState([])

  useEffect(() => {
    query.getProfessionOptions().then(professions => setProfessions(professions))
    query.getQualityOptions().then(qualities => setQualities(qualities))
  }, [])

  const handleChange = (target) => {
    setData(prev => ({ ...prev, [target.name]: target.value }))
  }

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    const errors = validator(data, registerValidatorConfig)
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
        label="Choose your sex"
      />
      <MultiSelectField
        options={qualities}
        onChange={handleChange}
        name="qualities"
        label="Choose your qualities"
      />
      <CheckBoxField value={data.license} onChange={handleChange} name="license" error={errors.license}>
        Confirm the <a className="link-primary">license agreement</a>
      </CheckBoxField>
      <button className="btn btn-primary w-100 mx-auto" disabled={!isValid}>Submit</button>
    </form>
  )
}
