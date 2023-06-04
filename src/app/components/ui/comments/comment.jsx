import PropTypes from 'prop-types'
import { dateFormatter } from '../../../utils/dateFormatter'
import { useUser } from '../../../hooks/useUsers'
import { useAuth } from '../../../hooks/useAuth'

export const Comment = ({ comment, onDelete }) => {
  const { getUserById } = useUser()
  const user = getUserById(comment.userId)
  const { currentUser } = useAuth()

  const handleDelete = () => {
    onDelete(comment._id)
  }

  return (
    <div className="bg-light card-body mb-3">
      <div className="row">
        <div className="col">
          <div className="d-flex flex-start">
            <img
              src={user.image}
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
                  {
                    comment.userId === currentUser._id &&
                    <button className="btn btn-sm text-primary d-flex align-items-center" onClick={handleDelete}>
                      <i className="bi bi-x-lg" />
                    </button>
                  }
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
