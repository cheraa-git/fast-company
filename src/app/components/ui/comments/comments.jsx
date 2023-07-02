import { CommentForm } from '../forms/commentForm'
import { Comment } from './comment'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { createComment, getComments, getCommentsLoading, loadComments, removeComment } from '../../../store/comments'
import { Spinner } from '../spinner'
import { useParams } from 'react-router-dom'

export const Comments = () => {
  const dispatch = useDispatch()
  const { userId } = useParams()
  const isLoading = useSelector(getCommentsLoading())
  const comments = useSelector(getComments())

  useEffect(() => {
    dispatch(loadComments(userId))
  }, [userId])

  const handleSubmit = (data) => {
    dispatch(createComment(data, userId))
  }

  const handleDelete = (commentId) => {
    dispatch(removeComment(commentId))
  }

  return (
    <>
      <div className="card mb-2">
        <div className="card-body">
          <h2>New comment</h2>
          <CommentForm onSubmit={handleSubmit} />
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-body">
          <h2>Comments</h2>
          <hr />
          {!isLoading
            ? comments.map(comment => (<Comment key={comment._id} comment={comment} onDelete={handleDelete} />))
            : <Spinner />}
        </div>
      </div>
    </>
  )
}


