import PropTypes from 'prop-types'
import cn from 'classnames'

export const TextAreaField = ({ label, name, value, onChange, error, rows, ...rest }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }

  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <textarea
        className={cn('form-control', { 'is-invalid': error })}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        rows={rows}
        {...rest}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

TextAreaField.defaultProps = {
  rows: '3'
}

TextAreaField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  rows: PropTypes.string
}
