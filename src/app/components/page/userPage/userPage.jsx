import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import api from '../../../api'
import { Spinner } from '../../ui/Spinner'
import { QualitiesList } from '../../ui/qualities/qualitiesList'

const UserPage = () => {
  const { userId } = useParams()
  const history = useHistory()
  const [user, setUser] = useState()

  useEffect(() => {
    api.users.getById(userId).then(response => setUser(response))
  }, [])

  if (!user) return <Spinner />
  return (
    <div className="border mx-5 p-3 mt-4">
      <h1>{user.name}</h1>
      <h2>Профессия: {user.profession.name}</h2>
      <QualitiesList qualities={user.qualities} />
      <p className="mt-2">Встретился, раз: {user.completedMeetings}</p>
      <h2>Rate: {user.rate}</h2>
      <button onClick={() => history.push(`/users/${userId}/edit`)}>Edit</button>
    </div>
  )
}

export { UserPage }
