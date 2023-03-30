import Select from 'react-select'
import PropTypes from 'prop-types'

export const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
  const optionsArray = !Array.isArray(options) && typeof options === 'object'
    ? Object.values(options)
    : options

  const handleChange = (value) => {
    onChange({ name, value })
  }
  return (
    <div className="mb-4">
      <label className="form-label">{label}</label>
      <Select
        className="basic-multi-select"
        isMulti
        options={optionsArray}
        defaultValue={defaultValue}
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
  label: PropTypes.string,
  defaultValue: PropTypes.array
}
