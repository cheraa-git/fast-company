import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { NavProfile } from './navProfile'

export const Navbar = () => {
  const location = useLocation()
  const { currentUser } = useAuth()

  const getLinkClass = (path) => {
    if (path === location.pathname) return 'nav-link disabled'
    return 'nav-link'
  }

  return (
    <nav className="navbar nav bg-light mb-3">
      <div className="container-fluid">

        <div className="d-flex">
          <Link to="/" className={getLinkClass('/')}>Main</Link>

          {currentUser && <Link to="/users" className={getLinkClass('/users')}>Users</Link>}
        </div>

        {
          currentUser
            ? <NavProfile />
            : <Link to="/login" className={getLinkClass('/login')}>Login</Link>

        }

      </div>
    </nav>
  )
}
