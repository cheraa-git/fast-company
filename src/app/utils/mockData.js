import professions from '../mockData/professions.json'
import qualities from '../mockData/qualities.json'
import users from '../mockData/users.json'
import { useEffect, useState } from 'react'
import httpService from '../services/http.service'

export const useMockData = () => {
  const STATUSES = {
    idle: 'Not started',
    pending: 'In process',
    success: 'Ready',
    error: 'Error occurred'
  }
  const [error, setError] = useState(null)
  const [status, setStatus] = useState(STATUSES.idle)
  const [progress, setProgress] = useState(0)
  const [count, setCount] = useState(0)
  const summaryCount = professions.length + qualities.length + users.length

  const incrementCount = () => {
    setCount(prev => ++prev)
  }


  const updateProgress = () => {
    if (count !== 0 && status !== STATUSES.idle) {
      setStatus(STATUSES.pending)
    }
    const newProgress = Math.floor((count / summaryCount) * 100)
    if (progress < newProgress) {
      setProgress(() => newProgress)
    }
    if (newProgress === 100) {
      setStatus(STATUSES.success)
    }
  }

  useEffect(() => {
    updateProgress()
  }, [count])

  const initialize = async () => {
    setCount(0)
    setProgress(0)
    setStatus(STATUSES.pending)
    try {
      for (const profession of professions) {
        await httpService.put(`profession/${profession._id}`, profession)
        incrementCount()
      }
      for (const user of users) {
        await httpService.put(`user/${user._id}`, user)
        incrementCount()
      }
      for (const quality of qualities) {
        await httpService.put(`quality/${quality._id}`, quality)
        incrementCount()
      }
    } catch (error) {
      setError(error)
      setStatus(STATUSES.error)
    }
  }

  return { error, initialize, progress, status }
}
