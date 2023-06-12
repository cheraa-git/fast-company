import { Quality } from './quality'
import PropTypes from 'prop-types'
import { Spinner } from '../Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { getQualitiesByIds, getQualitiesLoadingStatus, loadQualitiesList } from '../../../store/qualities'
import { useEffect } from 'react'

export const QualitiesList = ({ qualities }) => {
  const dispatch = useDispatch()
  const qualitiesLoading = useSelector(getQualitiesLoadingStatus())
  const qualitiesList = useSelector(getQualitiesByIds(qualities))

  useEffect(() => {
    dispatch(loadQualitiesList())
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
