import { SelectField } from '../../common/form/selectField'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { validator } from '../../../utils/validator/validator'
import { commentValidatorConfig } from '../../../utils/validator/validatorConfigs'
import { TextAreaField } from '../../common/form/textAreaField'
import query from '../../../utils/query'

export const CommentForm = ({ onSubmit }) => {
  const [users, setUsers] = useState([])
  const [data, setData] = useState({ user: '', comment: '' })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    query.getUsersOptions().then(response => setUsers(response))
  }, [])

  const validate = () => {
    const errors = validator(data, commentValidatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleChange = (target) => {
    setData(prev => ({ ...prev, [target.name]: target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit({ userId: data.user, content: data.comment })
    setData({ user: '', comment: '' })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <SelectField
          name="user"
          value={data.user}
          onChange={handleChange}
          options={users}
          defaultOption="Выберите пользователя"
          error={errors.user}
        />
      </div>
      <TextAreaField
        name="comment"
        label="Сообщение"
        value={data.comment}
        onChange={handleChange}
        error={errors.comment}
      />
      <div className="d-flex justify-content-end">
        <button className="btn btn-primary">Опубликовать</button>
      </div>
    </form>
  )
}

CommentForm.propTypes = {
  onSubmit: PropTypes.func
}
