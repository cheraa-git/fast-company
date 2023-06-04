import { QualitiesList } from '../qualities/qualitiesList'
import PropTypes from 'prop-types'

export const QualitiesCard = ({ qualities }) => {
  return (
    <div className="card mb-3">
      <div className="card-body d-flex flex-column justify-content-center text-center">
        <h5 className="card-title">
          <span>Qualities</span>
        </h5>
        <div>
          <QualitiesList qualities={qualities} />
        </div>
      </div>
    </div>
  )
}

QualitiesCard.propTypes = {
  qualities: PropTypes.arrayOf(PropTypes.string).isRequired
}
