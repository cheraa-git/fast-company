import { CommentForm } from '../forms/commentForm'
import { useEffect, useState } from 'react'
import api from '../../../api'
import { Comment } from './comment'
import query from '../../../utils/query'
import { useParams } from 'react-router-dom'

export const Comments = () => {
  const { userId } = useParams()
  const [comments, setComments] = useState([])

  useEffect(() => {
    query.getComments(userId).then(response => setComments(response))
  }, [])

  const handleSubmit = (data) => {
    api.comments.add({ ...data, pageId: userId })
      .then((newComment) => {
        setComments(prev => [newComment, ...prev])
      })
  }

  const handleDelete = (commentId) => {
    api.comments.remove(commentId).then(id => setComments(prev => prev.filter(comment => comment._id !== id)))
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


