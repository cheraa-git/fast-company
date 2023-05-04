import { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import professionService from '../services/profession.service'
import { toast } from 'react-toastify'

const ProfessionContext = createContext({})

export const useProfessions = () => {
  return useContext(ProfessionContext)
}

export const ProfessionProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [professions, setProfessions] = useState([])

  useEffect(() => {
    getProfessionsList()
  }, [])

  useEffect(() => {
    if (error !== null) {
      toast.error(error)
      setError(null)
    }
  }, [error])

  const getProfessionsList = async () => {
    try {
      const { content } = await professionService.get()
      setProfessions(content)
      setLoading(false)
    } catch (e) {
      errorCatcher(e)
    }
  }

  const getProfession = (id) => {
    return professions.find(profession => profession._id === id)
  }

  const errorCatcher = (e) => {
    const { message } = e.response.data
    setError(message)
  }

  return (
    <ProfessionContext.Provider value={{ isLoading, professions, getProfession }}>
      {children}
    </ProfessionContext.Provider>
  )
}

ProfessionProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
}
