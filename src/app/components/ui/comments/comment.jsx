import { getRandomAvatar } from '../../../utils/randomAvatar'
import PropTypes from 'prop-types'
import { useEffect, useMemo, useState } from 'react'
import api from '../../../api'
import { dateFormatter } from '../../../utils/dateFormatter'
import { Spinner } from '../Spinner'

export const Comment = ({ comment, onDelete }) => {
  const [user, setUser] = useState()
  const userAvatar = useMemo(getRandomAvatar, [comment._id])

  useEffect(() => {
    api.users.getById(comment.userId).then(response => setUser(response))
  }, [])

  const handleDelete = () => {
    onDelete(comment._id)
  }

  if (!user) return <div className="mb-4"><Spinner /></div>
  return (
    <div className="bg-light card-body mb-3">
      <div className="row">
        <div className="col">
          <div className="d-flex flex-start">
            <img
              src={userAvatar}
              className="rounded-circle shadow-1-strong me-3"
              alt="avatar"
              width="65"
              height="65"
            />
            <div className="flex-grow-1 flex-shrink-1">
              <div className="mb-4">
                <div
                  className="d-flex justify-content-between align-items-center">
                  <p className="mb-1">
                    {user.name}
                    <span className="small ms-2">{dateFormatter(comment.created_at)}</span>
                  </p>
                  <button className="btn btn-sm text-primary d-flex align-items-center" onClick={handleDelete}>
                    <i className="bi bi-x-lg" />
                  </button>
                </div>
                <p className="small mb-0">{comment.content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
}
