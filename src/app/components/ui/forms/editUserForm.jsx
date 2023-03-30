import { TextField } from '../../common/form/textField'
import { SelectField } from '../../common/form/selectField'
import { RadioField } from '../../common/form/radioField'
import { MultiSelectField } from '../../common/form/multiSelectField'
import { useEffect, useState } from 'react'
import { validator } from '../../../utils/validator/validator'
import { editUserValidatorConfig } from '../../../utils/validator/validatorConfigs'
import PropTypes from 'prop-types'
import { updateUserQuery } from '../../../utils/apiQueries'
import { useHistory } from 'react-router-dom'

export const EditUserForm = ({ user, professions, qualities }) => {
  const history = useHistory()
  const [data, setData] = useState({
    email: user.email,
    name: user.name,
    profession: user.profession._id,
    sex: user.sex,
    qualities: user.qualities
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    validate()
  }, [data])

  const handleChange = (target) => {
    setData(prev => ({ ...prev, [target.name]: target.value }))
  }

  const validate = () => {
    const errors = validator(data, editUserValidatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const getProfessionById = (id) => {
    for (const prof of professions) {
      if (prof.value === id) {
        return { _id: prof.value, name: prof.label }
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    updateUserQuery(user._id, { ...data, profession: getProfessionById(data.profession) })
      .then((updatedUser) => history.push(`/users/${updatedUser._id}`))
  }

  const isValid = Object.keys(errors).length === 0
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        name="name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
      />
      <TextField
        label="Email"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
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
        defaultValue={data.qualities}
        options={qualities}
        onChange={handleChange}
        name="qualities"
        label="Choose your qualities"
      />
      <button className="btn btn-primary w-100 mx-auto" disabled={!isValid}>Update</button>
    </form>
  )
}

EditUserForm.propTypes = {
  user: PropTypes.object,
  qualities: PropTypes.array,
  professions: PropTypes.array
}
