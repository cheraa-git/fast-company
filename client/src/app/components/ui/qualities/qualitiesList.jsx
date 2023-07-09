import { Quality } from './quality'
import PropTypes from 'prop-types'
import { Spinner } from '../spinner'
import { useDispatch, useSelector } from 'react-redux'
import { getQualitiesByIds, getQualitiesLoadingStatus, loadQualities } from '../../../store/qualities'
import { useEffect } from 'react'

export const QualitiesList = ({ qualities }) => {
  const dispatch = useDispatch()
  const qualitiesLoading = useSelector(getQualitiesLoadingStatus())
  const qualitiesList = useSelector(getQualitiesByIds(qualities))

  useEffect(() => {
    dispatch(loadQualities())
  }, [dispatch])

  if (qualitiesLoading) return <Spinner />
  return (
    <>
      {qualitiesList.map(quality => <Quality key={quality._id} quality={quality} />)}
    </>
  )
}

QualitiesList.propTypes = {
  qualities: PropTypes.array
}