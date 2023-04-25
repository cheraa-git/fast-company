import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../../api'
import { Spinner } from '../../ui/Spinner'
import { UserCard } from '../../ui/user/userCard'
import Comments from '../../ui/comments'
import { QualitiesCard } from '../../ui/user/qualitiesCard'
import { MeetingsCard } from '../../ui/user/meetingsCard'

export const UserPage = () => {
  const { userId } = useParams()
  const [user, setUser] = useState()

  useEffect(() => {
    api.users.getById(userId).then(response => setUser(response))
  }, [])

  if (!user) return <Spinner />
  return (
    <div className="container">
      <div className="row gutters-sm">
        <div className="col-md-4 mb-3">
          <UserCard user={user} />
          <QualitiesCard qualities={user.qualities} />
          <MeetingsCard completedMeetings={user.completedMeetings} />
        </div>
        <div className="col-md-8">
          <Comments />
        </div>
      </div>
    </div>
  )
}
