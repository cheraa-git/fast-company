import React, { FC, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import api from '../../api'
import { IUser } from '../../../types'
import { Spinner } from '../Spinner'
import { QualitiesList } from '../qualitiesList'

export const User: FC = () => {
  const userId = useParams<{ userId: string }>().userId
  const history = useHistory()
  const [user, setUser] = useState<IUser>()

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
      <button onClick={() => history.push('/users')}>Все пользователи</button>
    </div>
  )
}
