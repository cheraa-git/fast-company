import { CommentForm } from '../forms/commentForm'
import { Comment } from './comment'
import { useComments } from '../../../hooks/useComments'

export const Comments = () => {
  const { comments, createComment, removeComment } = useComments()

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
          {comments.map(comment => (
            <Comment key={comment._id} comment={comment} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </>
  )
}


