import PropTypes from 'prop-types'

export const RadioField = ({ name, onChange, options, value, label }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      {options.map(option => (
        <div className="form-check form-check-inline" key={`${option.name}_${option.value}` }>
          <input
            className="form-check-input"
            type="radio"
            name={name}
            id={`${option.name}_${option.value}`}
            checked={option.value === value}
            value={option.value}
            onChange={onChange}
          />
          <label className="form-check-label" htmlFor="inlineRadio1">{option.name}</label>
        </div>
      ))}

    </div>
  )
}

RadioField.propTypes = {
  options: PropTypes.array,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string
}
