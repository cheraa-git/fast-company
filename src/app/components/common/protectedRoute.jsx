import { useAuth } from '../../hooks/useAuth'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

export const ProtectedRoute = ({ component: Component, children, ...rest }) => {
  const { currentUser } = useAuth()

  return (
    <Route {...rest} render={props => {
      if (!currentUser) return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      return Component ? <Component {...props} /> : children
    }} />
  )
}

ProtectedRoute.propTypes = {
  component: PropTypes.func,
  children: PropTypes.node,
  location: PropTypes.object
}

