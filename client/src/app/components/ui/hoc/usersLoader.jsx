import { useDispatch, useSelector } from 'react-redux'
import { getDataStatus, loadUsers } from '../../../store/users'
import { useEffect } from 'react'
import { Spinner } from '../spinner'
import PropTypes from 'prop-types'

export const UsersLoader = ({ children }) => {
  const dispatch = useDispatch()
  const dataStatus = useSelector(getDataStatus())

  useEffect(() => {
    if (!dataStatus) dispatch(loadUsers())
  }, [])
  if (!dataStatus) return <Spinner />
  return children
}

UsersLoader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

