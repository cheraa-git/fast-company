import PropTypes from 'prop-types'


const Quality = ({ quality }) => (
  <span key={quality._id} className={`badge bg-${quality.color} mx-1`}>
        {quality.name}
  </span>
)

Quality.propTypes = {
  quality: PropTypes.object.isRequired
}

export { Quality }
