import { createContext, useContext, useEffect, useState } from 'react'
import qualityService from '../services/quality.service'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'

const QualitiesContext = createContext({})

export const QualitiesProvider = ({ children }) => {
  const [qualities, setQualities] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    getQualities()
  }, [])

  const getQualities = async () => {
    try {
      const { content } = await qualityService.fetchAll()
      setQualities(content)
    } catch (e) {
      errorCatcher(e)
    } finally {
      setLoading(false)
    }
  }

  const getQuality = (id) => {
    return qualities.find(q => q._id === id)
  }

  function errorCatcher(error) {
    const { message } = error.response.data
    setError(message)
  }

  useEffect(() => {
    if (error !== null) {
      toast.error(error)
      setError(null)
    }
  }, [error])

  return (
    <QualitiesContext.Provider value={{ qualities, getQuality, isLoading }}>
      {children}
    </QualitiesContext.Provider>
  )
}

QualitiesProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
}

export const useQualities = () => {
  return useContext(QualitiesContext)
}
