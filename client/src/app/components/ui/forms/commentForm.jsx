import { useState } from 'react'
import PropTypes from 'prop-types'
import { validator } from '../../../utils/validator/validator'
import { commentValidatorConfig } from '../../../utils/validator/validatorConfigs'
import { TextAreaField } from '../../common/form/textAreaField'

export const CommentForm = ({ onSubmit }) => {
  const [data, setData] = useState({})
  const [errors, setErrors] = useState({})


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
    onSubmit({ content: data?.comment })
    setData({})
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextAreaField
        name="comment"
        label="Сообщение"
        value={data?.comment || ''}
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
