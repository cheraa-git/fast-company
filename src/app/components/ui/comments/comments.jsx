import { CommentForm } from '../forms/commentForm'
import { useEffect, useState } from 'react'
import api from '../../../api'
import PropTypes from 'prop-types'
import { Comment } from './comment'
import query from '../../../utils/query'

export const Comments = ({ userId }) => {
  const [comments, setComments] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    query.getComments(userId).then(response => setComments(response))
    query.getUsersOptions().then(response => setUsers(response))
  }, [])

  const handleDelete = (commentId) => {
    api.comments.remove(commentId).then(id => setComments(prev => prev.filter(comment => comment._id !== id)))
  }
  return (
    <>
      <div className="card mb-2">
        <div className="card-body">
          <h2>New comment</h2>
          <CommentForm users={users} setComments={setComments} />
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-body">
          <h2>Comments</h2>
          <hr />
          {comments.map(comment => (
            <Comment key={comment._id} comment={comment} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </>
  )
}

Comments.propTypes = {
  userId: PropTypes.string.isRequired,
  className: PropTypes.string
}
