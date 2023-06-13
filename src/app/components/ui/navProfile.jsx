import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getCurrentUser } from '../../store/users'
import { Spinner } from './spinner'

export const NavProfile = () => {
  const [isOpen, setIsOpen] = useState(false)
  const currentUser = useSelector(getCurrentUser())

  const toggleMenu = () => {
    setIsOpen(prev => !prev)
  }

  if (!currentUser) return <Spinner />
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
