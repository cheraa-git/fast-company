import PropTypes from 'prop-types'
import { useState } from 'react'


const TextField = ({ label, type, name, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev)
  }

  const getInputClasses = () => {
    return 'form-control' + (error ? ' is-invalid' : '')
  }

  return (
    <div className="mb-4 input-group ">
      <label htmlFor={name}>{label}</label>
      <input
        className={getInputClasses()}
        type={showPassword ? 'text' : type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
      {
        type === 'password' &&
        <button className="btn btn-outline-secondary" type="button" onClick={toggleShowPassword}>
          <i className={`bi bi-eye${showPassword ? '-slash' : ''}`} />
        </button>
      }
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

TextField.defaultProps = {
  type: 'text'
}

TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
}

export { TextField }
