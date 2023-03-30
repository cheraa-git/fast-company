import { Quality } from './quality'
import PropTypes from 'prop-types'


export const QualitiesList = ({ qualities }) => {
  return (
    <>
      {qualities.map(quality => <Quality key={quality._id} quality={quality} />)}
    </>
  )
}

QualitiesList.propTypes = {
  qualities: PropTypes.array
}
