import Select from 'react-select'
import PropTypes from 'prop-types'

export const MultiSelectField = ({ options, onChange, name, label }) => {
  const optionsArray = !Array.isArray(options) && typeof options === 'object'
    ? Object.keys(options).map(optionName => ({ label: options[optionName].name, value: options[optionName]._id }))
    : options

  const handleChange = (value) => {
    onChange({ name, value })
  }
  return (
    <div className="mb-4">
      <label className="form-label">{label}</label>
      <Select
        isMulti
        options={optionsArray}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleChange}
        name={name}
        closeMenuOnSelect={false}
      />
    </div>
  )
}

MultiSelectField.propTypes = {
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string
}
