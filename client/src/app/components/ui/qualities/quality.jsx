import PropTypes from 'prop-types'

export const Quality = ({ quality }) => {
  return (
    <span key={quality._id} className={`badge bg-${quality.color} mx-1`}>
      {quality.name}
    </span>
  )
}

Quality.propTypes = {
  quality: PropTypes.object
}
