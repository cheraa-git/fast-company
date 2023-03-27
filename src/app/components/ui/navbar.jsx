import { Link, useLocation } from 'react-router-dom'

export const Navbar = () => {
  const location = useLocation()

  const getLinkClass = (path) => {
    if (path === location.pathname) return 'nav-link disabled'
    return 'nav-link'
  }

  return (
    <ul className="nav">
      <li className="nav-item">
        <Link to="/" className={getLinkClass('/')}>Main</Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className={getLinkClass('/login')}>Login</Link>
      </li>
      <li className="nav-item">
        <Link to="/users" className={getLinkClass('/users')}>Users</Link>
      </li>
    </ul>
  )
}
