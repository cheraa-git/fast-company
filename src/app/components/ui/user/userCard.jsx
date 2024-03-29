import { getRandomAvatar } from '../../../utils/randomAvatar'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useMemo } from 'react'

export const UserCard = ({ user }) => {
  const history = useHistory()
  const userAvatar = useMemo(getRandomAvatar, [user._id])

  const handleEdit = () => {
    history.push(`/users/${user._id}/edit`)
  }

  return (
    <div className="card mb-3">
      <div className="card-body">
        <button className="position-absolute top-0 end-0 btn btn-light btn-sm" onClick={handleEdit}>
          <i className="bi bi-gear" />
        </button>
        <div className="d-flex flex-column align-items-center text-center position-relative">
          <img
            src={userAvatar}
            className="rounded-circle shadow-1-strong me-3"
            alt="avatar"
            width="200"
            height="200"
          />
          <div className="mt-3">
            <h4>{user.name}</h4>
            <p className="text-secondary mb-1">{user.profession.name}</p>
            <div className="text-muted">
              <i className="bi bi-caret-down-fill text-primary" role="button" />
              <i className="bi bi-caret-up text-secondary" role="button"></i>
              <span className="ms-2">{user.rate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

UserCard.propTypes = {
  user: PropTypes.object.isRequired
}
