import { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { useAuth } from './useAuth'
import { nanoid } from 'nanoid'
import commentService from '../services/comment.service'

const CommentsContext = createContext({})

export const useComments = () => {
  return useContext(CommentsContext)
}

export const CommentsProvider = ({ children }) => {
  const { userId } = useParams()
  const { currentUser } = useAuth()
  const [isLoading, setLoading] = useState(true)
  const [comments, setComments] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    getComments()
  }, [userId])

  useEffect(() => {
    if (error !== null) {
      toast.error(error)
      setError(null)
    }
  }, [error])

  const createComment = async (data) => {
    const comment = { ...data, _id: nanoid(), pageId: userId, created_at: Date.now(), userId: currentUser._id }
    try {
      const { content } = await commentService.createComment(comment)
      setComments(prev => [...prev, content])
    } catch (error) {
      console.log('ERROR', error)
      errorCatcher(error)
    }
  }

  const getComments = async () => {
    try {
      const { content } = await commentService.get(userId)
      setComments(content)
    } catch (error) {
      errorCatcher(error)
    } finally {
      setLoading(false)
    }
  }

  const removeComment = async (id) => {
    try {
      await commentService.remove(id)
      setComments(prev => prev.filter(comment => comment._id !== id))
    } catch (error) {
      errorCatcher(error)
    }
  }


  const errorCatcher = (e) => {
    const data = e.response.data
    console.log(e)
    setError(data.message || data.error)
  }

  return (
    <CommentsContext.Provider value={{
      comments: comments.toSorted((a, b) => b.created_at - a.created_at),
      createComment,
      isLoading,
      removeComment
    }}>
      {children}
    </CommentsContext.Provider>
  )
}

CommentsProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
}
