import { SelectField } from '../../common/form/selectField'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import api from '../../../api'
import { validator } from '../../../utils/validator/validator'
import { commentValidatorConfig } from '../../../utils/validator/validatorConfigs'
import { TextAreaField } from '../../common/form/textAreaField'

export const CommentForm = ({ users, setComments }) => {
  const { userId: pageId } = useParams()
  const [data, setData] = useState({
    user: '',
    comment: ''
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    validate()
  }, [data])

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
    const isValid = validate()
    if (!isValid) return
    api.comments.add({ pageId, userId: data.user, content: data.comment })
      .then((newComment) => {
        setComments(prev => [newComment, ...prev])
        setData({ user: '', comment: '' })
      })
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
  users: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired
}
