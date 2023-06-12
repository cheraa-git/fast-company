import PropTypes from 'prop-types'
import { Spinner } from './spinner'
import { useSelector } from 'react-redux'
import { getProfessionById, getProfessionsLoading } from '../../store/professions'

export const Profession = ({ id }) => {
  const professionsLoading = useSelector(getProfessionsLoading())
  const profession = useSelector(getProfessionById(id))

  if (professionsLoading) return <Spinner />
  return (
    <>{profession.name}</>
  )
}

Profession.propTypes = {
  id: PropTypes.string
}
