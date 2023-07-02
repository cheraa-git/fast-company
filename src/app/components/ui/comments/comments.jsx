import { CommentForm } from '../forms/commentForm'
import { Comment } from './comment'
import { useComments } from '../../../hooks/useComments'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getComments, getCommentsLoading, loadComments } from '../../../store/comments'
import { Spinner } from '../spinner'
import { useParams } from 'react-router-dom'

export const Comments = () => {
  const dispatch = useDispatch()
  const { userId } = useParams()
  const isLoading = useSelector(getCommentsLoading())
  const comments = useSelector(getComments())
  const { createComment, removeComment } = useComments()

  useEffect(() => {
    dispatch(loadComments(userId))
  }, [userId])

  const handleSubmit = (data) => {
    createComment(data)
  }

  const handleDelete = (commentId) => {
    removeComment(commentId)
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


