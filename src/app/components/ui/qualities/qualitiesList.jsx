import { Quality } from './quality'
import PropTypes from 'prop-types'

export const QualitiesList = ({ qualities }) => {
  return (
    <>
      {qualities.map(id => <Quality key={id} id={id} />)}
    </>
  )
}

QualitiesList.propTypes = {
  qualities: PropTypes.array
}
