import PropTypes from 'prop-types'

export const SelectField = ({ label, value, onChange, name, options, defaultOption, error }) => {
  const optionsArray = !Array.isArray(options) && typeof options === 'object'
    ? Object.keys(options).map(optionName => ({ name: options[optionName].name, _id: options[optionName]._id }))
    : options

  const getInputClasses = () => {
    return 'form-select' + (error ? ' is-invalid' : '')
  }
  return (
    <div className="mb-4">
      <label htmlFor="validationCustom04" className="form-label">{label}</label>
      <select
        className={getInputClasses()}
        id="validationCustom04"
        name={name}
        value={value}
        onChange={onChange}
      >
        <option disabled value="">{defaultOption}</option>
        {optionsArray && optionsArray.map(option => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {
        error &&
        <div className="invalid-feedback">
          {error}
        </div>
      }
    </div>
  )
}

SelectField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  label: PropTypes.string,
  defaultOption: PropTypes.string,
  error: PropTypes.string
}
