import { useDispatch, useSelector } from 'react-redux'
import { getIsLoggedIn, getUsersLoadingStatus, loadUsers } from '../../../store/users'
import { useEffect } from 'react'
import { Spinner } from '../spinner'
import PropTypes from 'prop-types'
import { loadQualities } from '../../../store/qualities'
import { loadProfessions } from '../../../store/professions'

export const AppLoader = ({ children }) => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(getIsLoggedIn())
  const usersStatusLoading = useSelector(getUsersLoadingStatus())

  useEffect(() => {
    dispatch(loadQualities())
    dispatch(loadProfessions())
    if (isLoggedIn) dispatch(loadUsers())
  }, [])
  if (usersStatusLoading) return <Spinner />
  return children
}

AppLoader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

