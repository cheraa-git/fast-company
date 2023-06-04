import { useAuth } from '../../hooks/useAuth'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const NavProfile = () => {
  const { currentUser } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(prev => !prev)
  }

  return (
    <div className="dropdown">
      <div className="btn dropdown-toggle d-flex align-items-center" onClick={toggleMenu}>
        <div className="me-2">{currentUser.name}</div>
        <img className="img-responsive rounded-circle" src={currentUser.image} alt="avatar" height="40" />
      </div>
      <div className={`dropdown-menu ${isOpen ? 'show' : ''}`} onClick={toggleMenu}>
        <Link className="dropdown-item" to={`/users/${currentUser._id}`}>Profile</Link>
        <Link className="dropdown-item" to="/logout">Logout</Link>
      </div>
    </div>
  )
}
