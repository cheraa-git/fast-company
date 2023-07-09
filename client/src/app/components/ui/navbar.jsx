import { Link, useLocation } from 'react-router-dom'
import { NavProfile } from './navProfile'
import { useSelector } from 'react-redux'
import { getIsLoggedIn } from '../../store/users'

export const Navbar = () => {
  const location = useLocation()
  const isLoggedIn = useSelector(getIsLoggedIn())

  const getLinkClass = (path) => {
    if (path === location.pathname) return 'nav-link disabled'
    return 'nav-link'
  }

  return (
    <nav className="navbar nav bg-light mb-3">
      <div className="container-fluid">

        <div className="d-flex">
          <Link to="/" className={getLinkClass('/')}>Main</Link>

          {isLoggedIn && <Link to="/users" className={getLinkClass('/users')}>Users</Link>}
        </div>

        {
          isLoggedIn
            ? <NavProfile />
            : <Link to="/login" className={getLinkClass('/login')}>Login</Link>

        }

      </div>
    </nav>
  )
}
