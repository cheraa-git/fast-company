import PropTypes from 'prop-types'
import { useQualities } from '../../../hooks/useQualities'
import { Spinner } from '../Spinner'

export const Quality = ({ id }) => {
  const { getQuality, isLoading } = useQualities()
  const quality = getQuality(id)

  if (isLoading) return <Spinner />
  return (
    <span key={quality._id} className={`badge bg-${quality.color} mx-1`}>
      {quality.name}
    </span>
  )
}

Quality.propTypes = {
  id: PropTypes.string
}
