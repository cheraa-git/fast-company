import PropTypes from 'prop-types'
import { useProfessions } from '../../hooks/useProfession'
import { Spinner } from './Spinner'

export const Profession = ({ id }) => {
  const { isLoading, getProfession } = useProfessions()
  const profession = getProfession(id)

  if (isLoading) return <Spinner />
  return (
    <>{profession.name}</>
  )
}

Profession.propTypes = {
  id: PropTypes.string
}
